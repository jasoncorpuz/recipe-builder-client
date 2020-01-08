import React, { Component } from 'react';
import ApiServices from '../../services/api-service'
import './Signup.css'
import AuthApiService from '../../services/auth-api-services'
import TokenService from '../../services/token-service'


class Signup extends Component {
    state = {
        username: '',
        password: '',
        confirmPassword: '',
        success: false
    }

    handleSubmit() {
        const newUser = {
            user_name: this.state.username,
            password: this.state.password
        }
        ApiServices.createUser(newUser)
            .then(res => {
                this.loginNewUser()
            })
    }

    onLoginSuccess() {
        const { history } = this.props
        history.push('/home')
    }

    loginNewUser() {
        AuthApiService.postLogin({
            user_name: this.state.username,
            password: this.state.password
        })
            .then(res => {
                TokenService.saveAuthToken(res.authToken)
                this.props.setUserId(res.id)
                this.onLoginSuccess()
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }

    passwordChange(pw) {
        this.setState({
            password: pw,
            error: null
        })
    }

    passwordConfirmChange(pw) {
        this.setState({
            confirmPassword: pw
        })
    }

    usernameChange(un) {
        this.setState({
            username: un
        })
    }

    verifyPw() {
        this.state.password === this.state.confirmPassword ?
            // this.verifySpecials()
            this.handleSubmit()
            : this.setState({
                error: `Passwords don't match.`
            })
        //render passwords must match
    }

    verifySpecials(e) {
        e.preventDefault();
        // eslint-disable-next-line
        const regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#\$%\^&])[\S]+/
        if (!regex.test(this.state.password)) {
            this.setState({
                error: 'Password should contain an uppercase letter, lowercase letter, number, and special character and must be 8 characters long.'
            })
        } else {
            this.verifyPw()
        }
    }

    render() {
        const { error } = this.state
        return (
            <form onSubmit={e => this.verifySpecials(e)}>
                <section>
                    <fieldset>
                        <legend><h1>Sign Up</h1></legend>
                        <label htmlFor='user-name'>User Name:</label>
                        <input
                            type='text'
                            placeholder="username"
                            onChange={e => this.usernameChange(e.target.value)}
                            required
                        />
                        <label htmlFor='password'>Password:</label>
                        <input
                            type='password'
                            placeholder="password"
                            onChange={e => this.passwordChange(e.target.value)}
                            required
                        />
                        <label
                            htmlFor='confirm-password'>
                            Confirm Password:
                            </label>
                        <input
                            type='password'
                            placeholder="password"
                            onChange={e => this.passwordConfirmChange(e.target.value)}
                            required
                            className='confirm-password'
                        />
                        <span>password must contain 8 characters (at least one of each: uppercase, lowercase, number and special character)</span>
                        <button type='submit'>submit</button>
                        <div role='alert'>
                            {error && <p>{error}</p>}
                        </div>
                    </fieldset>
                </section>
            </form>
        );
    }
}

export default Signup;