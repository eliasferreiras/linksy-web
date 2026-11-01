import './style.css'
import { useSession } from '../../../contexts/SessionContext'

export default function Header({logoutAction}) {
    const session = useSession()

    return (
        <header>
            <div className='header-container'>
                <img src="/logo-inline-onbrand.svg" alt="Linksy" />
                <div className="profile">
                    <h2>{session.user?.name || "User Name"}</h2>
                    <i className="fa-regular fa-user"></i>
                    <button onClick={logoutAction} title="Sair">
                        <i class="fa-solid fa-arrow-right-from-bracket icon"></i>
                    </button>
                </div>
            </div>
        </header>
    )
}