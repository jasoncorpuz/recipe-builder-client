import React, { Component } from 'react'


class SignupSuccess extends Component {
    state = {
        
    }

    redirect(){
        setTimeout(() => {
            this.props.history.push('/login')
        }, 1700)
        
    }

    componentDidMount() {
     this.redirect();
    }
    render() {
        return (
            <section>
                <div>Signup Successful! Directing you to login...</div>
            </section>
        );
    }
}

export default SignupSuccess;