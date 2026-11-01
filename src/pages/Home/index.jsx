import { useEffect } from 'react'
import './style.css'
import linkViewModel from './linkViewModel'

import Header from '../components/Header'
import CardLink from '../components/CardLink'
import FormLink from '../components/FormLink'
import Footer from '../components/Footer'
import Modal from '../components/Modal'
import ConfirmDelete from '../components/ConfirmDelete'

export default function Home() {
    const viewModel = linkViewModel()

    useEffect(() => {
        viewModel.fetchLinks()
    }, [])

    return (
        <div className="container">
            <Header />

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
                                    () => viewModel.openDeleteModal(link.id)
                                }/>
                            )
                        })
                    }
                </section>

                <Modal 
                    title="Deletar Link?" 
                    isOpen={viewModel.isOpenDeleteModal}
                    closeAction={viewModel.closeDeleteModal}
                >
                    <ConfirmDelete 
                        cancelAction={viewModel.closeDeleteModal}
                        confirmAction={viewModel.deleteLink}
                    />
                </Modal>
            </main>

            <Footer />
        </div>
    )
}