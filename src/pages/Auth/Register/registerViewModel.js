import { useState } from 'react';
import authService from '../../../services/authService';

export default function registerViewModel() {
    const service = authService();

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [feedback, setFeedback] = useState(null)
    const [isOpenRegisterModal, setIsRegisterModal] = useState(false)

    function openRegisterModal() {
        setIsRegisterModal(true)
    }

    function closeRegisterModal() {
        setIsRegisterModal(false)
    }

    async function register(data) {
        setFeedback(null)
        setIsSubmitting(true)

        try {
            if (dataIsValid(data)) {
                await service.register({
                    name: data.name,
                    email: data.email,
                    password: data.password
                });

                openRegisterModal();
            }
        } catch (error) {
            setFeedback({
                type: 'error',
                message: 'Não foi possível criar a conta. Tente novamente.'
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    function dataIsValid(data) {
        if (!data.name || !data.email || !data.password || !data.confirmPassword) {
            setFeedback({
                type: 'error',
                message: 'Todos os campos são obrigatórios.'
            });

            return false;
        } else if (data.password !== data.confirmPassword) {
            setFeedback({
                type: 'error',
                message: 'As senhas não coincidem.'
            });

            return false;
        }

        return true;
    }

    return { 
        register,
        isSubmitting, 
        feedback, 
        isOpenRegisterModal, 
        openRegisterModal,
        closeRegisterModal 
    };
}