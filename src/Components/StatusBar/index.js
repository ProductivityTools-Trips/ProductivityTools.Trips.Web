import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import service from '../../services/apiService'
import { auth, logout } from '../../session/firebase'
import { subscribe } from '../../session/activity'

/**
 * Very thin black strip at the very top: API debug info (date, server, app)
 * on the left, latest API activity (what used to be toast popups) on the
 * right. Below it a light row with the signed-in user and logout.
 */
function StatusBar() {
    const [user] = useAuthState(auth)
    const [info, setInfo] = useState(null)
    const [error, setError] = useState(false)
    const [activity, setActivity] = useState(null)

    useEffect(() => {
        service.getDebugInfo().then(setInfo).catch(() => setError(true))
    }, [])

    useEffect(() => subscribe(setActivity), [])

    return (
        <>
            <div className="statusbar">
                <div className="statusbar__left">
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
                {activity && (
                    <div className={`statusbar__activity is-${activity.level}`} title={activity.text}>
                        {activity.level === 'pending' && <span className="statusbar__dot" />}
                        {activity.text}
                    </div>
                )}
            </div>

            <div className="userbar">
                {user?.email && <span className="userbar__email">{user.email}</span>}
                <button type="button" className="btn btn--ghost btn--sm" onClick={logout}>Log out</button>
            </div>
        </>
    )
}

export default StatusBar
