import requestProvider from '../providers/requestProvider';
import APIRoutes from '../enums/apiRoutes';

export default function authService() {
    async function login(data) {
        const response = await requestProvider.post(APIRoutes.LOGIN, {
            email: data.email,
            password: data.password
        });

        return response.data;
    }

    return {
        login
    };
}