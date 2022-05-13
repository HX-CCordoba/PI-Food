import React, { useEffect } from 'react';
import { createRecipe, getDiets, removeRecipeDetail, getAllRecipes, updateRecipe } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../NavBar/NavBar';
import { useHistory, useParams } from 'react-router-dom';
import Footer from '../Footer/Footer';

const FormRecipe = (props) => {
    const history = useHistory();

    const { id } = useParams();
    const recipe = useSelector(state => state.recipeDetail)
    let [deleted, setDeleted] = React.useState(false);
    let { title, image, summary, score, healthScore, steps, dietTypes } = recipe;
    dietTypes = dietTypes?.map(e => e.name);
    let [input, setInput] = React.useState({
        title,
        image,
        summary,
        score,
        healthScore,
        steps,
        dietTypes,
    })
    let [errors, setErrors] = React.useState({})

    const src = "https://images.food52.com/wulM9ARxwbCaQEeW0R6fmjisGZY=/fit-in/1200x1200/2d6bdab3-4206-4c3d-ac52-e428177251bc--default-recipe.jpg";
    const allDiets = useSelector(state => state.diets)
    const allRecipes = useSelector(state => state.allRecipes)

    const allTitles = allRecipes.map(e => e.title.toLowerCase());

    function validate(input) {
        let errors = {}
        if (input.title === "") errors.title = 'A title is required';
        if (/^\s/.test(input.title)) errors.title = 'You must complete this Field';
        if (/[`~,.<>;':"/[\]|{}()=_+-?¡!¿*{}´´¨´&%$#°]/.test(input.title)) errors.title = "Can't contain Especials Characters or numbers";
        if (input.summary === "") errors.summary = 'A description is required';
        if (allTitles.includes(input.title?.toLowerCase())) errors.title = 'This recipe already exists';
        if (!errors.title && !errors.summary) document.querySelector('.submit').disabled = false;
        return errors
    }
    const dispatch = useDispatch();
    useEffect(() => {
        if (!allDiets.length) dispatch(getDiets());
    }, [dispatch, input]);

    function handleDeleted() {
        setInput({
            ...input,
            dietTypes: []
        })
        setDeleted(true);
    }
    const handlerChooseDiet = (e, i) => {
        let { id } = e.target;

        let returnDiets = input.dietTypes.includes(id) ? input.dietTypes.filter(e => e !== id) : [...input.dietTypes, id];
        let diet = document.getElementById(id);
        diet.className === 'dietPressed'
            ? diet.classList.remove('dietPressed')
            : diet.classList.add('dietPressed');
        setInput({
            ...input,
            dietTypes: returnDiets,
        })
    }
    const handleChange = (e) => {
        e.preventDefault();
        var { name, value } = e.target;
        if (name === "step") {
            setInput({
                ...input,
                steps: value.split("."),
            })

        } else {
            setInput({
                ...input,
                [name]: value
            })
            setErrors(validate({ ...input, [name]: value }))
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!errors.title && !errors.summary) {
            dispatch(getAllRecipes())

            alert("Recipe Updated Succesfully!")
            dispatch(updateRecipe(id, input))
            setInput({
                title: '',
                image: '',
                summary: '',
                score: 0,
                healthScore: 0,
                steps: [],
                dietTypes: [],
            })
            history.push("/home");
            document.location.reload();
        }
    }
    return (
        <div>
            <NavBar></NavBar>
            <div className='createRecipe'>
                <form onSubmit={handleSubmit}>
                    <div className='form'>
                        <div>
                            <h1>Update Your Recipe</h1>

                            <div className='formInputs'>
                                <label>*: Required Fields</label>

                                <div>
                                    {errors.title && <label className='labelError'>{errors.title.toUpperCase()}</label>}
                                    <div className='labels'>
                                        <label>* Title: </label>
                                        <input className={errors.title ? 'error' : ''} type="text" name="title" maxLength="60" onChange={(e) => handleChange(e)} />
                                        <label>Taste Score: </label>
                                        <input type="range" max="100" min="1" name="score" onChange={(e) => handleChange(e)} />
                                        <label>Health Score: </label>
                                        <input type="range" max="100" min="1" name="healthScore" onChange={(e) => handleChange(e)} />
                                        <label>URL Image: </label>
                                        <input name="image" onChange={(e) => handleChange(e)} />
                                    </div>
                                    <div>
                                        <h4 className='inputDiets'>Diets of Your Recipe</h4>
                                        <div className='chooseDiets'>
                                            {allDiets?.map((diet, i) => {
                                                return (
                                                    <div>
                                                        <div key={diet.id} className={`diet${i} diet`}>
                                                            <p id={diet.name} className={input.dietTypes.includes(diet.name) ? "dietPressed" : ''} onClick={(e) => handlerChooseDiet(e, i)}>{diet.name}</p>
                                                        </div>
                                                    </div>)
                                            })}

                                        </div>
                                    </div>
                                </div>

                                <div className="inputDescription">
                                    <h4>* Description: </h4>
                                    {errors.summary && <label className='labelError'>{errors.summary.toUpperCase()}</label>}
                                    <textarea className={errors.summary ? 'error summary' : 'summary'} type="text" maxLength="500" placeholder='Tell us About Your Recipe...' name="summary" onChange={(e) => handleChange(e)} />
                                    <h4>Steps: </h4>
                                    <textarea name='step' maxLength="500" placeholder='Tell us How to make it...' className='step' onChange={(e) => handleChange(e)} />

                                </div>





                            </div>

                        </div>
                        {/* Form Info */}
                        <div className='formRecipe'>
                            <div className='cardForm cardRow'> {/* Card Recipe */}
                                <h1>See how It's Going</h1>

                                <div className='recipeDetail detailPresentation'>
                                    <div className=' detailCard detailColumn'>
                                        {input.title && <h3>{input.title}</h3>}

                                        <div className=' presentation ' >
                                            <div className='scores'>
                                                <h4>General Score: <span> {`${Math.floor((Number(input.healthScore) + Number(input.score)) / 2)}`} </span></h4>
                                                <div className='others'>
                                                    <h5>Health: {input.healthScore}</h5>
                                                    <h5>Taste: {input.score}</h5>
                                                </div>
                                            </div>
                                            <img id="img" src={input.image} onError={function handleError(e) {
                                                e.preventDefault();
                                                let img = document.getElementById('img');
                                                img.src = src;
                                                setInput({
                                                    ...input,
                                                    image: src,
                                                })
                                            }} alt={input.title} />
                                            <div className={`${input.dietTypes?.length >= 3 ? "muchDiets" : null} dietsDetail `}>
                                                <h5>Diets: </h5>
                                                <p>{input.dietTypes?.join(", ").toUpperCase()}</p>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='cardRow'>{/* Description Recipe */}
                                <div className='recipeDetail detailDescription'>
                                    <div className='detailCard detailColumn'>
                                        <div className='description '>
                                            <h3>About this recipe:</h3>
                                            {input.summary && <p>{input.summary}</p>}
                                        </div>
                                    </div>
                                </div>
                                <div className='recipeDetail '>
                                    <div className='stepsDetail detailDescription'>
                                        <h3>How to Make This Recipe: </h3>
                                        <div className='list'>
                                            {input.steps && input.steps.map((e, i) => (<div key={i} className='step'><p>{e}</p></div>))}
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <button className='submit' type="submit" disabled>Update Recipe</button>
                    </div>
                </form>
            </div>
            <Footer />

        </div>

    );

};

export default FormRecipe;
