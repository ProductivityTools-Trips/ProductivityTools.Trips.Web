import axios from 'axios'
import { config } from '../config'
import { auth, getIdToken } from './firebase'
import { report } from './activity'

/**
 * Attaches a fresh Firebase ID token to every request going to our API and
 * sends the user to /Login when the API answers 401.
 *
 * Import once (App.js). Works with the global axios instance that apiService uses.
 */
export function installAuthInterceptors() {
    axios.interceptors.request.use(async (req) => {
        if (req.url?.startsWith(config.PATH_BASE)) {
            const token = await getIdToken()
            if (token) {
                req.headers = req.headers ?? {}
                req.headers.Authorization = `Bearer ${token}`
            }
        }
        return req
    })

    axios.interceptors.response.use(
        (res) => res,
        (err) => {
            if (err?.config?.url?.startsWith(config.PATH_BASE)) {
                const status = err?.response?.status
                const path = err.config.url.replace(config.PATH_BASE, '')
                report({ level: 'error', text: [status, err.message, path].filter(Boolean).join(' · ') })
            }
            // Only bounce to /Login when there really is no session. A 401 while a
            // user is signed in is an API-side problem – surface it in the status
            // bar instead of reloading the page (which also loses the current URL).
            if (err?.response?.status === 401 && !auth.currentUser && window.location.pathname !== '/Login') {
                window.location.assign('/Login')
            }
            return Promise.reject(err)
        }
    )
}
