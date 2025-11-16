import axios from "axios"

const host = "http://localhost:4000";
export const createRecipe = async (recipeData) => {
    try {
        const {data} = await axios.post(`${host}/recipes/add`,recipeData);
        return data;
    } catch (error) {
        return {success:false,error:error.response.data.error}
    }
}

//get all recipe
export const getAllRecipe = async () => {
    try {
        const {data} = await axios.get(`${host}/recipes`);
        return data;
    } catch (error) {
        console.log(error)
        return {success:false,error:error.response.data.error}
    }
}

//get recipe by id
export const getRecipeById = async (id) => {
    try {
        const {data} = await axios.get(`${host}/recipes/${id}`);
        return data;
    } catch (error) {
        console.log(error)
        return {success:false,error:error.response.data.error}
    }
}

// update recipe by id
export const updateRecipeById = async (id,recipeData) => {
    try {
        const {data} = await axios.put(`${host}/recipes/${id}`,recipeData);
        return data;
    } catch (error) {
        return {success:false,error:error.response.data.error}
    }
}

// delete recipe by id
export const deleteRecipeById = async (id) => {
    try {
        const {data} = await axios.delete(`${host}/recipes/${id}`);
        return data;
    } catch (error) {
        return {success:false,error:error.response.data.error}
    }
}