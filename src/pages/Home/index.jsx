import './style.css'
import { useState, useEffect } from 'react'
import homeService from '../../services/homeService'

import Header from '../components/Header'
import CardLink from '../components/CardLink'
import FormLink from '../components/FormLink'
import Footer from '../components/Footer'
import Modal from '../components/Modal'
import ConfirmDelete from '../components/ConfirmDelete'

export default function Home() {
    const service = homeService()

    let [selectedItem, setSelectedItem] = useState(null)

    var [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        service.fetchLinks()
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
        await service.deleteLink(selectedItem.id)
        closeModalAction()
    }

    return (
        <div className="container">
            <Header />

            <main>
                <h1 className="mainContent">Criar link curto</h1>
                <section className="create shadow-container mainContent">
                    <h2>Detalhes do Link</h2>
                    <FormLink createAction={service.createLink}/>
                </section>

                <h1 className="mainContent">Links</h1>
                <section className="links mainContent">
                    { 
                        service.links.map(link => {
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