import React, { Component } from 'react';
import ApiService from '../../services/api-service'
import { NavLink, Link } from 'react-router-dom';
import './Contribution-by-user.css'

class ContributionsByUser extends Component {
    state = {
        contributions: [{}],
        loaded:false
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
        
        const { contributions,loaded } = this.state
        const contList =  loaded ? 
        contributions.map(cont => {
            console.log(cont)
            if(cont.recipe.completed) {
                return (
                    <div key={cont.id} id={cont.id} className='contribution'>
                        {cont.ingredient} was contributed to {''}
                        <NavLink to={`/recipe/${cont.recipe_id}`}>{cont.recipe}</NavLink>
                        <div className='name'>contribution name:</div>
                    </div>
                )
             }  else {
                return (
                    <div key={cont.id} id={cont.id} className='contribution'>
                        {cont.ingredient} was contributed to {''}
                        <Link to='#'>{cont.recipe}</Link>
                        <div className='name'>contribution name: {cont.contribution_name}</div>
                    </div>
                )
             }  
        }) 
         : <section className='alert'>
             <h2>You haven't contributed anything yet!</h2>
                 <div className='link'><Link to='/contribute'>Get started here.</Link></div>
            </section>

        return (
            <section className='contributions-by-user'>
                <h1>{contributions[0].contributor}</h1>
                {contList}
            </section>

        );
    }
}

export default ContributionsByUser;