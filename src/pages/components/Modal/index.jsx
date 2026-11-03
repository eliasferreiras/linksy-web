import './style.css'

export default function Modal({
     title,
     isOpen,
     closeAction,
     children 
}) {
    if (isOpen) {
        return (
            <div className="modal-container">
                <div className="modal-content shadow-container">
                    <div className="modal-header">
                        <h2>{title}</h2>
                        <button onClick={closeAction}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        )
    }
}