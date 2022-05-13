const { Router } = require("express");
const { Recipe, API_KEY, DietType } = require("../db");
const axios = require("axios");
const router = Router();

const getApi = async () => {
  const apiInfo = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
  );
  const apiRecipes = apiInfo.data?.results.map((recipe) => {
    return {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      summary: recipe.summary.replace(/(<([^>]+)>)/gi, ""),
      spoonacularScore: recipe.spoonacularScore,
      healthScore: recipe.healthScore,
      diets: recipe.diets,
      dishTypes: recipe.dishTypes,
      steps: recipe.analyzedInstructions[0]?.steps.map((e) => {
        return e.step;
      }),
    };
  });
  return apiRecipes;
};
const getDataBase = async () => {
  let recipe = await Recipe.findAll({
    include: {
      model: DietType,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  return recipe;
};

const getAllRecipes = async () => {
  const [apiRecipes, dbInfo] = await Promise.all([getApi(), getDataBase()]);
  return [...apiRecipes, ...dbInfo];
};

module.exports = {
  getAllRecipes,
  getApi,
};
