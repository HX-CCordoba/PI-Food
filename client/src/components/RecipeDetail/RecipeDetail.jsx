import React, {useEffect} from 'react';
import { useDispatch, useSelector, useParams } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRecipeDetail } from '../../redux/actions';

const RecipeDetail = (props) => {

    let idRecipe = props.match.params.id;

    
    const dispatch = useDispatch()
    const recipe = useSelector(state => state.recipeDetail)

    useEffect( ()=>{
        dispatch( getRecipeDetail(idRecipe))
      },[dispatch, idRecipe])
    const score = recipe.score? recipe.score : recipe.spoonacularScore;
    console.log(recipe)
    return (
        <div className='recipeDetail'>
            <h1>{recipe.title}</h1>
            <div className='detailCard'>
                <div className='presentation'>
                    <div className='scores'>
                        <h4>General Score: <span> {`${Math.floor((recipe.healthScore + score) / 2)}`} </span></h4>   
                        <div className='others'>
                            <h5>Health: {recipe.healthScore}</h5>
                            <h5>Taste: {score}</h5>
                        </div>        
                    </div>
                    <img src={recipe.image} alt={recipe.title} />
                    <div className='dietsDetail'>
                        <h5>Diets: </h5>
                        <p>{recipe.dietTypes ? recipe.dietTypes.map(e => e.name)?.join(", ").toUpperCase() : recipe.diets?.join(", ").toUpperCase()}</p>
                    </div>
                    
                </div> 
                <div className='description'>
                    <h3>About this recipe:</h3>
                    <p>{recipe.summary}</p>
                </div>
                
                
            </div>
            {recipe.steps
            ? <div>
                <h4>steps: </h4>
                <ol>
                    {recipe.steps && recipe.steps.map((e, i) => (<li key={i}>{e}</li>))}
                </ol>
            </div>
            :  <div>            
               </div> 
            }
            
        </div> 
    )
};

export default RecipeDetail;