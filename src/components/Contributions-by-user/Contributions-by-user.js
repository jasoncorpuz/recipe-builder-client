import React, { Component } from 'react';
import ApiService from '../../services/api-service'
import { NavLink, Link } from 'react-router-dom';

class ContributionsByUser extends Component {
    state = {
        contributions: [{}],
        loaded: false
    }


    onDelete(e){
        let contributionId = e.target.value
        ApiService.deleteContribution(contributionId);
        this.filterContributions(contributionId)
    }

    filterContributions(id) {
        const {contributions} = this.state
        const filtered = contributions.filter(cont => cont !== id)
        this.setState({
            contributions: filtered
        })
        this.props.history.push(`/deletion-success`)
    }

    componentDidMount() {
        ApiService.getContributionsByUser(Number(this.props.match.params.id))
            .then(cont => {
                this.setState({
                    contributions: cont, 
                    loaded: true
                })
            })
    }
    render() {
        const { contributions, loaded } = this.state
        const contList = loaded ? 
        contributions.map(cont => {    
            if(cont.recipe !== 'pending recipe...') {
                return (
                    <div key={cont.id} id={cont.id} className='contribution'>
                        {cont.ingredient} was contributed to {''}
                        <NavLink to={`/recipe/${cont.recipe_id}`}>{cont.recipe}</NavLink>
                    </div>
                )
             }  else {
                return (
                    <div key={cont.id} id={cont.id} className='contribution'>
                        {cont.ingredient} was contributed to {''}
                        <Link to='#'>{cont.recipe}</Link>
                        <button value={cont.id} onClick={(e) => this.onDelete(e)}>Delete</button>
                    </div>
                )
             }  
        }) 
         : <div>
             <h2>You haven't contributed anything yet!</h2>
                 <div className='link'><Link to='/contribute'>Get started here.</Link></div>
            </div>

        return (
            <div>
                <h1>{contributions[0].contributor}</h1>
                {contList}
            </div>
        );
    }
}

export default ContributionsByUser;