import './style.css'
import { useSession } from '../../../contexts/SessionContext'
import { useEffect, useRef, useState } from "react";

export default function Header({logoutAction}) {
    const session = useSession()

    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => { document.removeEventListener("mousedown", handleClickOutside); };
    }, []);

    function toggleMenu() {
        setIsOpen(prev => !prev);
    }

    function handleLogout() {
        logoutAction();
        setIsOpen(false);
    }

    return (
        <header>
            <div className='header-container'>
                <img src="/logo-inline-onbrand.svg" alt="Linksy" />
                <div className="profile" ref={menuRef}>
                    <h2>{session.user?.name || "User Name"}</h2>

                    <button onClick={toggleMenu}>
                        <i className="fa-regular fa-user"></i>
                    </button>

                    {isOpen && (
                        <div className="dropdown-menu">
                            <button onClick={handleLogout}>
                                Sair <i className="fa-solid fa-arrow-right-from-bracket icon"></i>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}