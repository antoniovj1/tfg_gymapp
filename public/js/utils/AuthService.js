import Auth0Lock from 'auth0-lock'
import { browserHistory } from 'react-router'

import { loginUser, logoutUser } from "../actions/loginActions"

import store from "../store";

export default class AuthService {
    constructor(clientId, domain) {        
        this.lock = new Auth0Lock(clientId, domain, {
            auth: {
                redirectUrl: _API_HOST + '/login',
                responseType: 'token'

            }
        })
        this.lock.on('authenticated', this._doAuthentication.bind(this))
        this.login = this.login.bind(this)
    }

    _doAuthentication(authResult) {
        this.setToken(authResult.idToken)
        this.setProfile(authResult.idToken)

        browserHistory.replace('/')
    }

    login() {
        this.lock.show()
    }

    static loggedIn() {
        return !!this.getToken()
    }

    setToken(idToken) {
        localStorage.setItem('id_token', idToken)
    }

    setProfile(idToken) {
        this.lock.getProfile(idToken, function (err, profile) {
            if (err) {
                console.log("Error loading the Profile", err);
                return;
            }
            localStorage.setItem('profile', JSON.stringify(profile))

        });
    }

    static getToken() {
        return localStorage.getItem('id_token')
    }

    static getProfile() {
        return localStorage.getItem('profile')
    }

    static logout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
    }
}