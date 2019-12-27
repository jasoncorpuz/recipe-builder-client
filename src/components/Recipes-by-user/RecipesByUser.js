import React, { Component } from 'react';
import ApiService from '../../services/api-service'

class RecipesByUser extends Component {
    state = { 
        recipes: [{}]
     }

     setRecipes(res){
        const reduced =[]
        for (let i = 0; i < res.length; i++){
          reduced.push({
          recipe: res[i].recipe, 
          recipe_id: res[i].recipe_id
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
        const {recipes} = this.state
        const recipeList = recipes.length !== 1? recipes.map(rec => {
            return (
            <div className='recipe' key ={rec.recipe_id} id = {rec.recipe_id}>
                {rec.recipe}
            </div>
            )
        })
        :null
        return (
            <section>{recipeList}</section>
        );
    }
}

export default RecipesByUser;