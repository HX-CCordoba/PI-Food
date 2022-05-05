import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
import Home from "./components/Home/Home";
import RecipeDetail from "./components/RecipeDetail/RecipeDetail";
import FormRecipe from "./components/CreateRecipe/CreateRecipe";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <>
      <Route path={"/"} component={NavBar} />
      <Route exact path={"/Home"} component={Home} />
      <Route path={"/recipes/:id"} component={RecipeDetail} />
      <Route exact path={"/formRecipe"} component={FormRecipe} />
    </>
  );
}

export default App;
