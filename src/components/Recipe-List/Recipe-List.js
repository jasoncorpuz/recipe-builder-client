import React, { Component } from 'react';
import './Recipe-List.css'
import ApiServices from '../../services/api-service'
import { NavLink } from 'react-router-dom'
//TODO: implement fetch call to map the data


class RecipeList extends Component {
    state={
        recipes:[{}]
    }

    componentDidMount() {
        ApiServices.getAllRecipes()
        .then(rec => this.setState({
            recipes:rec 
        }))
    }
    render() {
        const { recipes } = this.state
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
                <h1>Completed Concoctions:</h1>
                {list}
            </div>
        );
    }
}

export default RecipeList;