import React ,{useEffect,useState}from 'react'
import RecipeCard from './RecipeCard'
import { useNavigate } from "react-router-dom"
import {getAllRecipe,deleteRecipeById} from "../actions/recipe"
import toast from 'react-hot-toast'
import RecipeDeleteModal from './RecipeDeleteModal'

const RecipeList = () => {
    const [recipesList,setRecipesList] = useState([])
    const [selectedRecipe,setSelectedRecipe] = useState(null)
    const navigate = useNavigate();

    const onDeleteModalCancel = () => {
        setSelectedRecipe(false)
    }

    const deleteRecipe = async (id) => {
        const {success,error,message} = await deleteRecipeById(id)
        if(!success){
            return toast.error(error);
        }
        toast.success(message);
        setSelectedRecipe(null)
       getRecipes()
    }

    const getRecipes =async () => {
        const {success ,allrecipe,error} = await getAllRecipe();
        if(success){
            setRecipesList(allrecipe);
        }else{
            console.log(error)
            toast.error("error while feching recipe list")
        }
    }

    useEffect(()=>{
        getRecipes();
    },[])

    return (
        <>
        {selectedRecipe && <RecipeDeleteModal recipe={selectedRecipe} onCancel={onDeleteModalCancel} onAccept={deleteRecipe} />}
            <div className="d-flex justify-content-end align-items-center my-2">
                <button type="button" className="btn btn-primary m-4" onClick={() => navigate("/add-recipe")}>
                    Add New Recipe
                </button>
            </div>
            <div>
            
            { recipesList && recipesList.length > 0 && <>
             <h2 className='text-center text-uppercase fw-bold text-decoration-underline text-info-emphasis'>All Recipe</h2>
                
            { recipesList.map((recipe)=> <RecipeCard key={recipe.id} recipe={recipe} setSelectedRecipe={setSelectedRecipe} />)}
            </>
             }
             {recipesList && recipesList.length === 0 && 
             <div className='row'>
             <h2 className='text-center fw-bold text-warning'>No recipes yet — create one using the button above</h2>
             </div>
              }
             </div>
        </>
    )
}

export default RecipeList
