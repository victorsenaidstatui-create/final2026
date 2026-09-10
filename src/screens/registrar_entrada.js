import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRecords } from '../context/records';
import colors from '../theme/colors';

const classes = ['9º ano A', '9º ano B', '1º ano A', '1º ano B', '2º ano A', '2º ano B', '3º ano A', '3º ano B'];
const times = ['12:00', '12:10', '12:20', '12:30', '12:40', '12:50', '13:00'];
const reasons = ['Personaliza', 'Academia', 'Prepara ENEM', 'Outros'];

function SelectField({ label, value, placeholder, options, onChange }) {
    const [visible, setVisible] = useState(false);

    return (
        <View style={styles.fieldGroup}>
            <Text style={styles.label}>{label}</Text>
            <Pressable onPress={() => setVisible(true)} style={styles.select}>
                <Text style={[styles.selectText, !value && styles.placeholder]}>{value || placeholder}</Text>
                <Ionicons color="#555555" name="chevron-down" size={18} />
            </Pressable>
            <Modal animationType="fade" transparent visible={visible} onRequestClose={() => setVisible(false)}>
                <Pressable onPress={() => setVisible(false)} style={styles.modalBackdrop}>
                    <View style={styles.options}>
                        <Text style={styles.modalTitle}>{label}</Text>
                        {options.map((option) => (
                            <Pressable
                                key={option}
                                onPress={() => { onChange(option); setVisible(false); }}
                                style={styles.option}
                            >
                                <Text style={styles.optionText}>{option}</Text>
                            </Pressable>
                        ))}
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
}

export default function RegistrarEntrada({ navigation, route }) {
    const { addRecord } = useRecords();
    const [form, setForm] = useState({
        nome: route.params?.aluno?.nome || '',
        turma: route.params?.aluno?.turma || '',
        horario: '',
        atividade: '',
        observacao: '',
    });
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);

    const update = (key, value) => {
        setForm((current) => ({ ...current, [key]: value }));
        setError('');
    };

    const submit = async () => {
        if (!form.nome.trim() || !form.turma || !form.horario || !form.atividade) {
            setError('Preencha nome, turma, horário e motivo.');
            return;
        }

        setSaving(true);
        setError('');
        try {
            await addRecord(form);
            navigation.navigate('Historico');
        } catch (submitError) {
            setError(submitError.message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.screen}>
            <StatusBar style="dark" />
            <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
                <View style={styles.header}>
                    <View style={styles.iconButton} />
                    <Text style={styles.title}>REGISTRAR ENTRADA</Text>
                    <View style={styles.iconButton} />
                </View>

                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>NOME</Text>
                    <TextInput
                        onChangeText={(value) => update('nome', value)}
                        placeholder="Digite o nome do aluno"
                        placeholderTextColor="#777777"
                        style={styles.input}
                        value={form.nome}
                    />
                </View>
                <View style={styles.row}>
                    <View style={styles.half}><SelectField label="TURMA" placeholder="Selecione" options={classes} value={form.turma} onChange={(value) => update('turma', value)} /></View>
                    <View style={styles.half}><SelectField label="HORÁRIO" placeholder="Selecione" options={times} value={form.horario} onChange={(value) => update('horario', value)} /></View>
                </View>
                <SelectField label="MOTIVO" placeholder="Selecione o motivo" options={reasons} value={form.atividade} onChange={(value) => update('atividade', value)} />
                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>OBSERVAÇÃO</Text>
                    <TextInput
                        multiline
                        onChangeText={(value) => update('observacao', value)}
                        placeholder="Descreva a justificativa quando escolher Outros"
                        placeholderTextColor="#777777"
                        style={[styles.input, styles.observation]}
                        textAlignVertical="top"
                        value={form.observacao}
                    />
                </View>
                {error ? <Text style={styles.error}>{error}</Text> : null}
                <Pressable disabled={saving} onPress={submit} style={[styles.button, saving && styles.disabledButton]}>
                    <Text style={styles.buttonText}>{saving ? 'ENVIANDO...' : 'REGISTRAR'}</Text>
                </Pressable>
            </ScrollView>
            <Pressable accessibilityLabel="Voltar" onPress={() => navigation.goBack()} style={styles.bottomBar}>
                <Ionicons color="#ed1c24" name="arrow-back" size={26} />
            </Pressable>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    screen: { backgroundColor: colors.white, flex: 1 },
    content: { padding: 22, paddingBottom: 36 },
    header: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 28 },
    iconButton: { alignItems: 'center', height: 32, justifyContent: 'center', width: 32 },
    title: { color: '#111111', fontSize: 22, fontWeight: '800' },
    fieldGroup: { marginBottom: 16 },
    row: { flexDirection: 'row', gap: 12 },
    half: { flex: 1 },
    label: { color: '#222222', fontSize: 14, fontWeight: '800', marginBottom: 7 },
    input: { backgroundColor: '#f4f4f4', borderColor: '#c9c9c9', borderRadius: 8, borderWidth: 1, color: '#222222', fontSize: 16, height: 50, paddingHorizontal: 14 },
    observation: { height: 96, paddingTop: 12 },
    select: { alignItems: 'center', backgroundColor: '#f4f4f4', borderColor: '#c9c9c9', borderRadius: 8, borderWidth: 1, flexDirection: 'row', height: 50, justifyContent: 'space-between', paddingHorizontal: 14 },
    selectText: { color: '#222222', flex: 1, fontSize: 15 },
    placeholder: { color: '#777777' },
    modalBackdrop: { backgroundColor: 'rgba(0, 0, 0, 0.35)', flex: 1, justifyContent: 'flex-end' },
    options: { backgroundColor: colors.white, borderTopLeftRadius: 18, borderTopRightRadius: 18, padding: 22 },
    modalTitle: { color: '#111111', fontSize: 18, fontWeight: '800', marginBottom: 8 },
    option: { borderBottomColor: '#e5e5e5', borderBottomWidth: 1, paddingVertical: 15 },
    optionText: { color: '#222222', fontSize: 16 },
    error: { color: '#c62828', fontSize: 13, marginBottom: 12, textAlign: 'center' },
    button: { alignItems: 'center', backgroundColor: '#ed1c24', borderRadius: 8, height: 52, justifyContent: 'center', marginTop: 8 },
    buttonText: { color: colors.white, fontSize: 16, fontWeight: '800' },
    disabledButton: { opacity: 0.6 },
    bottomBar: { alignItems: 'flex-start', borderTopColor: '#e5e5e5', borderTopWidth: 1, paddingHorizontal: 22, paddingVertical: 12 },
});