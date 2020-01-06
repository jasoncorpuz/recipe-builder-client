import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import RecipeContext from '../RecipeContext';
import TokenService from '../../services/token-service'
import LoggedOut from '../Logged-Out/LoggedOut'
import './Home.css'

class Home extends Component {
    state = {
        user_name: '',
        id: '',
        touched: false
    }

    static contextType = RecipeContext

    setToken = token => {
        if (token) {
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
    }

    renderHomescreen() {
        const { user_name, id } = this.state

        return (
            <section className='homescreen'>
                <h1>Welcome {user_name}!</h1>
                <div>
                    <NavLink to={`/contributions/${id}`}>
                        My contributions
                </NavLink>
                </div>
                <div>
                    <NavLink to={`/recipe-list/${id}`}>
                        My completed recipes
                </NavLink>
                </div>
                <div>
                    <Link to='/contribute'>
                        Contribute
                    </Link>
                </div>
            </section >
        )
    }

    pushToLogin() {
        // this.props.history.push('/login')
        return <LoggedOut {...this.props} />
    }
    render() {
        // const Notes = !this.state.touched ? this.renderNotifications(): console.log('how NOT')



        return (
            <div className='homescreen'>
                {TokenService.hasAuthToken()
                    ? this.renderHomescreen()
                    : this.pushToLogin()
                }
            </div >
        );
    }
}

export default Home;