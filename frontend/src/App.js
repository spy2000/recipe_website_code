
import './App.css';
import RecipeList from './components/RecipeList';

import AddRecipe from './components/AddRecipe';
import UpdateRecipe from './components/UpdateRecipe';
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
