import React, {useEffect} from 'react';
import { createRecipe, getDiets } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
// Fijense en los test que SI O SI tiene que ser un functional component, de otra forma NO VAN A PASAR LOS TEST
// Deben usar Hooks para que los test pasen.
// No realicen un destructuring de ellos, sino que utilicenlos de la siguiente forma 'React.useState' y 'React.useEffect' ,
// Si no lo hacen asi los test no van a correr.

const FormRecipe = () => {

   let [input, setInput] = React.useState({
      title: '',
      image: '',
      summary: '',
      score: 0,
      healthScore: 0,
      steps: [{step:""}],
      diets: [],
   })

   const dietsType = useSelector(state => state.diets)

   function validate(input) {
      let error = {title: "", summary: "", step: ""};
      if(!input.title) error.title = 'The recipe must have a title';
      if(!input.summary) error.summary = 'The recipe must have a description';
      if(input.steps[0].step === "") error.step = 'The recipe must have steps';
      return error;
   }

   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(getDiets())
    }, [dispatch]);
   
   const addStep = (e) => {
      setInput({
         ...input,
         steps: [...input.steps, {step:""}]
      });
   }
   const removeStep = (e, i) => {
      let newSteps = [...input.steps];
      newSteps.splice(i, 1);
      setInput({
         ...input,
         steps: newSteps,
      });

   }
    const handleChange = (e, i) => {
      var {name, value} = e.target
      if(e.target.checked){
         setInput({
            ...input,
            diets : [...input.diets, value]
        })

        }
        else if(name === "step"){
           input.steps[i][name] = value;

         setInput({
            ...input,
            steps: [...input.steps]
        })
        }
        else{
         setInput({
            ...input,
            [name]: e.target.value
        })
        }
        //Errors
        function errorsStyles(prop) {
         let error = document.querySelector(`.${prop}`);

         if (errors[prop] !== "") {
            error.classList.add('error');
         }else{
            error.classList.remove('error')
         }
        }
        let errors = validate(input);
        console.log(errors)
        for (const key in errors) {
           console.log(key)
           errorsStyles(`${key}`)
        }
        

   }

   function handleSubmit(e) {
      e.preventDefault();
      
      if(!input.title || !input.summary || !input.diets.length){
         e.preventDefault()
         return alert("Papi nombre y resumen, crees que lo puse por adorno que?")
     } else {
     
     dispatch(createRecipe(input))
     alert('Recipe sucessfuly created!!!')
     setInput({
      title: '',
      image: '',
      summary: '',
      score: 0,
      healthScore: 0,
      steps: [{step:""}],
      diets: [],
     })
   }
   }
  return (
     <div>
      <div>Create Your Own Recipe</div>
      <form onSubmit={handleSubmit}>
         <label>Title: </label>
         <input type="text" name="title" className='title' onChange={(e) =>handleChange(e)}/>
         <label>Description: </label>
         <textarea type="text" name="summary" className='summary' onChange={(e) => handleChange(e)}/>
         <label>Score: </label>
         <input type="number" name="score"onChange={(e) => handleChange(e)}/>
         <label>Healt Score: </label>
         <input type="number" name="healthScore"onChange={(e) => handleChange(e)}/>
         <label>URL Image: </label>
         <input name="image"onChange={(e) => handleChange(e)}/>
         <label>Steps </label>

         {input.steps.map((step, index) => (
            <div key={index }>
               <div className='firstStep'>
                  <input type="text" name='step' className='step' onChange={(e) => handleChange(e, index)}/>
                  {input.steps.length - 1 === index && 
                  (
                     <input type="button" value="+" onClick={addStep}/>
                  )}
               </div>
               <div className='addedStep'>
                  {input.steps.length >= 2 && 
                  (
                     <input type="button" value="Remove" onClick={(e) => removeStep(e, index)}/>
                  )}
               </div>
            </div>
         ))}
         {dietsType?.map(diet => {
            return(
            <div key={diet.id}>
               <label>{diet.name}</label>
               <input type="checkbox" name="diets" value={diet.name}  onChange={(e) => handleChange(e)}/>
            </div>)
         })}
         <button type="submit">Create Recipe</button>
      </form>
     </div>
      
   );
};

export default FormRecipe;
