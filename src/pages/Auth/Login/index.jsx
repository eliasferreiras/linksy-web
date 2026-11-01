import { useState } from 'react'
import { Link } from "react-router-dom";
import { useSession } from "../../../contexts/SessionContext";
import Routes from "../../../enums/routes";
import authService from '../../../services/authService';
import '../auth.css';

import Footer from '../../components/Footer';

export default function Login() {
    const service = authService();
    const session = useSession();

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [feedback, setFeedback] = useState(null)

    async function handleSubmit(event) {
        event.preventDefault()

        setFeedback(null)
        setIsSubmitting(true)

        const formData = new FormData(event.currentTarget)
        const data = {
            email: formData.get('email'),
            password: formData.get('password')
        }

        try {
            const userData = await service.login(data);
            session.login(userData);
        } catch (error) {
            const status = error.response?.status;

            if (status === 400) {
                setFeedback({
                    type: 'error',
                    message: 'E-mail ou senha inválidos.'
                });
            } else {
                setFeedback({
                    type: 'error',
                    message: 'Não foi possível fazer login. Tente novamente.'
                });
            }
        } finally {
            setIsSubmitting(false)
        }
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

                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Entrando...' : 'Logar'}
                        </button>

                    </form>

                    {feedback && (
                        <p className={`auth-feedback ${feedback.type}`}>
                            {feedback.message}
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
