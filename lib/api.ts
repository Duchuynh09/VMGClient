import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/vmg', // URL server backend
    withCredentials: true // nếu bạn dùng cookie HttpOnly
});

// Thêm interceptor để tự động attach token (nếu dùng localStorage)
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
