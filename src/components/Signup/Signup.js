import React, { Component } from 'react';
import './Signup.css'


class Signup extends Component {
    render() {
        console.log('hello')
        return (
            <form>
                <legend><h1>Sign Up</h1></legend>
                <section>
                    <fieldset>
                        <label htmlFor='user-name'>User Name:</label>
                        <input type='text' placeholder="username" />
                        <label htmlFor='password'>Password:</label>
                        <input type='password' placeholder="password" />
                        <label htmlFor='confirm-password'>Confirm Password:</label>
                        <input type='password' placeholder="password" />
                        <button type='submit'>submit</button>
                    </fieldset>
                </section>
            </form>
        );
    }
}

export default Signup;