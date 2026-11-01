import { useState } from 'react';
import authService from '../../../services/authService';
import { useSession } from '../../../contexts/SessionContext';

export default function loginViewModel() {
    const service = authService();
    const session = useSession();

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [feedback, setFeedback] = useState(null)

    async function login(data) {
        setFeedback(null)
        setIsSubmitting(true)

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

    return { login, isSubmitting, feedback };
}