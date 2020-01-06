import React, { Component } from 'react';
import ApiServices from '../../services/api-service'
import './Signup.css'


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
        this.props.history.push('/signup-success')
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
                <div role='alert'>
                    {error && <p>{error}</p>}
                </div>
                <legend><h1>Sign Up</h1></legend>
                <section>
                    <fieldset>
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
                        />
                        <button type='submit'>submit</button>
                    </fieldset>
                </section>
            </form>
        );
    }
}

export default Signup;