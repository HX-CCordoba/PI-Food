import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllRecipes } from '../../redux/actions';

function NavBar() {
  const dispatch = useDispatch();

  function handleAllRecipes(e){
    e.preventDefault()
    dispatch(getAllRecipes())
  }
  return (
    <nav className="navbar">
      <Link to='/home'>
        <h1>HenryFood</h1>
      </Link>
      <div className='links'>
        <Link to='/formRecipe' className='link'>
          <span  >CREATE</span>
        </Link>
        <Link to='/home' className='link' onClick={handleAllRecipes}>
          <span >HOME</span>
        </Link>
        <Link to='/home' className='link'>
          <span >ABOUT ME</span>
        </Link>
      </div>
      
        
    </nav>
  );
};

export default NavBar;