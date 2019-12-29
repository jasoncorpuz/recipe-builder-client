import React, { Component } from 'react'

class LoginSuccess extends Component {
    state = {}
    componentDidMount() {
        this.setTimeOut(() => {

        }, 2000)
    }
    render() {
        return (
            <section>
                <div>Signup Successful! Directing you to login...</div>
            </section>
        );
    }
}

export default LoginSuccess;