import React, { Component } from 'react';
import ApiServices from '../../../services/api-service'
import './Signup.css'


class Signup extends Component {
    state = {
        username: '',
        password: '',
        confirmPassword: '',
        success:false
    }

    handleSubmit() {
        const newUser = {
            user_name: this.state.username,
            password: this.state.password
        }
        ApiServices.createUser(newUser)
        this.props.history.push('/signup-success')
        console.log(newUser)
    }

    passwordChange(pw) {
        this.setState({
            password: pw
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
         : console.log(`passwords don't match`)
        //render passwords must match
    }

    verifySpecials(e) {
        e.preventDefault();
        const regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#\$%\^&])[\S]+/
        if (!regex.test(this.state.password)) {
            console.log('password should contain an uppercase letter, lowercase letter, number, and special character')
        } else {
            this.verifyPw()
        }
    }

    render() {
        console.log(this.state)
        return (
            <form onSubmit={e => this.verifySpecials(e)}>
                <legend><h1>Sign Up</h1></legend>
                <section>
                    <fieldset>
                        <label htmlFor='user-name'>User Name:</label>
                        <input
                            type='text'
                            placeholder="username"
                            onChange={e => this.usernameChange(e.target.value)}
                        />
                        <label htmlFor='password'>Password:</label>
                        <input
                            type='password'
                            placeholder="password"
                            onChange={e => this.passwordChange(e.target.value)}
                        />
                        <label
                            htmlFor='confirm-password'>
                            Confirm Password:
                            </label>
                        <input
                            type='password'
                            placeholder="password"
                            onChange={e => this.passwordConfirmChange(e.target.value)}
                        />
                        <button type='submit'>submit</button>
                    </fieldset>
                </section>
            </form>
        );
    }
}

export default Signup;