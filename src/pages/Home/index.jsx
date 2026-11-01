import './style.css'
import { useState, useEffect } from 'react'
import linkViewModel from './linkViewModel'
import { useSession } from '../../contexts/SessionContext'

import Header from '../components/Header'
import CardLink from '../components/CardLink'
import FormLink from '../components/FormLink'
import Footer from '../components/Footer'
import Modal from '../components/Modal'
import ConfirmDelete from '../components/ConfirmDelete'

export default function Home() {
    const viewModel = linkViewModel()
    const session = useSession()

    let [selectedItem, setSelectedItem] = useState(null)
    var [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        viewModel.fetchLinks()
    }, [])

    function openModalAction(link) {
        setSelectedItem(link)
        setOpenModal(true)
    }

    function closeModalAction() {
        setSelectedItem(null)
        setOpenModal(false)
    }

    async function confirmDeleteAction() {
        await viewModel.deleteLink(selectedItem.id)
        closeModalAction()
    }

    return (
        <div className="container">
            <Header user={session.user} logoutAction={viewModel.logout} />

            <main>
                <h1 className="mainContent">Criar link curto</h1>
                <section className="create shadow-container mainContent">
                    <h2>Detalhes do Link</h2>
                    <FormLink createAction={viewModel.createLink}/>
                </section>

                <h1 className="mainContent">Links</h1>
                <section className="links mainContent">
                    { 
                        viewModel.links.map(link => {
                            return (
                                <CardLink key={link.id} link={link} deleteAction={
                                    () => openModalAction(link)
                                }/>
                            )
                        })
                    }
                </section>

                <Modal 
                    title="Deletar Link?" 
                    isOpen={openModal} 
                    closeAction={closeModalAction}
                >
                    <ConfirmDelete 
                        cancelAction={closeModalAction}
                        confirmAction={confirmDeleteAction}
                    />
                </Modal>
            </main>

            <Footer />
        </div>
    )
}