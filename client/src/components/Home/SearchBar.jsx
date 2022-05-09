import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../../redux/actions";

const SearchBar = () => {

  const dispatch = useDispatch()

  const [search, setSearch] = useState("");

  function handleChange(e) {
    e.preventDefault()
    setSearch(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(getByName(search))
    setSearch("")
  }

  return (
    <div>
      <div className="searchBar">
        <input type="search" placeholder='Name of the Recipe...' value={search} onChange={(e) => handleChange(e)} />
        <input type="button" value="Search" onClick={(e) => handleSubmit(e)} />
      </div>


    </div>

  )
}

export default SearchBar