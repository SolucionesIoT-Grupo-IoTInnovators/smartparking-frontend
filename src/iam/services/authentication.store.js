import {defineStore} from "pinia"
import {AuthenticationService} from './authentication.service.js'
import {SignInResponse} from '../model/sign-in.response.js'

const authenticationService = new AuthenticationService()

export const useAuthenticationStore = defineStore({
    id: 'authentication',
    state: () => ({ signedIn: false, userId: 0, username: ''}),
    getters: {
        isSignedIn: (state) => state['signedIn'],
        currentUserId: (state) => state['userId'],
        currentUsername: (state) => state['username'],
        currentToken: () => localStorage.getItem('token'),
        currentParkingId: () => Number(localStorage.getItem('parkingId')),
    },
    actions: {
        checkSavedSession() {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');

            if (token && userId) {
                this.signedIn = true;
                this.userId = userId;
                return true;
            }
            return false;
        },
        async signIn(signInRequest, router, onSuccessCallback) {
            authenticationService.signIn(signInRequest)
                .then(response => {
                    let signInResponse = new SignInResponse(response.data.id, response.data.email, response.data.token)
                    this.signedIn = true
                    this.userId = signInResponse.id
                    this.username = signInResponse.username
                    localStorage.setItem('token', signInResponse.token)
                    localStorage.setItem('userId', signInResponse.id)
                    localStorage.setItem('username', signInResponse.username)
                    console.log(signInResponse)
                    if (onSuccessCallback) onSuccessCallback();
                    router.push({name: 'parking-directory', params: {ownerId: signInResponse.id} })
                })
                .catch(error => {
                    console.log(error)
                })
        },
        async signUpDriver(signUpRequest, router) {
            authenticationService.signUpDriver(signUpRequest)
                .then(response => {
                    router.push({name: 'sign-in'})
                })
                .catch(error => {
                    console.log(error)
                })
        },
        async signUpOwner(signUpRequest, router) {
            authenticationService.signUpOwner(signUpRequest)
                .then(response => {
                    router.push({name: 'sign-in'})
                })
                .catch(error => {
                    console.log(error)
                })
        },
        async signOut(router) {
            this.signedIn = false
            this.userId = 0
            this.username = ''
            localStorage.removeItem('token')
            localStorage.removeItem('userId')
            router.push({name: 'sign-in'})
        }
    }
})