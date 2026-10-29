import '../styles/auth.css'
import Footer from '../../../components/Footer'

export default function Login() {
    function handleSubmit(event) {
        event.preventDefault()
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
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
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

                        <button type="submit">Logar</button>
                    </form>

                    <p className="auth-switch">
                        Ainda não tem uma conta? <a href="/cadastro">Cadastre-se</a>
                    </p>
                </section>
            </main>

            <Footer />
        </div>
    )
}
