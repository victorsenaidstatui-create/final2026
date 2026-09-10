import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

const RecordsContext = createContext(null);

export function RecordsProvider({ children }) {
    const [records, setRecords] = useState([]);
    const [apiError, setApiError] = useState('');

    useEffect(() => {
        api.listarHistorico()
            .then(setRecords)
            .catch((error) => setApiError(error.message));
    }, []);

    const addRecord = async (record) => {
        const saved = await api.registrarEntrada(record);
        const normalized = saved.aluno
            ? { ...record, ...saved.aluno, id: saved.id, data: saved.data }
            : saved;
        setRecords((current) => [normalized, ...current]);
        return normalized;
    };

    const addStudent = async (student) => {
        const saved = await api.cadastrarAluno(student);
        setApiError('');
        return saved;
    };

    return (
        <RecordsContext.Provider value={{ addRecord, addStudent, apiError, records }}>
            {children}
        </RecordsContext.Provider>
    );
}

export function useRecords() {
    const context = useContext(RecordsContext);

    if (!context) {
        throw new Error('useRecords must be used inside RecordsProvider');
    }

    return context;
}
