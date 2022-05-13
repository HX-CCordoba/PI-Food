import axios from "axios";

export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const GET_RECIPE_DETAIL = "GET_RECIPE_DETAIL";
export const REMOVE_RECIPE_DETAIL = "REMOVE_RECIPE_DETAIL";
export const GET_DIETS = "GET_DIETS";
export const GET_BY_TITLE = "GET_BY_TITLE";
export const FILTER_BY_DIET = "FILTER_BY_DIET";
export const REMOVE_FILTERS = "REMOVE_FILTERS";
export const FILTER_BY_CREATED = "FILTER_BY_CREATED";
export const SORT_BY_NAME = "SORT_BY_NAME";
export const DELETE_RECIPE = "DELETE_RECIPE";
export const UPDATE_RECIPE = "UPDATE_RECIPE";

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

export const removeRecipeDetail = () => {
  return { type: REMOVE_RECIPE_DETAIL };
};
export const getDiets = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/types/");
      dispatch({ type: GET_DIETS, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getByName = (title) => {
  return async function (dispatch) {
    if (title.length) {
      const response = await axios
        .get(`http://localhost:3001/recipes?title=${encodeURIComponent(title)}`)
        .then((res) => dispatch({ type: GET_BY_TITLE, payload: res.data }))

        .catch((err) => console.log(err));
    }
  };
};

export const createRecipe = (recipe) => {
  return async function () {
    axios
      .post("http://localhost:3001/recipe", recipe)
      .catch((err) => console.log(err.message));
  };
};

export function sortRecipes(data) {
  return {
    type: SORT_BY_NAME,
    payload: data,
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
export function deleteRecipe(payload) {
  axios
    .delete("http://localhost:3001/recipes/delete/" + payload)
    .catch((err) => console.log(err.message));
  return {
    type: DELETE_RECIPE,
    payload,
  };
}

export function updateRecipe(id, input) {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/recipes/update/" + id,
        input
      );
      dispatch({ type: UPDATE_RECIPE, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
}
