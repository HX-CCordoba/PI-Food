const express = require("express");
const recipes = require("./recipes.js");
const { DietType, Recipe, createDiets } = require("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = express();

router.use(express.json());
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(`/recipes`, recipes);

//Create a new recipe
router.post("/recipe", async (req, res, next) => {
  try {
    const { title, summary, score, healthScore, steps, image, dietTypes } =
      req.body;
    var recipe = await Recipe.create({
      title,
      summary,
      score,
      healthScore,
      image,
      steps,
    });
    dietTypes &&
      dietTypes.forEach(async (d) => {
        const diet = await DietType.findOne({
          where: { name: d },
        });
        recipe.addDietType(diet);
      });

    res.status(201).send("Created");
  } catch (error) {
    next(error);
  }
});

router.get("/types", async (req, res) => {
  try {
    const types = await DietType.findAll();
    return res.json(types);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
