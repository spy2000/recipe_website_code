import { useState } from 'react'
import { toast } from "react-hot-toast"
import {useLocation,useNavigate} from "react-router-dom"

const acceptedFileType = ["image/png", "image/jpg", "image/jpeg"];

const RecipeForm = ({title,recipeData,onSumit}) => {
  const [recipeDetail, setRecipeDetail] = useState(recipeData ? recipeData : {});
  const [selectedFile, setSelectedFile] = useState(recipeData?.image_url ? recipeData.image_url : null );
  const [ingredientList, setIngredientList] = useState(recipeData?.ingredients ? recipeData.ingredients : [{ id: 1, ingredient_name: "", ingredient_quantity: "" }])
  const location = useLocation()
  const navigate = useNavigate()

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!acceptedFileType.includes(file.type)) {
      setSelectedFile(null)
      return toast.error("Only image are acceptable");
    }
    // else if (file.size > 2 * 1024 * 1024) {
    //   return toast.error("Max file size limit is 2MB");
    // }

    setSelectedFile(file);
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    if(name === "recipe_rating" && value !== ""){
      if(Number(value) < 1 || Number(value) > 5){
         return toast.error("rating should between 1 to 5")
      }
    }
    setRecipeDetail({ ...recipeDetail, [name]: value });
  }


  const addRecipeButton = async (e) => {
      e.preventDefault();
      const { recipe_name, recipe_description, recipe_rating, recipe_prepare_time, recipe_cook_time } = recipeDetail;

      if (!recipe_name || !recipe_description || !recipe_rating || !recipe_prepare_time || !recipe_cook_time) {
        return toast.error("Please fill all the field")
      } else if (!ingredientList || ingredientList.lenght === 0 || ingredientList.filter((ing) => !ing.ingredient_name || !ing.ingredient_quantity).length > 0) {
        return toast.error("Ingredients required. Please add,remove or fill properly");
      } else if (!selectedFile) {
        return toast.error("Please select the recipe image");
      }

      const formData = new FormData();

      formData.append("recipe_name", recipe_name);
      formData.append("recipe_description", recipe_description);
      formData.append("recipe_rating", recipe_rating);
      formData.append("recipe_prepare_time", recipe_prepare_time);
      formData.append("recipe_cook_time", recipe_cook_time);
      formData.append("ingredients", JSON.stringify(ingredientList));
      if(typeof selectedFile == "string"){
        formData.append("recipe_image_url", recipeData.recipe_image_url);
      }else{
        formData.append("image", selectedFile );
      }

      let res;

      if(location.pathname === "/add-recipe"){
         res = await onSumit(formData)

      }else{
        res = await onSumit(recipeData.id,formData)
      }

      const {success,message,error} = res;

      if(!success){
        console.log(error)
        return toast.error(error)
      }
      toast.success(message)
      navigate("/")
      
  }

  const addNewIngredient = (e) => {
    e.preventDefault()
    setIngredientList((last) => [...last, { id: Date.now(), ingredient_name: "", ingredient_quantity: "" }])
  }

  const removeIngredient = (e, id) => {
    e.preventDefault()
    setIngredientList((old) => old.filter((data) => data.id !== id))

  }
  const onIngredientChange = (e, id) => {
    const { name, value } = e.target;
    setIngredientList((old) => old.map((data) => data.id === id ? { ...data, [name]: value } : data))
  };

  return (
    <div className="mt-3 d-flex justify-content-center align-items-center">
      <form className="w-50 border border-3 border-primary rounded-2 p-2">
        <h2 className='text-center fw-bold text-decoration-underline'>{title}</h2>
        <div className="mb-3">
          <label htmlFor="recipeName" className="form-label">
            Enter Recipe Name
          </label>
          <input
            type="text"
            className="form-control"
            id="recipeName"
            name="recipe_name"
            onChange={onInputChange}
            value={recipeDetail.recipe_name}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="recipeDescription" className="form-label">
            Enter recipe description
          </label>
          <textarea
            className="form-control"
            id="recipeDescription"
            rows="5"
            name="recipe_description"
            onChange={onInputChange}
            value={recipeDetail.recipe_description}
          ></textarea>
        </div>
        {/* <div className="mb-3">
          <select
            className="form-select"
            aria-label="Select Rating"
            name="recipe_rating"
            onChange={onInputChange}
            value={recipeDetail.recipe_rating}
          >
            <option selected>Select Rating</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
            <option value="4">Four</option>
            <option value="5">Five</option>
          </select>
        </div> */}
        <div className="mb-3">
          <label htmlFor="recipe_rating" className="form-label">
            Enter Recipe Rating
          </label>
          <input
            type="number"
            className="form-control"
            id="recipe_rating"
            name="recipe_rating"
            onChange={onInputChange}
            value={recipeDetail.recipe_rating}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="recipe_prepare_time" className="form-label">
            Enter Prepare Time (HH:MM)
          </label>
          <input
            type="time"
            className="form-control"
            id="recipe_prepare_time"
            name="recipe_prepare_time"
            onChange={onInputChange}
            value={recipeDetail.recipe_prepare_time}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="recipe_cook_time" className="form-label">
            Enter cook Time (HH:MM)
          </label>
          <input
            type="time"
            className="form-control"
            id="recipe_cook_time"
            name="recipe_cook_time"
            onChange={onInputChange}
            value={recipeDetail.recipe_cook_time}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">
            selet recipe image
          </label>
          <input
            className="form-control"
            type="file"
            id="formFile"
            accept="image/*"
            name="recipe_image"
            onChange={handleImageChange}
          />
        </div>
        { selectedFile && <div className="mb-3">
          <h4>file name:{selectedFile?.name ? selectedFile.name : recipeData.recipe_image_url}</h4>
         <div>
          <img src={ typeof selectedFile === "string" ? selectedFile :  URL.createObjectURL(selectedFile)} alt="select rcipe pic" style={{width:"100%",height:"200px"}} />
         </div>
        </div>}
        {ingredientList.map((item, i) => {
          return <div className="row d-flex justify-content-center align-items-center px-2" key={item.id}>
            <div className="col-5">
              <div className="mb-3">
                <label htmlFor="recipeName" className="form-label">
                  Enter ingredient name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id={`ingredient`}
                  name={`ingredient_name`}
                  onChange={(e) => onIngredientChange(e, item.id)}
                  value={item.ingredient_name}
                />
              </div>
            </div>
            <div className="col-5">
              <div className="mb-3">
                <label htmlFor="recipeName" className="form-label">
                  Enter ingredient quantity
                </label>
                <input
                  type="text"
                  className="form-control"
                  id={`recipeName`}
                  name={`ingredient_quantity`}
                  onChange={(e) => onIngredientChange(e, item.id)}
                  value={item.ingredient_quantity}
                />
              </div>
            </div>
            <div className="col-2">
              <button
                className="btn btn-primary"
                onClick={(e) => removeIngredient(e, item.id)}
              >
                delete
              </button>
            </div>
          </div>

        })}
        <div className='w-100 d-flex justify-content-center align-items-center mb-2'>
          <button
            className="btn btn-primary"
            onClick={addNewIngredient}
          >
            Add Ingredient
          </button>
        </div>
        <div className='d-flex justify-content-center align-items-center m-4'>
          <button type="submit" className="btn btn-primary" onClick={addRecipeButton}>
            {title}
          </button>
        </div>
      </form>
    </div>
  );
}

export default RecipeForm