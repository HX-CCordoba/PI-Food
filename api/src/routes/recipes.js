const { Router } = require("express");
const { Recipe, DietType } = require("../db");
const { getAllRecipes, getApi } = require("./getInfo");
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
    const Api = await getApi();

    if (idRecipe) {
      let recipeApi = Api.filter((e) => e.id == idRecipe);
      let returnRecipe =
        idRecipe.length < 15
          ? recipeApi
          : [
              await Recipe.findByPk(idRecipe, {
                include: {
                  model: DietType,
                  attributes: ["name"],
                  through: {
                    attributes: [],
                  },
                },
              }),
            ];
      returnRecipe
        ? res.json(returnRecipe)
        : res.status(404).send("Can't find that recipe");
    }
  } catch (error) {
    next(error);
    res.send("Not Found");
  }
});

router.put("/update/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    let { title, summary, score, healthScore, steps, image, dietTypes } =
      req.body;
    if (typeof id === "number") {
      res.send("Can't update this recipe");
    } else if (typeof id === "string") {
      Recipe.update(
        {
          title,
          summary,
          score,
          healthScore,
          steps,
          image,
        },
        {
          where: { id: id },
        }
      );
      if (dietTypes.length) {
        let arr = [];
        var recip = await Recipe.findOne({
          where: {
            id: id,
          },
        });
        for (let i = 0; i < dietTypes.length; i++) {
          const diet = await DietType.findOne({
            where: { name: dietTypes[i] },
          });
          arr.push(diet);
        }
        await recip.setDietTypes(arr[0]);
        if (arr[1]) {
          for (let i = 1; i < arr.length; i++) {
            await recip.addDietTypes(arr[i]);
          }
        }
      }
      res.send(recip);
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (typeof id === "number") {
      res.send("Can't delete this recipe");
    } else if (typeof id === "string") {
      Recipe.destroy({
        where: { id: id },
      });
      res.send("Deleted");
    }
  } catch (err) {
    next(err);
  }
});
module.exports = router;
