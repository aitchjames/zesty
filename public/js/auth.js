import axios from "axios";
import { showAlert } from "./alerts";

export const login = async (email, password) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/users/login',
            data: {
                email,
                password
            }
        });

        if (res.data.status === 'success') {
            showAlert('success', 'Logged in successfully');
            window.setTimeout(() => {
                location.assign('/');
            }, 1500);
        }
    } catch (err) {
        showAlert('error', err.response.data.message);
    }
};

export const signup = async (name, username, email, password) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/users/signup',
            data: {
                name,
                username,
                email,
                password
            }
        });

        if (res.data.status === 'success') {
            showAlert('success', 'Successfully created your account');
            window.setTimeout(() => {
                location.assign('/');
            }, 1500);
        }
    } catch (err) {
        showAlert('error', err.response.data.message);
        console.log(err.response.data);
    }
};

export const logout = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: '/api/v1/users/logout'
        });

        if ((res.data.status = 'success')) {
            location.assign('/');
        }
    } catch (err) {
        showAlert('error', 'Error logging out, please try again');
    }
};

export const forgotPassword = async email => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/users/forgotPassword'
        });
    } catch (err) {
        showAlert('error', 'Error sending request, please try again');
    }
};
