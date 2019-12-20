import React, { Component } from 'react';
import RecipeContext from '../RecipeContext';

class Login extends Component {
    state = {  }

    static contextType = RecipeContext
    
    render() {
        return (
            <form>
            <legend><h1>Log In</h1></legend>
            <section>
            <fieldset>
              <label htmlFor='user-name'>User Name:</label>
              <input type='text' placeholder="username" />
              <label htmlFor='password'>Password:</label>
              <input type='password' placeholder="password" />
              <button type='submit'>submit</button>
            </fieldset>
            </section>
          </form>
        );
    }
}

export default Login;