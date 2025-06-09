import api from './api';

export interface LoginPayload {
    employeeId: string;
    email: string;
    password: string;
}

export const login = async (data: LoginPayload) => {
    const res = await api.post('/auth/login', data)
    return res.data;
};

export const getProtectedData = async () => {
    const res = await api.get('/protected');
    return res.data;
};
