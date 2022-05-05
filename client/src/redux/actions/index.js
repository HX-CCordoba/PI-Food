import axios from "axios";

export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const GET_RECIPE_DETAIL = "GET_RECIPE_DETAIL";
export const GET_DIETS = "GET_DIETS";
export const GET_BY_TITLE = "GET_BY_TITLE";
export const FILTER_BY_DIET = "FILTER_BY_DIET";
export const REMOVE_FILTERS = "REMOVE_FILTERS";
export const FILTER_BY_CREATED = "FILTER_BY_CREATED";
export const SORT_BY_NAME = "SORT_BY_NAME";

export const getAllRecipes = () => {
  return async function (dispatch) {
    const response = await axios
      .get(`http://localhost:3001/recipes`)
      .then((res) => dispatch({ type: GET_ALL_RECIPES, payload: res.data }))

      .catch((err) => console.log(err));
    return response;
  };
};

export const getRecipeDetail = (idRecipe) => {
  return async (dispatch) => {
    const response = await axios
      .get(`http://localhost:3001/recipes/${idRecipe}`)
      .then((res) => dispatch({ type: GET_RECIPE_DETAIL, payload: res.data }))
      .catch((err) => console.log(err));
  };
};

export const getDiets = () => {
  return async (dispatch) => {
    const response = await axios
      .get("http://localhost:3001/types/")
      .then((res) => dispatch({ type: GET_DIETS, payload: res.data }))
      .catch((err) => console.log(err));
  };
};

export const getByName = (title) => {
  return async function (dispatch) {
    if (title.length) {
      const response = await axios
        .get(`http://localhost:3001/recipes?title=${title}`)
        .then((res) => dispatch({ type: GET_BY_TITLE, payload: res.data }))

        .catch((err) => console.log(err));
    }
  };
};

export const createRecipe = (recipe) => {
  let newSteps = [];
  recipe.steps.forEach((e) => {
    newSteps.push(e.step);
  });
  recipe.steps = newSteps;
  return async function () {
    axios
      .post("http://localhost:3001/recipe", recipe)
      .catch((err) => console.log(err.message));
  };
};

export function sortRecipes(payload) {
  return {
    type: SORT_BY_NAME,
    payload,
  };
}

export function getRecipesByDiet(payload) {
  return {
    type: FILTER_BY_DIET,
    payload,
  };
}

export function removeFilters(payload) {
  return {
    type: REMOVE_FILTERS,
    payload,
  };
}

export function getRecipesByCreated(payload) {
  return {
    type: FILTER_BY_CREATED,
    payload,
  };
}
