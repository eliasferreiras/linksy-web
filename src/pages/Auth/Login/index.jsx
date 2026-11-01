import { Link } from "react-router-dom";
import Routes from "../../../enums/routes";
import loginViewModel from './loginViewModel';
import '../auth.css';

import Footer from '../../components/Footer';

export default function Login() {
    const viewModel = loginViewModel();

    async function handleSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const data = {
            email: formData.get('email'),
            password: formData.get('password')
        }

        await viewModel.login(data);
    }

    return (
        <div className="auth-container">
            <main className="auth-main">
                <section className="auth-shadow-container" aria-labelledby="login-title">
                    <img src="/logo.svg" alt="Linksy" />

                    <h1 id="login-title">Entrar</h1>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="auth-field">
                            <h3 htmlFor="username">Username</h3>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                            />
                        </div>

                        <div className="auth-field">
                            <h3 htmlFor="password">Password</h3>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                            />
                        </div>

                        <button type="submit" disabled={viewModel.isSubmitting}>
                            {viewModel.isSubmitting ? 'Entrando...' : 'Logar'}
                        </button>

                    </form>

                    {viewModel.feedback && (
                        <p className={`auth-feedback ${viewModel.feedback.type}`}>
                            {viewModel.feedback.message}
                        </p>
                    )}

                    <p className="auth-switch">
                        Ainda não tem uma conta? <Link to={Routes.REGISTER} className="link">Cadastre-se</Link>
                    </p>
                </section>
            </main>

            <Footer />
        </div>
    )
}
