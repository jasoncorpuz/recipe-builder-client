import React, { Component } from 'react';
import TokenService from '../../services/token-service'

class LogoutButton extends Component {
    state = {  }

    logout(){
        TokenService.clearAuthToken()
    }

    render() {
        return (
            <button className='logout' onClick={() => this.logout()}>Logout</button>
        );
    }
}

export default LogoutButton;