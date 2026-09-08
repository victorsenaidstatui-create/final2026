import { createContext, useContext, useState } from 'react';

const RecordsContext = createContext(null);

export function RecordsProvider({ children }) {
    const [records, setRecords] = useState([]);

    const addRecord = (record) => {
        setRecords((current) => [
            ...current,
            { ...record, id: `${Date.now()}-${current.length}` },
        ]);
    };

    return (
        <RecordsContext.Provider value={{ addRecord, records }}>
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
