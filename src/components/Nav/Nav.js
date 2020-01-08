import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import './Nav.css'
export default class Header extends Component {
  handleLogoutClick = () => {
    TokenService.clearAuthToken()
  }

  renderLogoutLink() {
    return (
      <span className='logout-link'>
        <Link
          onClick={this.handleLogoutClick}
          to='/'>
          logout
        </Link>
      </span>
    )
  }

  renderLoginLink() {
    return (
      <span className='login-link'>
        <Link
          to='/signup'>
          Signup
        </Link>
        {' '}
        <Link
          to='/login'>
          log in
        </Link>
      </span>
    )
  }

  render() {
    return (
      <nav className='Header'>
        
          <Link to='/home'>
            recipe roulette
            {'  '}
          </Link>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
        
      </nav>
    )
  }
}
