import requestProvider from '../providers/requestProvider';
import APIRoutes from '../enums/apiRoutes';

export default function authService() {
    async function login(data) {
        const response = await requestProvider.post(
            APIRoutes.LOGIN,
            data
        );

        return response.data;
    }

    return {
        login
    };
}