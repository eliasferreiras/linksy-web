import { useEffect } from 'react'
import './style.css'
import linkViewModel from './linkViewModel'

import Header from '../components/Header'
import CardLink from '../components/CardLink'
import FormLink from '../components/FormLink'
import Footer from '../components/Footer'
import Modal from '../components/Modal'
import ConfirmDestructiveAction from '../components/ConfirmDelete'

export default function Home() {
    const viewModel = linkViewModel()

    useEffect(() => {
        viewModel.fetchLinks()
    }, [])

    return (
        <div className="container">
            <Header logoutAction={viewModel.openLogoutModal} />

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
                    <ConfirmDestructiveAction 
                        message={"Você tem certeza que deseja deletar esse link?\nEssa ação não poderá ser desfeita."}
                        actionTitle="Deletar"
                        cancelAction={viewModel.closeDeleteModal}
                        confirmAction={viewModel.deleteLink}
                    />
                </Modal>

                <Modal 
                    title="Sair?" 
                    isOpen={viewModel.isOpenLogoutModal}
                    closeAction={viewModel.closeLogoutModal}
                >
                    <ConfirmDestructiveAction 
                        message={"Você tem certeza que deseja sair?\nTodos os dados não salvos serão perdidos."}
                        actionTitle="Sair"
                        cancelAction={viewModel.closeLogoutModal}
                        confirmAction={viewModel.logout}
                    />
                </Modal>
            </main>

            <Footer />
        </div>
    )
}