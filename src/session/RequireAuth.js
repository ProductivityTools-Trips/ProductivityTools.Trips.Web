import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase'
import StatusBar from '../Components/StatusBar'

/**
 * Renders child routes only for a signed-in user. While Firebase restores the
 * persisted session (page reload) nothing is rendered, so the user is never
 * bounced to /Login just because the check hasn't finished yet.
 * Also hosts the global status bar shown on every authenticated page.
 */
export default function RequireAuth() {
    const [user, loading] = useAuthState(auth)
    const location = useLocation()

    if (loading) return null
    if (!user) return <Navigate to="/Login" replace state={{ from: location }} />
    return (
        <>
            <StatusBar />
            <Outlet />
        </>
    )
}
