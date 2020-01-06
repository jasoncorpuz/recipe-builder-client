import React, { Component } from 'react';
import ApiService from '../../services/api-service'
import { NavLink, Link } from 'react-router-dom';

class ContributionsByUser extends Component {
    state = {
        contributions: [{}]
    }

    componentDidMount() {
        ApiService.getContributionsByUser(Number(this.props.match.params.id))
            .then(cont => {
                this.setState({
                    contributions: cont
                })
            })
    }
    render() {
        
        const { contributions } = this.state
        const contList = contributions.length !== 1 ? 
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
                    </div>
                )
             }  
        }) 
         : <div>
             <h2>You haven't contributed anything yet!</h2>
                 <div className='link'><Link to='/contribute'>Get started here.</Link></div>
            </div>

        return (
            <section className='contributions-by-user'>
                <h1>{contributions[0].contributor}</h1>
                {contList}
            </section>

        );
    }
}

export default ContributionsByUser;