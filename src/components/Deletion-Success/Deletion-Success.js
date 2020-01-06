import React, { Component } from 'react';
import TokenService from '../../services/token-service';

class DeletionSuccess extends Component {
    state = {
        user_name: '',
        id: ''
    }

    redirect() {
        setTimeout(() => {
            this.props.history.push(`/contributions/${this.state.id}`)
        }, 1000)
    }

    setToken = token => {
        if(token) {
            this.setState({
            token
            })
            const jwt = TokenService.parseJsonToken(token)
            const { user_id, sub } = jwt

            this.setState({
            id: user_id,
            user_name: sub
            })
        }    
      }

    componentDidMount() {
        this.setToken(TokenService.getAuthToken())
        this.redirect();
    }
    render() {
        return (
            <section>
                <div>Deleted perfectly.</div>
            </section>
        );
    }
}

export default DeletionSuccess;