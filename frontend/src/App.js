
import './App.css';
import RecipeList from './RecipeList';

import AddRecipe from './AddRecipe';
import UpdateRecipe from './UpdateRecipe';
import {Routes,Route} from "react-router-dom"

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<RecipeList/>} />
        <Route path='/add-recipe' element={<AddRecipe/>} />
        <Route path='/update-recipe/:id' element={<UpdateRecipe/>} />
      </Routes>
    </>
  );
}

export default App;
