import React, { Component } from 'react';
import ApiService from '../../services/api-service'

class ContributionsByUser extends Component {
    state = {
        contributions: [{}]
    }

    componentDidMount() {
        ApiService.getContributionsByUser(this.props.match.params.id)
            .then(cont => {
                this.setState({
                    contributions: cont
                })
            })
    }
    render() {
        const { contributions } = this.state
        const contList = contributions.length !== 1 ? contributions.map(cont => {
            return (
                <div key={cont.id} id={cont.id} className='contribution'>
                    {cont.ingredient} was contributed to {cont.recipe}.
                </div>
            )
        }) 
         :null

        return (
            <div>
                <h1>{contributions[0].contributor}</h1>
                {contList}
            </div>
        );
    }
}

export default ContributionsByUser;