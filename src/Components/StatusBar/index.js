import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import service from '../../services/apiService'
import { auth, logout } from '../../session/firebase'

/**
 * Very thin black strip at the very top with API debug info (date, server,
 * app), followed by a light row with the signed-in user and logout.
 */
function StatusBar() {
    const [user] = useAuthState(auth)
    const [info, setInfo] = useState(null)
    const [error, setError] = useState(false)

    useEffect(() => {
        service.getDebugInfo().then(setInfo).catch(() => setError(true))
    }, [])

    return (
        <>
            <div className="statusbar">
                {info && (
                    <>
                        <span>Date: {info.date}</span>
                        <span>ServerName: {info.serverName}</span>
                        <span>AppName: {info.appName}</span>
                    </>
                )}
                {!info && !error && <span>Connecting to API…</span>}
                {error && <span className="statusbar__error">API unavailable</span>}
            </div>

            <div className="userbar">
                {user?.email && <span className="userbar__email">{user.email}</span>}
                <button type="button" className="btn btn--ghost btn--sm" onClick={logout}>Log out</button>
            </div>
        </>
    )
}

export default StatusBar
