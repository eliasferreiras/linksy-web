import './style.css'
import { useRef } from 'react'

export default function FormLink({ createAction }) {
    const titleInput = useRef()
    const targetUrlInput = useRef()

    function createLink() {
        const newLink = {
            title: titleInput.current.value,
            targetURL: targetUrlInput.current.value
        }

        clearForm()
        createAction(newLink)
    }

    function clearForm() {
        titleInput.current.value = ''
        targetUrlInput.current.value = ''
    }

    return (
        <form action="#" className="form-link">
            <div className="input-content inputUrl">
                <h3>URL de destino</h3>
                <input type="url" name="target_url" ref={targetUrlInput} placeholder="https://exemplo.com/link-longo" />
            </div>

            <div className="input-content inputTitle">
                <h3>Título (opcional)</h3>
                <input type="text" name="title" ref={titleInput} />
            </div>
            
            <button type="button" onClick={createLink}>
                <span>Salvar</span> <i className="fa-solid fa-download"></i>
            </button>
        </form>
    )
}