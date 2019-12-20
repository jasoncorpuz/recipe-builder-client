import React, { Component } from 'react';
import ApiService from '../../services/api-service'
//implements a fetch called based on the id of the params
// renders all contributions in recipe

class Recipe extends Component {
    state = {
        recipe: [{}]
    }

    componentDidMount() {
        ApiService.getRecipeById(this.props.match.params.id)
            .then(recipe => {
                this.setState({
                    recipe: recipe
                })
            })
    }

    render() {
        const { recipe } = this.state
        const contributionsList = recipe.length !== 1 ? 
        recipe.map(cont => {
            return(
                <div key={cont.id} id={cont.id}>
                    <h2>{cont.ingredient}</h2>
                    contributed by {cont.contributor}...
                </div>
            )
        })
        :null

        return (
            <>
            <h1>{recipe[0].recipe}</h1>
            {contributionsList}
            </>
        );
    }
}

export default Recipe;

