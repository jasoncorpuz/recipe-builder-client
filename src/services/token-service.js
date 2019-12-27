import config from '../config'

const TokenService = {
  saveAuthToken(token) {
    window.localStorage.setItem(config.TOKEN_KEY, token)
  },
  getAuthToken() {
    return window.localStorage.getItem(config.TOKEN_KEY)
  },
  clearAuthToken() {
    window.localStorage.removeItem(config.TOKEN_KEY)
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken()
  },
  makeBasicAuthToken(userName, password) {
    return window.btoa(`${userName}:${password}`)
  },
  parseJsonToken(token) {
    if (token) {
      try {
        return JSON.parse(atob(token.split('.')[1]));
      } catch (error) {
        //ignore
      }
    }
    return null;
  },
  setToken(token) {
    this.setState({
      token
    })
    const jwt = TokenService.parseJsonToken(token)
    const { user_id } = jwt
    this.setState({
      userId: user_id
    })
  }

}

export default TokenService
