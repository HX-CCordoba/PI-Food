import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../../redux/actions";

const SearchBar = () => {

    const dispatch = useDispatch()
    
    const [name, setName] =  useState("");

    function handleChange(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getByName(name))
        setName("")
    }

  return (
    <div>
      <div className="searchBar">
      <input type="search" placeholder='Name of the Recipe...' value={name} onChange={(e) => handleChange(e)} />
        <input type="button" value="Search" onClick={(e) => handleSubmit(e)}/>
      </div>

        
    </div>
    
  )
}

export default SearchBar