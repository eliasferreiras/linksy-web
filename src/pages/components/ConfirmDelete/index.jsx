import './style.css'

export default function ConfirmDelete({ confirmAction, cancelAction }) {
    return (
        <div className="confirm-delete">
            <p>Deletar esse link vai fazê-lo parar de funcionar.</p>
            <p>A ação não poderá ser desfeita.</p>

            <div className="actions">
                <button className="cancel-button" onClick={cancelAction}>Cancelar</button>
                <button className="delete-button" onClick={confirmAction}>Deletar</button>
            </div>
        </div>
    )
}