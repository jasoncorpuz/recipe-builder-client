import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'

export default class Header extends Component {
  handleLogoutClick = () => {
    TokenService.clearAuthToken()
  }

  renderLogoutLink() {
    return (
      <span className='Header__logged-in'>
        <Link
          onClick={this.handleLogoutClick}
          to='/'>
          Logout
        </Link>
      </span>
    )
  }

  renderLoginLink() {
    return (
      <span className='Header__not-logged-in'>
        <Link
          to='/register'>
          Register
        </Link>
      
        <Link
          to='/login'>
          Log in
        </Link>
      </span>
    )
  }

  render() {
    return (
      <nav className='Header'>
        <>
          <Link to='/'>
            <FontAwesomeIcon className='green' icon='frog' />
            {' '}
            Blogful Client
          </Link>
        </>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </nav>
    )
  }
}
