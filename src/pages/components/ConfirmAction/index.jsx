import './style.css'

export default function ConfirmAction({ message, actionTitle, confirmAction }) {
    return (
        <div className="confirm-action">
            <p style={{ whiteSpace: 'pre-line' }}>
                {message}
            </p>

            <div className="actions">
                <button className="main-button" onClick={confirmAction}>{actionTitle}</button>
            </div>
        </div>
    )
}