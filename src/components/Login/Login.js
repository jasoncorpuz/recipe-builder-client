import React, { Component } from 'react';
import AuthApiService from '../../services/auth-api-services'
import TokenService from '../../services/token-service'

class Login extends Component {
  state = {}

  onLoginSuccess() {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/'
    history.push('/home')
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ error: null })

    const { user_name, password } = e.target

    AuthApiService.postLogin({
      user_name: user_name.value,
      password: password.value
    })
     .then(res => {
       user_name.value=''
       password.value=''
       TokenService.saveAuthToken(res.authToken)
       this.props.setUserId(res.id)
       this.onLoginSuccess()
     })
  }

  render() {
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <legend><h1>Log In</h1></legend>
        <section>
          <fieldset>
            <label htmlFor='user-name'>User Name:</label>
            <input type='text' placeholder="username" name='user_name' />
            <label htmlFor='password'>Password:</label>
            <input type='password' placeholder="password" name='password'/>
            <button type='submit'>submit</button>
          </fieldset>
        </section>
      </form>
    );
  }
}

export default Login;