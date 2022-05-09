import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
import Home from "./components/Home/Home";
import RecipeDetail from "./components/RecipeDetail/RecipeDetail";
import FormRecipe from "./components/CreateRecipe/CreateRecipe";
import Landing from "./components/Landing/Landing";
import AboutMe from "./components/AboutMe/AboutMe";

function App() {
  return (
    <>
      <Route exact path={"/"} component={Landing} />
      <Route path={"/Home"} component={Home} />
      <Route path={"/recipes/:id"} component={RecipeDetail} />
      <Route path={"/formRecipe"} component={FormRecipe} />
      <Route path={"/aboutMe"} component={AboutMe} />
    </>
  );
}

export default App;
