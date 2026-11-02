import { httpClient } from '../http-client';

export interface SigninParams {
    email: string;
    password: string;
}

interface SigninResponse {
    accessToken: string;
}

export async function signIn(params: SigninParams) {
    const { data } = await httpClient.post<SigninResponse>('/auth/sign-in', params);

    return data;
}
