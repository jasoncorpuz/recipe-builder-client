import React, { Component } from 'react';
import ApiService from '../../services/api-service'
import { NavLink } from 'react-router-dom';

class RecipesByUser extends Component {
    state = {
        recipes: []
    }

    setRecipes(res) {
        const reduced = []
        const filtered = res.filter(rec => rec.completed === true)

        for (let i = 0; i < filtered.length; i++) {
            reduced.push({
                recipe: filtered[i].recipe,
                recipe_id: filtered[i].recipe_id
            })
        }


        this.setState({
            recipes: [...new Set(reduced)]
        })
    }

    componentDidMount() {
        ApiService.getRecipesByUser(this.props.match.params.id)
            .then(res => this.setRecipes(res))
    }
    render() {
        
        const { recipes } = this.state
        const recipeList = recipes.length !== 0 ? recipes.map(rec => {
            return (
                <div>
                <NavLink to={`/recipe/${rec.recipe_id}`} className='recipe' key={rec.recipe_id} id={rec.recipe_id}>
                    {rec.recipe}
                </NavLink>
                </div>
            )
        })
            : null
        return (
            <section>{recipeList}</section>
        );
    }
}

export default RecipesByUser;