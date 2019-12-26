import React, { Component } from 'react';
import ApiServices from '../../services/api-service';
import GeneratorService from '../../services/Generator-service'
import { Route, withRouter, Switch } from 'react-router-dom';
import Home from '../Home/Home'
import Landing from '../Landing/Landing';
import Signup from '../Recipe-List/Signup/Signup';
import Login from '../Login/Login'
import SignupSuccess from '../SignUp-Success/SignupSuccess'
import Contribute from '../Contribute/Contribute';
import Recipe from '../Recipe/Recipe';
import RecipeList from '../Recipe-List/Recipe-List';
import ContributionSuccess from '../Contribution-Success/Contribution-Success'
import ContributionsByUser from '../Contributions-by-user/Contributions-by-user'
import {ToastsContainer, ToastsStore} from 'react-toasts';
import Nav from '../Nav/Nav'
import RecipeContext from '../RecipeContext'
import './App.css';

let userId; 

class App extends Component {
  state = {
    recipes: [{}], //necessary to avoid null
    ingredients: [{}],
    completedRecipes: [{}], // once a recipe hits 6, move out from recipes to completed recipes & render
    userId: ''
  }

  completedRecipe = recipe => {
    //take recipe out of recipes once it hits 6
    //patches completed from false to true => 
    //also generates new RECIPE
    ApiServices.getRecipeById(recipe) // id
      .then(rec => { //rec is [{}]
        if (rec.length > 3) {
          this.filterRecipes(rec)
        } else {
        this.props.history.push('/contribution-success') 
        console.log('not finished')
        }
      })
      .catch(err => console.log(err));
   
  }

  setUserId = id =>  {
    userId = id
    console.log(userId)
    this.setState({userId: userId})
  }

  filterRecipes(recArr) {
    const completedRec = recArr[0]
    const ingredients = recArr.map(ing => {
      return ing.ingredient
    })

    const newRecipeName = `${GeneratorService.generateAdjective(ingredients)} ${GeneratorService.generateNoun()}`
    //generate new recipe name
    //patch to API

    ApiServices.updateRecipeName({
      recipe_name: newRecipeName,
      completed: true
    }, completedRec.recipe_id)
      .catch(e => console.log(e))
    const newRecipes = this.state.recipes.filter(rec => (
      rec.id !== completedRec.recipe_id
    ))
    this.setState({
      recipes: newRecipes,
      completedRecipes: [...this.state.completedRecipes, completedRec]
    })
    this.props.history.push('/contribution-success')
    ToastsStore.success("Recipe Completed! View in your recipes.")
    this.generateNewRecipe()
    //filter a new recipe list out of the state using rec id
    //set new state
    //call generate new recipe

  }

  generateNewRecipe() {
    //api call to generate to new recipe
    console.log('new recipe generated!')
    ApiServices.generateNewRecipe({ recipe_name: '...pending recipe!' })
      .then(resJson => this.setState({
        recipes: [...this.state.recipes, resJson]
      }))
      .catch(err => console.log(err))
  }

  setRecipes(newRecipes) {
    this.setState({
      recipes: newRecipes
    })
  }

  setIngredients(newIngredients) {
    this.setState({
      ingredients: newIngredients
    })
  }

  componentDidMount() {
    ApiServices.getAllRecipes()
      .then(recipes => this.setRecipes(recipes))
      .catch(err => console.log(err))

    ApiServices.getAllIngredients()
      .then(ingre => this.setIngredients(ingre))
      .catch(err => console.log(err))
  }


  render() {
    const contextValue = {
      recipes: this.state.recipes,
      completedRecipes: this.state.completedRecipes,
      ingredients: this.state.ingredients,
      completedRecipe: this.completedRecipe,
      userId: this.state.userId
    }
    return (
      <RecipeContext.Provider value={contextValue} >
        <Route path='/' component={Nav} />
        <main>
          <Switch>
          <Route path='/' component={Landing} exact />
          <Route path='/signup' component={Signup} />
          <Route path='/signup-success' component={SignupSuccess} />
          <Route path='/contribution-success' component={ContributionSuccess} />
          <Route path='/login' render={(props) => <Login {...props} setUserId={this.setUserId}/>} />
          <Route path='/contribute' component={Contribute} />
          <Route path='/recipe-list' component={RecipeList} />
          <Route path='/home' component={Home} />
          <Route path='/recipe/:id' render={(props) => <Recipe {...props} />} />
          <Route path='/contributions/:id' render={(props) => <ContributionsByUser {...props} />} />
          </Switch>
        <ToastsContainer store={ToastsStore}/>
        </main>
      </RecipeContext.Provider>
    );
  }
}

export default withRouter(App);


