const express = require("express");
const upload = require("../middleware/upload");
const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe
} = require("../controllers/recipesController");

const router = express.Router();

router.get("/", getAllRecipes);
router.post("/add", upload.single("image"), createRecipe);
router.get("/:id", getRecipeById);
router.put("/:id", upload.single("image"), updateRecipe);
router.delete("/:id", deleteRecipe);

module.exports = router;
