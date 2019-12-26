import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import RecipeContext from '../RecipeContext';
import ApiServices from '../../services/api-service'
import Notifications from '../Notifications/Notifications'
//view my completed recipes, view my contributions


class Home extends Component {
    state = {
        user_name: '',
        id: '',
        touched: false
    }

    static contextType = RecipeContext

    componentDidMount() {
        ApiServices.getUserbyId(this.context.userId)
            .then(res => {
                this.setState({
                    user_name: res[0].user_name,
                    id: res[0].id
                })
            })
    }

    renderNotifications() {
        const { id } = this.state
        return (
            <div>
            <NavLink to={`/recipe-list/${id}`} onClick={e => this.handleNotification(e)}>
                <Notifications />
            </NavLink>
            </div>
        )
    }
    handleNotification() {
        this.setState({
            touched: true
        })
        console.log(this.state)
    }
    render() {
        // const Notes = !this.state.touched ? this.renderNotifications(): console.log('how NOT')
        const { user_name, id } = this.state
        return (
            <div className='homescreen'>
                <h1>Welcome {user_name}!</h1>
            <div><NavLink to={`/contributions/${id}`}>See my contributions</NavLink></div>
            <div><NavLink to={`/recipe-list/${id}`}>
                See my recipes
                </NavLink></div>
            <div><Link to='/contribute'>contribute</Link></div>
            </div >
        );
    }
}

export default Home;