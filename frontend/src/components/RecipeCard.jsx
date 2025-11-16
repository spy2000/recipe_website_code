import React from 'react'
// import recipeImg from "./images/recipe.jpg";
import {Rating} from "@mui/material";
import {useNavigate} from "react-router-dom"
import EditSquareIcon from '@mui/icons-material/EditSquare';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const RecipeCard = ({recipe,setSelectedRecipe}) => {
  const navigate = useNavigate()
  const {image_url,recipe_name,recipe_description,recipe_rating,recipe_prepare_time,recipe_cook_time,recipe_total_time,ingredients} = recipe;
  return (
    <>
      <div className='d-flex flex-column justify-content-center align-items-center'>
      <div className="card w-75 rounded-4 my-5">
      <div className='d-flex justify-content-end align-items-center my-2'>
      <button type="button" className="btn btn-info mx-3" onClick={()=>navigate(`/update-recipe/${recipe.id}`)}>
          <EditSquareIcon fontSize="medium" sx={{ color: "white" }}  />
        </button>
        <button type="button" className="btn btn-danger mx-3" onClick={()=>setSelectedRecipe(recipe)}>
          <DeleteForeverIcon fontSize="medium" sx={{ color: "white" }}  />
        </button>
      </div>
        <img
          // src={recipeImg}
          src={image_url}
          className="card-img-top rounded-4"
          style={{ width: "100%", height: "400px" }}
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{recipe_name}</h5>
          <p className="card-text">{recipe_description}</p>
        </div>
        <div className="row my-4">
          <div className="col-6 d-flex justify-content-evenly align-items-center">
          <p className='m-0 '>{recipe_rating}</p>
            <Rating
              name="recipe_rating"
              defaultValue={recipe_rating}
              precision={0.5}
              readOnly
            />
          </div>
          <div className="col-6">
            <div className="row">
              <div className="col-4 d-flex flex-column">
                <div>{recipe_total_time}</div>
                <div>total</div>
              </div>
              <div className="col-4 d-flex flex-column">
                <div>{recipe_prepare_time}</div>
                <div>prep</div>
              </div>
              <div className="col-4 d-flex flex-column">
                <div>{recipe_cook_time}</div>
                <div>cook</div>
              </div>
            </div>
          </div>
        </div>
        { ingredients && ingredients.length > 0 && <div className="m-4">
        <h3 className='my-3'>Ingredients</h3>
        <h5>Ingredients for {recipe_name} Recipe</h5>
        <ul className="list-group list-group-flush">
        {ingredients.map((ingredient)=>( <li key={ingredient.id} className="list-group-item">
            <div className="row d-flex justify-content-evenly align-items-center">
              <div className="col-4">{ingredient?.ingredient_name}</div>
              <div className="col-4">{ingredient?.ingredient_quantity}</div>
            </div>
          </li>))}
          
        </ul>
        </div>}
      </div>
      </div>
    </>
  );
}

export default RecipeCard