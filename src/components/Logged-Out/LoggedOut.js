import React, { Component } from 'react';

class LoggedOut extends Component {
    state = {}

    redirect() {
        setTimeout(() => {
            this.props.history.push('/login')
        }, 1000)
    }

    componentDidMount() {
        this.redirect();
    }
    render() {
        return (
            <section>
                <div>Logged out! Redirecting you to login..</div>
            </section>
        );
    }
}

export default LoggedOut;