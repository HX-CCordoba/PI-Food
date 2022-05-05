import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllRecipes, getDiets, getRecipesByCreated, getRecipesByDiet, removeFilters, sortRecipes } from '../../redux/actions';
import RecipeCard from '../RecipeCard/RecipeCard';
import Paginate from './Paginate'
import SearchBar from './SearchBar';
const Home = () => {

  const recipes = useSelector(state => state.recipes);
  const allDiets = useSelector(state => state.diets);
  const errors = useSelector(state => state.errors);

  const [currentPage, setCurrentPage] = useState(1);
  const [recipePerPage] = useState(9);
  const [showDiets, setShowDiets] = useState('Show');
  const [sorted, setSorted] = useState(false);
    //pagination
  const indexLastRecipe = currentPage * recipePerPage;
  const indexFirstRecipe = indexLastRecipe - recipePerPage;
  const currentRecipe = recipes.slice(indexFirstRecipe, indexLastRecipe);

  //change page
  const paginat = (pageNumber) => {
    for (let i = 1; i <= Math.ceil(recipes.length/recipePerPage); i++) {
      let page = document.getElementById(i);
      page.classList.remove("currentPage");
    }
    let current = document.getElementById(pageNumber);
    current.classList.add("currentPage")
    setCurrentPage(pageNumber)
  }
    
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllRecipes());
    dispatch(getDiets());

  }, [dispatch])
  
  function handleShowAllRecipes(e){
    e.preventDefault();
    dispatch(getAllRecipes());
  }

  function handleSortRecipes(e){
    e.preventDefault();
    dispatch(sortRecipes(e.target.value));
    sorted ? setSorted(false) : setSorted(true);  
  }

  function handleFilerByCreated(e){
    e.preventDefault();
    dispatch(getRecipesByCreated(e.target.value));
    setCurrentPage(1);  
  }

  function handleShowDiets(e){
    e.preventDefault();
    if (showDiets === 'Show') setShowDiets('Hide')
    else{ 
      setShowDiets('Show');
      dispatch(removeFilters());
    }  

  }

  function handleFilerByDiet(e){
    let {id} = e.target;
    if(id !== 'reset'){
      let diet = document.getElementById(id);
      diet.className === 'pressed'
      ? diet.classList.remove('pressed') 
      : diet.classList.add('pressed');
      dispatch(getRecipesByDiet(id));
    }else{
      allDiets.forEach(e => {
        let diet = document.getElementById(e.name) ;
        diet.classList.remove('pressed');
      });
      dispatch(removeFilters(id));
    }
    setCurrentPage(1);

  }
    return (
    <div>
      <div>
      <SearchBar/>

        <div className='filters'>
          <div className='selects'>
            <select defaultValue={"default"} onChange={handleSortRecipes}>
              <option value="default" hidden>Sort Alphabetically</option>
              <option value="a-z">A-Z</option>
              <option value="z-a">Z-A</option>
            </select>
            <select defaultValue={'default'} onChange={handleFilerByCreated}>
              <option value="default" hidden >Show Your Recipes</option>
              <option value="all">All</option>
              <option value="api">Api</option>
              <option value="created">Created</option>
            </select>            
          </div>
        </div>
        <input type="button" id='showFilters' onClick={handleShowDiets} value={`${showDiets} Filters`}/>

        <div className='diets'>
          {allDiets && showDiets !== 'Show' &&
           allDiets.map(e => (
            <div key={e.id} className="dietText">
              <h3 id={e.name}  onClick={e => handleFilerByDiet(e)}>{e.name.toUpperCase()}</h3> 
            </div>
          ))}
          {showDiets !== 'Show' && <input type="button" value="Reset Filters" id="reset" className='resetFilters' onClick={e => handleFilerByDiet(e)}/>}

        </div>
      </div>
      {errors.recipe || errors.created || errors.search
      ? 
      <div>
        {errors.recipe && 
        <h1 className='h1404'>Oops!... We couldn't Find Recipes With Those Types of Diets</h1>
        }
        {errors.created &&
        <h1 className='h1404'>Oops!... You Don't Have Recipes Created</h1>
        }
        {errors.search &&
        <div>
          <h1 className='h1404'>Oops!... We couldn't Find Recipes With That Name</h1>
          <div className='searchBar'>
            <input type="button" value="Show All Recipes"  onClick={e => handleShowAllRecipes(e)}/>
          </div>
        </div>
        
        }
        <div className='error404'></div>
      </div>
      :  
      <div className='recipeCards'>  
        {currentRecipe?.map(recipe => {
          return <RecipeCard
          key = {recipe.id}
          id = {recipe.id}
          title = {recipe.title}
          image = {recipe.image}
          diets = {recipe.dietTypes ? recipe.dietTypes.map(e => e.name) : recipe.diets}/>
          })}
      </div>}
    {recipes.length > 9 && <Paginate recipePerPage={recipePerPage} totalRecipes={recipes.length} paginat={paginat} />}
  </div>)
};

export default Home;