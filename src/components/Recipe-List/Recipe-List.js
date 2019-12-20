import React, { Component } from 'react';
import RecipeContext from '../RecipeContext';
import './Recipe-List.css'
import { NavLink } from 'react-router-dom'
import Nav from '../Nav/Nav';
//TODO: implement fetch call to map the data


class RecipeList extends Component {
    static contextType = RecipeContext
    render() {
        const { recipes } = this.context
        const finishedRecipes = recipes.filter(rec => rec.completed === true)
        
        const list = finishedRecipes.length !== 1 ?
            finishedRecipes.map((rec, ind) => {
                return (
                    <NavLink to={`/recipe/${rec.id}`} key={rec.id}>
                        <div key={rec.id} className='recipe'>{rec.recipe_name}</div>
                    </NavLink>
                )
            })
            : null
        return (
            <div>
                <Nav />
                <h1>Completed Concoctions:</h1>
                {list}
            </div>
        );
    }
}

export default RecipeList;