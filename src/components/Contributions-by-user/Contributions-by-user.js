import React, { Component } from 'react';
import ApiService from '../../services/api-service'
import TokenService from '../../services/token-service'
import { NavLink, Link } from 'react-router-dom';
import './Contribution-by-user.css'

class ContributionsByUser extends Component {
    state = {
        contributions: [{}],
        loaded: false
    }

    setToken = token => {
        if (token) {
            const jwt = TokenService.parseJsonToken(token)
            const { user_id, sub } = jwt

            this.setState({
                id: user_id,
                user_name: sub
            })
        }
    }

    onDelete(e) {
        let contributionId = e.target.value
        ApiService.deleteContribution(contributionId);
        this.filterContributions(contributionId)
    }

    filterContributions(id) {
        const { contributions } = this.state
        const filtered = contributions.filter(cont => cont !== id)
        this.setState({
            contributions: filtered,
            loaded: true
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
            .then(() => this.setToken(TokenService.getAuthToken()))
    }
    render() {
        const { contributions, loaded, user_name } = this.state
        const contList = loaded ?
            contributions.map(cont => {
                if (cont.completed === true) {
                    return (
                        <div key={cont.id} id={cont.id} className='contribution'>
                            {cont.ingredient} was contributed to {''}
                            <NavLink to={`/recipe/${cont.recipe_id}`}>{cont.recipe}</NavLink>
                            <div className='name'>contribution name: <span className='contribution-name'>{cont.contribution_name}</span></div>
                        </div>
                    )
                } else if (cont.completed === false && user_name !== cont.contributor) {
                    return (
                        <div key={cont.id} id={cont.id} className='contribution'>
                            {cont.ingredient} was contributed to {''}
                            <Link to='#'>{cont.recipe}</Link>
                            <div className='name'>
                                contribution name:
                            <span className='contribution-name'>
                                    {cont.contribution_name}
                                </span>
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <div key={cont.id} id={cont.id} className='contribution' >
                            {cont.ingredient} was contributed to {''}
                            <Link to='#'>{cont.recipe}</Link>
                            <div className='name'>
                                contribution name:
                            <span className='contribution-name'>
                                    {cont.contribution_name}
                                </span>
                                <button
                                    value={cont.id}
                                    onClick={e => this.onDelete(e)}
                                    className='delete-button'>
                                    delete
                            </button>
                            </div>
                        </div>
                    )
                }
            })
            : <>
                <h2>You haven't contributed anything yet!</h2>
                <div className='link'><Link to='/contribute'>Get started here.</Link></div>
            </>

        return (
            <section className='contributions-by-user'>
                <h1>{contributions[0].contributor}</h1>
                {contList}
            </section>

        );
    }
}

export default ContributionsByUser;