import React, { Component } from 'react';
import ApiService from '../../services/api-service'
import { NavLink, Link } from 'react-router-dom';

class RecipesByUser extends Component {
    state = {
        recipes: []
    }

    setRecipes(res) {
        //filter out duplicate recipes
        let reducedId= []
        const recipes = []
        
        const filtered = res.filter(rec => rec.completed === true)

        for (let i = 0; i < filtered.length; i++) {
            reducedId.push(filtered[i].recipe_id )
        }
        reducedId = [...new Set(reducedId)]

        for (let i = 0; i < reducedId.length; i++) {
           let id = filtered.find(rec => reducedId[i] === rec.recipe_id)
           recipes.push(id)
        }

        this.setState({
            recipes: recipes
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
                <div key={rec.recipe_id}>
                    <NavLink to={`/recipe/${rec.recipe_id}`} className='recipe' id={rec.recipe_id}>
                        {rec.recipe}
                    </NavLink>
                </div>
            )
        })
            :
            <>
                <h2>You haven't contributed anything yet!</h2>
                <div className='link'><Link to='/contribute'>Get started here.</Link></div>
            </>
        return (
            <section>
                <h1>My Recipes</h1>
                {recipeList}
            </section>
        );
    }
}

export default RecipesByUser;