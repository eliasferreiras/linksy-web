import './style.css'

export default function Header({ user, logoutAction }) {
    return (
        <header>
            <div className='header-container'>
                <h1>Linksy</h1>
                <div className="profile">
                    <h2>{user?.name || "User Name"}</h2>
                    <i className="fa-regular fa-user"></i>
                    <button onClick={logoutAction} title="Sair">
                        <i class="fa-solid fa-arrow-right-from-bracket icon"></i>
                    </button>
                </div>
            </div>
        </header>
    )
}