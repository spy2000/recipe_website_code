import { useEffect ,useState} from "react"
import {getRecipeById,updateRecipeById} from "./actions/recipe"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import RecipeForm from "./RecipeForm"

const UpdateRecipe = () => {
    const [recipeDetail,setRecipeDetail] = useState(null)
    const param = useParams()

    const getRecipewithId = async (id) => {
        const {success,error,recipeDetail:recipe} = await getRecipeById(id)

        if(!success){
            return toast.error(error)
        }
        setRecipeDetail(recipe)
    }

    useEffect(()=>{
        if(param?.id){
            getRecipewithId(param.id)
        }
    },[param])
  return (
    <>
      {recipeDetail && <RecipeForm title={"Update Recipe"} onSumit={updateRecipeById} recipeData={recipeDetail} />}
    </>
  )
}

export default UpdateRecipe
