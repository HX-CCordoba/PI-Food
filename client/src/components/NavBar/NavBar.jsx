import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="navbar" title="navbar">
      <Link to='/home'>
        <h1>HenryFood</h1>
      </Link>
      <div className='links'>
        <Link to='/formRecipe' className='link'>
          <span  >CREATE</span>
        </Link>
        <Link to='/home' className='link'>
          <span >HOME</span>
        </Link>
        <Link to='/aboutMe' className='link'>
          <span >ABOUT ME</span>
        </Link>
      </div>


    </nav>
  );
};

export default NavBar;