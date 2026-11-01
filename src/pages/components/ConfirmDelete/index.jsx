import './style.css'

export default function ConfirmDestructiveAction({ message, actionTitle, confirmAction, cancelAction }) {
    return (
        <div className="confirm-delete">
            <p style={{ whiteSpace: 'pre-line' }}>
                {message}
            </p>

            <div className="actions">
                <button className="cancel-button" onClick={cancelAction}>Cancelar</button>
                <button className="delete-button" onClick={confirmAction}>{actionTitle}</button>
            </div>
        </div>
    )
}