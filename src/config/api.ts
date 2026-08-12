
import { authService } from "@/services/authService";

//type RepositoryResult<T> = { data?: T; error?: string };
export const API_BASE_URL = 'https://0d53-2804-7f3-ff03-2494-a4b8-d024-acdb-bb84.ngrok-free.app';

async function request<T>(method: string, path: string, body?: any, tokenRequired: boolean = false) {
    try {
        const headersArray: Record<string, string> = {
            'Content-Type': 'application/json'
        }

        if (tokenRequired) {
            const accessToken = authService.getAccessToken();
            if (!accessToken) throw new Error('Não autenticado');
            headersArray['Authorization'] = `Bearer ${accessToken}`;
        }

        const options: RequestInit = {
            method,
            headers: headersArray,
        }; 

        if (body) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(`${API_BASE_URL}/${path}`, options);
        if (!response.ok) throw new Error(`Erro na requisição: ${response.status}`);

        const data = await response.json();
        return { data };
    } catch (err: unknown) {
        return { error: err instanceof Error ? err.message : String(err) };
    }
}

export const ApiClient = {
    async get(path: string, body?: any, tokenRequired: boolean = false) {
        return request('GET', path, body, tokenRequired);
    },

    async post(path: string, body?: any, tokenRequired: boolean = false) {
        return request('POST', path, body, tokenRequired);
    },
}