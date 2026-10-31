import navigationProvider from '../../../providers/navigationProvider';
import '../auth.css'
import Footer from '../../components/Footer'

export default function Register() {
    const navigation = navigationProvider();

    function handleGoToLogin() {
        navigation.navigateToLogin();
    }

    function handleSubmit(event) {
        event.preventDefault()
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
                            <h3 htmlFor="register-username">Email</h3>
                            <input
                                id="register-username"
                                name="username"
                                type="text"
                                autoComplete="username"
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

                        <button type="submit">Cadastrar</button>
                    </form>

                    <p className="auth-switch">
                        Já tem uma conta? <button onClick={handleGoToLogin}>Entrar</button>
                    </p>
                </section>
            </main>

            <Footer />
        </div>
    )
}
