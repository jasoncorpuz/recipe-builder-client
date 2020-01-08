import React, { Component } from 'react';
import RecipeContext from '../RecipeContext'
import ApiService from '../../services/api-service';
import './Contribute.css'

class Contribute extends Component {
    state = {
        contribution: '',
        ingredient: '1',
        contributionList: [{}]
    }
    static contextType = RecipeContext

    onSubmit(e, cb) {
        e.preventDefault();
        const { completedRecipe } = this.context
        const excludedRecId = this.filterDuplicateRecipe(Number(this.state.ingredient)) // = id
        const randomRecipe = this.generateRandomRecipe(excludedRecId)

        const newContribution = {
            contribution_name: this.state.contribution,
            ingredient_id: this.state.ingredient,
            recipe_id: randomRecipe,
        }
        
        ApiService.postContibution(newContribution)
            .then(res => {
                completedRecipe(randomRecipe)
            })

    }

    filterDuplicateRecipe(ingredientId) {
        //?? if ingredient is in recipe, filter out that recipe rd
        // randomnly select from array that is filtered
        // create sudo recipes??? this worked.
        const { contributionList } = this.state
        const filterDup = contributionList.filter(x =>
            x.ingredient_id === ingredientId
        )
        if (filterDup.length === 0) { 
            return 0
        } else {
            return filterDup[0].recipe_id
        }
    }

    generateRandomRecipe(notIncluded) {
        const { recipes } = this.context
        const unfinishedRec = recipes.filter(rec => (
            rec.completed !== true
        ))
        const recipeList = unfinishedRec.map(rec => {
            return rec.id
        })
        const filterDuplicateOut = recipeList.filter(rec =>
            rec !== notIncluded)
        const length = filterDuplicateOut.length
        const ind = Math.floor(Math.random() * length)  //returns index

        return filterDuplicateOut[ind]
    }

    updateContName(e) {
        this.setState({
            contribution: e.target.value
        })
    }

    updateIng(e) {
        this.setState({
            ingredient: e.target.value
        })
    }

    componentDidMount() {
        ApiService.getAllContributions()
            .then(cont => {
                this.setState({
                    contributionList: cont
                })
            })
            .catch(e => console.log(e))
    }
    render() {
        const { ingredients } = this.context
        const options = ingredients.length !== 1 ? ingredients.map(ing => {
            return (
                <option key={ing.id} id={ing.id} value={ing.id} >
                    {ing.ingredient_name}
                </option>
            )
        })
            : null
        return (
            <form onSubmit={(e) => this.onSubmit(e)}>
                <fieldset>
                    <legend><h1>contribute to a recipe...</h1></legend>
                    <label htmlFor='contribution-name' >name your contribution:</label>
                    <input type='text' placeholder="contribution name" onChange={e => this.updateContName(e)} />
                    <label htmlFor='ingredient'>choose your ingredient:</label>
                    <select onChange={e => this.updateIng(e, this.context.completedRecipe)}>
                        {options}
                    </select>
                    <button type='submit'>submit</button>
                    <div className='info'>
                        <p className='info'>When a recipe hits 5 contributions, it's completed. You'll be notified when a recipe you've contributed to is finished.</p>
                    </div>
                </fieldset>
            </form>
        );
    }
}

export default Contribute;