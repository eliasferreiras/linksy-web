import axios from "axios"
import APIRoutes from "../enums/apiRoutes";

// Unauthorized handler
let onUnauthorized = () => {}

export function setUnauthorizedHandler(handler) {
    onUnauthorized = handler
}

// Axios instance
const requestProvider = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080"
})

// Request Interceptor
requestProvider.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

// Response Interceptor
requestProvider.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            const isLoginRequest = error.config.url.includes(APIRoutes.LOGIN)

            if (!isLoginRequest) {
                onUnauthorized()
            }
        }

        return Promise.reject(error)
    }
)

export default requestProvider