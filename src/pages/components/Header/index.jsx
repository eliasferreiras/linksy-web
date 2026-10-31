import './style.css'

export default function Header() {
    return (
        <header>
            <div className='header-container'>
                <h1>Linksy</h1>
                <div className="profile">
                    <h2>User Name</h2>
                    <i className="fa-regular fa-user"></i>
                </div>
            </div>
        </header>
    )
}