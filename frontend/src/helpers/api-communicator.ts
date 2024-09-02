import axios from "axios";

export const loginUser = async (email: string, password: string) => {
    const res = await axios.post('auth/login', { email, password });

    if (res.status !== 200) {
        throw new Error("Unable to login");
    }
    return res.data;
};

export const checkAuthStatus = async () => {
    const res = await axios.get('auth/auth-status');

    if (res.status !== 200) {
        throw new Error("Unable to login");
    }
    return res.data;
};