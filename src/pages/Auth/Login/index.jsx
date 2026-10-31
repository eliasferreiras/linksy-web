import { useState } from 'react'
import { Link } from "react-router-dom";
import { useSession } from "../../../contexts/SessionContext";
import '../auth.css'

import Footer from '../../components/Footer'
import service from '../../../providers/requestProvider'

export default function Login() {
    const { login } = useSession();

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [feedback, setFeedback] = useState(null)

    async function handleSubmit(event) {
        event.preventDefault()
        setFeedback(null)
        setIsSubmitting(true)

        const formData = new FormData(event.currentTarget)

        try {
            await service.post('/auth/login', {
                email: formData.get('email'),
                password: formData.get('password')
            })
            setFeedback({ type: 'success', message: 'Login realizado com sucesso.' })
        } catch (error) {
            console.error('Error logging in:', error)
            const apiMessage = error.response?.data?.message
            setFeedback({
                type: 'error',
                message: typeof apiMessage === 'string'
                    ? apiMessage
                    : 'Não foi possível fazer login. Verifique seus dados e tente novamente.'
            })
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
                        <p
                            className={`auth-feedback ${feedback.type}`}
                            role={feedback.type === 'error' ? 'alert' : 'status'}
                        >
                            {feedback.message}
                        </p>
                    )}

                    <p className="auth-switch">
                        Ainda não tem uma conta? <Link to="/register" className="link">Cadastre-se</Link>
                    </p>
                </section>
            </main>

            <Footer />
        </div>
    )
}
