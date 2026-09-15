import { Platform } from 'react-native';

const normalizeUrl = (value) => (value || '').trim().replace(/\/+$/, '');

const getBaseApiUrl = () => {
    const configured = normalizeUrl(process.env.EXPO_PUBLIC_API_URL);
    if (configured) return configured;

    return Platform.OS === 'android'
        ? 'http://10.0.2.2:8000/api'
        : 'http://127.0.0.1:8000/api';
};

export const API_URL = getBaseApiUrl();

async function request(path, options = {}) {
    const baseUrl = getBaseApiUrl();
    const url = `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;

    const response = await fetch(url, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        ...options,
    });

    const rawText = await response.text();
    const payload = rawText ? JSON.parse(rawText) : {};

    if (!response.ok) {
        throw new Error(payload.message || payload.error || `API respondeu com erro ${response.status}.`);
    }

    return payload;
}

export const api = {
    listarHistorico: (filters = {}) => {
        const params = new URLSearchParams();
        if (filters.nome) params.set('nome', filters.nome);
        if (filters.turma) params.set('turma', filters.turma);
        const query = params.toString();
        return request(`/historico${query ? `?${query}` : ''}`);
    },
    cadastrarAluno: (aluno) => request('/alunos', {
        method: 'POST',
        body: JSON.stringify(aluno),
    }),
    registrarEntrada: (entrada) => request('/entradas', {
        method: 'POST',
        body: JSON.stringify(entrada),
    }),
};
