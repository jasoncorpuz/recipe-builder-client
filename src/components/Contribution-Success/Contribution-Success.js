import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class ContributionSuccess extends Component {
    state = {  }
    render() {
        return (
            <div className='contribution-success'>
                Contributed to a random recipe! You will be notified when this recipe is complete.
                <div className='home-link'><Link to='/home'>Back to home.</Link></div>
            </div>
        );
    }
}

export default ContributionSuccess;