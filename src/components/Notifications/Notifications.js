// cdm fetches recipes, filter complete 
// get contributions by users as props?
// if contribution == complete, send number of rec completed
// onclick, reset state
import React, { Component } from 'react';
import ApiServices from '../../services/api-service'
import RecipeContext from '../RecipeContext'

class Notifications extends Component {
    state = {
        contributions: '',
        notifications:0,
        pastNotifications:0,
    }

    static contextType = RecipeContext

    filterComplete() {
        const completedRecipesByUser = this.state.contributions.filter(x => x.completed === true)
        const notifications = completedRecipesByUser.length
        // const pastNotifications = this.state.pastNotifications 
        this.setState({
            // pastNotifications: notifications, 
            notifications: notifications 
        })
    }

    componentDidMount() {
        const { userId } = this.context
        ApiServices.getContributionsByUser(userId)
            .then(res => this.setState({
                contributions: res
            }))
            .then(res => this.filterComplete())
    }
    render() {
        return (
            <div>You have {this.state.notifications} new recipes!</div>
        );
    }
}

export default Notifications;