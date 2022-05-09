import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipeDetail } from '../../redux/actions';
import NavBar from '../NavBar/NavBar';

const RecipeDetail = (props) => {

    let idRecipe = props.match.params.id;

    const dispatch = useDispatch()
    const recipe = useSelector(state => state.recipeDetail)

    useEffect(() => {
        dispatch(getRecipeDetail(idRecipe))
    }, [dispatch, idRecipe])

    const score = recipe.score ? recipe.score : recipe.spoonacularScore;
    const diets = recipe.dietTypes ? recipe.dietTypes.map(e => e.name) : recipe.diets;
    return (
        <div>
            <NavBar></NavBar>
            {recipe.id ?
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
                            <div className={`${diets?.length >= 3 ? "muchDiets" : null} dietsDetail`}>
                                <h5>Diets: </h5>
                                <p>{diets?.join(", ").toUpperCase()}</p>
                            </div>

                        </div>
                        <div className='description'>
                            <h3>About this recipe:</h3>
                            <p>{recipe.summary}</p>
                        </div>


                    </div>
                    {recipe.steps
                        ? <div className='stepsDetail'>
                            <h3>How to Make This Recipe: </h3>
                            <div className='list'>
                                {recipe.steps && recipe.steps.map((e, i) => (<div key={i} className='step'><p>{e}</p></div>))}
                            </div>
                        </div>
                        : <div>
                        </div>
                    }
                </div>

                :
                <img className='imgLoading' src="https://i.pinimg.com/originals/c4/cb/9a/c4cb9abc7c69713e7e816e6a624ce7f8.gif" alt="" />

            }

        </div>

    )
};

export default RecipeDetail;