const db = require("../db");
const {convertToMinutes,createTimeInText,deleteFile} = require("../utils/common")

// create recipe
exports.createRecipe = async (req, res) => {
  const conn = await db.getConnection();
  await conn.beginTransaction();
  let fileName;

  try {
    const {
      recipe_name,
      recipe_description,
      recipe_rating,
      recipe_prepare_time,
      recipe_cook_time,
      ingredients:ingredientList
    } = req.body;

    const img = req.file ? req.file.filename : null;
    fileName = img
    const ingredients = JSON.parse(ingredientList)

    if(!recipe_name || !recipe_description || !recipe_rating || !recipe_cook_time || ! recipe_prepare_time){
        return res.status(400).json({success:false,error:"Please fill all the field of the form"})
    }else if(!ingredients || ingredients.lenght === 0 || ingredients.filter((ing)=>!ing.ingredient_name || !ing.ingredient_quantity).length > 0){
        return res.status(400).json({success:false,error:"Please fill all the field of the ingredients"})
    }

    const prepareMin = convertToMinutes(recipe_prepare_time);
    const cookMin = convertToMinutes(recipe_cook_time);
    const totalMin = prepareMin + cookMin;

    const [recipeResult] = await conn.query(
      `INSERT INTO recipes 
      (recipe_name, recipe_description, recipe_rating, recipe_prepare_time, recipe_cook_time, recipe_total_time, recipe_image_url)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        recipe_name,
        recipe_description,
        recipe_rating,
        prepareMin,
        cookMin,
        totalMin,
        img
      ]
    );

    const recipeId = recipeResult.insertId;

    const ingredientValues = ingredients.map((ing) => [
      recipeId,
      ing.ingredient_name,
      ing.ingredient_quantity,
    ]);

    await conn.query(
      "INSERT INTO ingredients (recipe_id, ingredient_name, ingredient_quantity) VALUES ?",
      [ingredientValues]
    );

    await conn.commit();
    conn.release();

    res.json({success:true, message: "Recipe created successfully", recipeId });
  } catch (err) {
    await conn.rollback();
    conn.release();
    if(fileName) deleteFile(fileName)
    res.status(500).json({success:false, error: err.message });
  }
};

//get all recipes
exports.getAllRecipes = async (req, res) => {
    try {
      const [recipes] = await db.query("SELECT * FROM recipe_app.recipes order by id desc");
      const [ingredients] = await db.query("SELECT * FROM ingredients");
  
      const allrecipe = recipes.map(r => ({
        ...r,
        image_url: `http://localhost:4000/uploads/${r.recipe_image_url}`,
        ingredients: ingredients.filter(i => i.recipe_id === r.id),
        recipe_prepare_time: createTimeInText(r.recipe_prepare_time),
        recipe_cook_time: createTimeInText(r.recipe_cook_time),
        recipe_total_time: createTimeInText(r.recipe_total_time)
      }));
  
    //   res.json(output);
    res.status(200).json({success:true,allrecipe})
    } catch (err) {
      res.status(500).json({success:false, error: err.message });
    }
  };
  

//get recipe by id
exports.getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
  
    const [[recipe]] = await db.query("SELECT * FROM recipes WHERE id=?", [id]);
    const [ingred] = await db.query("SELECT * FROM ingredients WHERE recipe_id=?", [id]);
  
    recipe.image_url = `http://localhost:4000/uploads/${recipe.recipe_image_url}`;

    const recipeDetail = {
      ...recipe,
      ingredients: ingred,
      recipe_prepare_time: createTimeInText(recipe.recipe_prepare_time),
      recipe_cook_time: createTimeInText(recipe.recipe_cook_time),
      recipe_total_time: createTimeInText(recipe.recipe_total_time)
    }
  
    res.status(200).json({success:true,recipeDetail})
    
  } catch (error) {
    res.status(500).json({success:false, error: err.message });
  }
   
  };

// update recipe
  exports.updateRecipe = async (req, res) => {
    const conn = await db.getConnection();
    await conn.beginTransaction();
    let previousFileName;
    let currentFileName;
  
    try {
      const { id } = req.params;
  
      const {
        recipe_name,
        recipe_description,
        recipe_rating,
        recipe_prepare_time,
        recipe_cook_time,
        recipe_image_url,
        ingredients:ingredientList
      } = req.body;

      const img = req.file ? req.file.filename : recipe_image_url;
      if(req.file && req.file.filename){
        const [[previous_url]]  = await db.query("SELECT recipe_image_url as previous_url FROM recipes WHERE id=?",[id])
        previousFileName=previous_url.previous_url
      }else{
        currentFileName=recipe_image_url;
      }
      
      const ingredients = JSON.parse(ingredientList);
      
      if(!recipe_name || !recipe_description || !recipe_rating || !recipe_cook_time || ! recipe_prepare_time){
        return res.status(400).json({success:false,error:"Please fill all the field of the form"})
      }else if(!ingredients || ingredients.lenght === 0 || ingredients.filter((ing)=>!ing.ingredient_name || !ing.ingredient_quantity).length > 0){
        return res.status(400).json({success:false,error:"Please fill all the field of the ingredients"})
      }
      
      const prepareMin = convertToMinutes(recipe_prepare_time);
      const cookMin = convertToMinutes(recipe_cook_time);
      const totalMin = prepareMin + cookMin;
      
      await conn.query(
        `UPDATE recipes SET
        recipe_name=?, recipe_description=?, recipe_rating=?, 
        recipe_prepare_time=?, recipe_cook_time=?, recipe_total_time=?,
        recipe_image_url=?
        WHERE id=?`,
        [
          recipe_name, recipe_description, recipe_rating,
          prepareMin, cookMin, totalMin,
          img, id
        ]
      );
      
      
      await conn.query("DELETE FROM ingredients WHERE recipe_id=?", [id]);
      
      const ingredientValues = ingredients.map(i => [
        id,
        i.ingredient_name,
        i.ingredient_quantity
      ]);
      
      await conn.query(
        "INSERT INTO ingredients (recipe_id, ingredient_name, ingredient_quantity) VALUES ?",
        [ingredientValues]
      );
      
      await conn.commit();
      conn.release();
      if(previousFileName) deleteFile(previousFileName)
      
      res.status(200).json({ success:true,message: "Recipe updated successfully" });
      
    } catch (err) {
      await conn.rollback();
      conn.release();
      if(currentFileName) deleteFile(currentFileName)
      res.status(500).json({ success:false,error: err.message });
    }
  };
  

  // delete recipe
  exports.deleteRecipe = async (req, res) => {
    try {
      const { id } = req.params;
    const [[previous_url]]  = await db.query("SELECT recipe_image_url as previous_url FROM recipes WHERE id=?",[id])
    const previousFileName=previous_url.previous_url
    await db.query("DELETE FROM recipes WHERE id=?", [id]);
    deleteFile(previousFileName);
    res.status(200).json({success:true, message: "Recipe deleted" });
    } catch (err) {
      res.status(400).json({success:false, error: err.message });
    }
    
  };
  
  
