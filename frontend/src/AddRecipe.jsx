import React from 'react'
import RecipeForm from './RecipeForm'
import {createRecipe} from "./actions/recipe"

const AddRecipe = () => {
  return (
    <RecipeForm title={"Create Recipe"} onSumit={createRecipe} recipeData={{recipe_prepare_time:"01:00",recipe_cook_time:"01:00"}} />
  )
}

export default AddRecipe
