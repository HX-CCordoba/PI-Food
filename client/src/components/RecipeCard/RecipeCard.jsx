import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ id, title, diets, image, score, healthScore }) => {

  return (
    <Link to={`recipes/${id}`}>
      <div className='recipeCard'>
        <img src={image} alt={title} />
        <h2>{title}</h2>
        <p>Taste: {score}</p>
        <p>Health Score: {healthScore}</p>
        <p>{`Diets: ${diets.join(", ")}`}</p>
      </div>
    </Link>


  );
};

export default RecipeCard;