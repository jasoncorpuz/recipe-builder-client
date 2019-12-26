import config from '../config'
import TokenService from './token-service'

const ApiService = {
    getAllContributions() {
        return fetch(`${config.API_ENDPOINT}/contributions/`, {
            method: 'GET',
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },

    getUserbyId(id) {
        return fetch(`${config.API_ENDPOINT}/users/${id}`)
         .then(res =>  
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            )
    },

    getContributionsByUser(id) {
        return fetch(`${config.API_ENDPOINT}/contributions/${id}`)
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },

    postContibution(contribution) {
        return fetch(`${config.API_ENDPOINT}/contributions/`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json ',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify(contribution)
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },

    deleteContribution(id) {
        return fetch(`${config.API_ENDPOINT}/contributions/`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json ',
            }
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },

    getAllIngredients() {
        return fetch(`${config.API_ENDPOINT}/ingredients`)
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },

    getIngredientById(id) {
        return fetch(`${config.API_ENDPOINT}/ingredients/${id}`)
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },

    getAllRecipes() {
        return fetch(`${config.API_ENDPOINT}/recipes`)
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },

    getRecipeById(id) {
        return fetch(`${config.API_ENDPOINT}/recipes/${id}`)
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },

    generateNewRecipe(name){
        return fetch(`${config.API_ENDPOINT}/recipes`,{
         method: 'POST',
         headers: {
             'content-type': 'application/json'
         },
         body: JSON.stringify(name)
        })
         .then(res => {
             (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              :res.json()
         })
    },

    updateRecipeName(name, id) {
        return fetch(`${config.API_ENDPOINT}/recipes/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(name),
            headers: {
                'content-type': 'application/json'
            }
        })
         .catch(e => console.log(e))
    },

    createUser(userInfo) {
        return fetch(`${config.API_ENDPOINT}/users`, {
            method: 'POST',
            body: JSON.stringify(userInfo),
            headers: {
                'content-type': 'application/json'
            }
        })
         .then(res => {
             (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              :res.json()
         })
        .catch(e => console.log(e))
    },
}

export default ApiService;