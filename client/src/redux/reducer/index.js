// Importa las action types acá
import {
  GET_ALL_RECIPES,
  GET_RECIPE_DETAIL,
  GET_DIETS,
  GET_BY_TITLE,
  FILTER_BY_DIET,
  FILTER_BY_CREATED,
  REMOVE_FILTERS,
  SORT_BY_NAME,
  REMOVE_RECIPE_DETAIL,
  DELETE_RECIPE,
  UPDATE_RECIPE,
} from "../actions";

const initialState = {
  recipes: [],
  allRecipes: [],
  recipeDetail: {},
  diets: [],
  dietsSelected: [],
  errors: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    // Acá va tu código:
    case GET_ALL_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
        errors: {},
      };
    case GET_RECIPE_DETAIL:
      return {
        ...state,
        recipeDetail: action.payload[0],
      };
    case REMOVE_RECIPE_DETAIL:
      return {
        ...state,
        recipeDetail: {},
      };
    case GET_DIETS:
      return {
        ...state,
        diets: action.payload,
      };
    case GET_BY_TITLE:
      state.errors = {};
      if (action.payload.length) {
        return {
          ...state,
          recipes: action.payload,
        };
      } else {
        return { ...state, errors: { search: true } };
      }

    case FILTER_BY_DIET:
      const allRecipes = state.allRecipes;
      state.errors = {};
      state.dietsSelected.includes(action.payload)
        ? (state.dietsSelected = state.dietsSelected.filter(
            (e) => e !== action.payload
          ))
        : (state.dietsSelected = [...state.dietsSelected, action.payload]);

      var recipesByDiet =
        action.payload === "reset"
          ? allRecipes
          : allRecipes.filter((recipe) =>
              state.dietsSelected.every((e) => recipe.diets.includes(e))
            );
      if (Array.isArray(recipesByDiet) && !recipesByDiet.length) {
        return {
          ...state,
          errors: { recipe: true },
        };
      }
      return {
        ...state,
        recipes: recipesByDiet,
      };
    case REMOVE_FILTERS:
      return {
        ...state,
        recipes: state.allRecipes,
        dietsSelected: [],
        errors: {},
      };
    case FILTER_BY_CREATED:
      var getRecipesByCreated =
        action.payload === "created"
          ? state.allRecipes.filter((e) => e.createdDB)
          : state.allRecipes.filter((e) => !e.createdDB);
      if (action.payload === "all") getRecipesByCreated = state.allRecipes;
      if (!getRecipesByCreated.length)
        return { ...state, errors: { created: true } };
      return {
        ...state,
        recipes: getRecipesByCreated,
        errors: {},
        dietsSelected: [],
      };
    case SORT_BY_NAME:
      let [value, id] = action.payload;
      function sort(value, prop) {
        const sortRecipes =
          value === "higher"
            ? state.recipes.sort((a, b) => {
                if (a.spoonacularScore && prop !== "title")
                  prop = "spoonacularScore";
                if (b.spoonacularScore && prop !== "title")
                  prop = "spoonacularScore";
                if (a[prop] > b[prop]) {
                  return 1;
                }
                if (b[prop] > a[prop]) {
                  return -1;
                }
                return 0;
              })
            : state.recipes.sort((a, b) => {
                if (a.spoonacularScore && prop !== "title")
                  prop = "spoonacularScore";
                if (b.spoonacularScore && prop !== "title")
                  prop = "spoonacularScore";
                if (a[prop] > b[prop]) {
                  return -1;
                }
                if (b[prop] > a[prop]) {
                  return 1;
                }
                return 0;
              });
        return sortRecipes;
      }

      const sortRecipes = sort(value, id);

      return {
        ...state,
        recipes: sortRecipes,
      };
    case DELETE_RECIPE:
      return {
        ...state,
        allRecipes: state.allRecipes.filter((e) => e.id !== action.payload),
      };
    case UPDATE_RECIPE:
      return {
        ...state,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
