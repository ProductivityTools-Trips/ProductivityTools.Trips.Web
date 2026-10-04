import { useAuthState } from 'react-firebase-hooks/auth'
import TripList from '../TripList'
import { auth, logout } from '../../session/firebase'
import Debug from '../Debug'

function Home() {
    const [user] = useAuthState(auth)

    return (
        <div>
            <div className="topbar">
                <span className="topbar__user">{user?.email}</span>
                <button type="button" className="btn btn--ghost btn--sm" onClick={logout}>Log out</button>
            </div>
            <Debug />
            <TripList />
        </div>
    )
}

export default Home;