import axios, { isAxiosError } from 'axios';
import { localStorageKeys } from '../config/local-storage-keys';

export const httpClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

let onUnauthorized: (() => void) | null = null;

export function setUnauthorizedHandler(handler: () => void) {
    onUnauthorized = handler;
    return () => {
        onUnauthorized = null;
    };
}

httpClient.interceptors.request.use(async config => {
    const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

httpClient.interceptors.response.use(
    response => response,
    error => {
        const isSessionExpired =
            isAxiosError(error) && error.response?.status === 401 && Boolean(error.config?.headers?.Authorization);

        if (isSessionExpired) onUnauthorized?.();

        return Promise.reject(error);
    },
);
