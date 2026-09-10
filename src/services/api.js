import { Platform } from 'react-native';

const getDefaultApiUrl = () => {
    if (typeof window !== 'undefined') {
        return 'http://127.0.0.1:8000/api';
    }

    if (Platform.OS === 'ios') {
        return 'http://127.0.0.1:8000/api';
    }

    return 'http://10.0.2.2:8000/api';
};

export const API_URL = process.env.EXPO_PUBLIC_API_URL || getDefaultApiUrl();

const getApiUrls = () => {
    if (process.env.EXPO_PUBLIC_API_URL) {
        return [process.env.EXPO_PUBLIC_API_URL];
    }

    const localUrl = 'http://127.0.0.1:8000/api';
    const androidHostUrl = 'http://10.0.2.2:8000/api';

    return Platform.OS === 'android' ? [androidHostUrl, localUrl] : [localUrl, androidHostUrl];
};

async function request(path, options = {}) {
    let lastError;

    for (const baseUrl of getApiUrls()) {
        try {
            const response = await fetch(`${baseUrl}${path}`, {
                headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
                ...options,
            });
            const payload = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(payload.message || `API respondeu com erro ${response.status}.`);
            }

            return payload;
        } catch (error) {
            lastError = error;
        }
    }

    throw new Error(`${lastError?.message || 'Não foi possível acessar a API.'} Verifique se o Laravel está rodando na porta 8000.`);
}

export const api = {
    listarHistorico: (filters = {}) => {
        const params = new URLSearchParams();
        if (filters.nome) params.set('nome', filters.nome);
        if (filters.turma) params.set('turma', filters.turma);
        const query = params.toString();
        return request(`/historico${query ? `?${query}` : ''}`);
    },
    cadastrarAluno: (aluno) => request('/alunos', { method: 'POST', body: JSON.stringify(aluno) }),
    registrarEntrada: (entrada) => request('/entradas', { method: 'POST', body: JSON.stringify(entrada) }),
};
