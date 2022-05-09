import React from 'react';

const Paginate = ({ recipePerPage, totalRecipes, paginat }) => {
    var pageNumebers = []

    for (let i = 1; i <= Math.ceil(totalRecipes / recipePerPage); i++) {
        pageNumebers.push(i)
    }

    return (
        <div className='paginate'>
            <ul>
                {pageNumebers.map(n => {
                    return <li key={n} onClick={() => paginat(n)} id={n}>
                        <a href='#'>
                            {n}
                        </a>
                    </li>
                })}
            </ul>
        </div>
    )
}

export default Paginate;
