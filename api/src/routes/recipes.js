const { Router } = require("express");
const { Recipe, API_KEY, DietType } = require("../db");
const { getAllRecipes } = require("./getInfo");
const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { title } = req.query;
    const allRecipes = await getAllRecipes();

    if (title) {
      let recipes = allRecipes.filter((e) =>
        e.title.toLowerCase().includes(title.toLowerCase())
      );
      res.json(recipes);
    } else {
      res.json(allRecipes);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:idRecipe", async (req, res, next) => {
  try {
    const { idRecipe } = req.params;
    const allRecipes = await getAllRecipes();

    if (idRecipe) {
      let recipe = allRecipes.filter((e) => e.id == idRecipe);
      recipe
        ? res.json(recipe)
        : res.status(404).send("Can't find that recipe");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
