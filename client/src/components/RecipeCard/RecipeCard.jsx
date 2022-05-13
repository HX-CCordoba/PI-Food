import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteRecipe } from "../../redux/actions"
const RecipeCard = ({ id, title, diets, image, score, healthScore, createdDB }) => {
  const dispatch = useDispatch();
  function handleDelete() {
    if (window.confirm("Are you sure you want to Delete this Recipe?")) {
      dispatch(deleteRecipe(id));
      document.location.reload();
    }
  }

  return (
    <div className='recipeCard'>
      {createdDB ? <button className='deleteButton' onClick={handleDelete}>X</button> : null}
      <Link to={`recipes/${id}`}>
        <img src={image} alt={title} />
        <h2>{title}</h2>
        <p>Taste: {score}</p>
        <p>Health Score: {healthScore}</p>
        <p>{`Diets: ${diets.join(", ")}`}</p>
      </Link>
    </div>



  );
};

export default RecipeCard;