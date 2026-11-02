import { Link } from "react-router-dom";
import '../auth.css'
import registerViewModel from './registerViewModel';
import { useNavigate } from "react-router-dom";

import Footer from '../../components/Footer'
import Routes from "../../../enums/routes";
import Modal from "../../components/Modal";
import ConfirmAction from "../../components/ConfirmAction";

export default function Register() {
    const viewModel = registerViewModel();
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)

        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword')
        }

        await viewModel.register(data);

        clearForm();
    }

    function clearForm() {
        const form = document.querySelector('.auth-form');
        form.reset();
    }

    function goToLogin() {
        navigate(Routes.LOGIN)
    }

    return (
        <div className="auth-container">
            <main className="auth-main">
                <section className="auth-shadow-container" aria-labelledby="register-title">
                    <img src="/logo.svg" alt="Linksy" />

                    <h1 id="register-title">Criar conta</h1>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="auth-field">
                            <h3 htmlFor="register-name">Nome</h3>
                            <input
                                id="register-name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                            />
                        </div>

                        <div className="auth-field">
                            <h3 htmlFor="register-email">Email</h3>
                            <input
                                id="register-email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                            />
                        </div>

                        <div className="auth-field">
                            <h3 htmlFor="register-password">Senha</h3>
                            <input
                                id="register-password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                            />
                        </div>

                        <div className="auth-field">
                            <h3 htmlFor="confirm-password">Confirmar senha</h3>
                            <input
                                id="confirm-password"
                                name="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                required
                            />
                        </div>

                        <button type="submit" disabled={viewModel.isSubmitting}>
                            {viewModel.isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
                        </button>
                    </form>

                    {viewModel.feedback && (
                        <p className={`auth-feedback ${viewModel.feedback.type}`}>
                            {viewModel.feedback.message}
                        </p>
                    )}

                    <p className="auth-switch">
                        Já tem uma conta? <Link to={Routes.LOGIN}  className="link">Entrar</Link>
                    </p>
                </section>

                <Modal 
                    title="Conta criada com sucesso!" 
                    isOpen={viewModel.isOpenRegisterModal}
                    closeAction={viewModel.closeRegisterModal}
                >
                    <ConfirmAction 
                        message={"Você já pode fazer login e começar a usar o Linksy."}
                        actionTitle="Logar-se"
                        confirmAction={goToLogin}
                    />
                </Modal>
            </main>

            <Footer />
        </div>
    )
}
