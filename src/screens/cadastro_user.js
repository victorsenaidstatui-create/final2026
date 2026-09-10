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
import AppLogo from '../components/applogo';
import colors from '../theme/colors';
import { useRecords } from '../context/records';

const classes = ['9º ano A', '9º ano B', '1º ano A', '1º ano B', '2º ano A', '2º ano B', '3º ano A', '3º ano B'];

function SelectField({ value, onChange }) {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <Pressable onPress={() => setVisible(true)} style={styles.select}>
                <Text style={[styles.selectText, !value && styles.placeholder]}>
                    {value || 'Selecione a turma'}
                </Text>
                <Ionicons color="#555555" name="chevron-down" size={18} />
            </Pressable>
            <Modal animationType="fade" transparent visible={visible} onRequestClose={() => setVisible(false)}>
                <Pressable onPress={() => setVisible(false)} style={styles.modalBackdrop}>
                    <View style={styles.options}>
                        <Text style={styles.modalTitle}>TURMA</Text>
                        {classes.map((option) => (
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
        </>
    );
}

export default function Cadastro_User({ navigation }) {
    const [form, setForm] = useState({ nome: '', turma: '', rfid: '' });
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);
    const { addStudent } = useRecords();

    const updateField = (key, value) => {
        setForm((current) => ({ ...current, [key]: value }));
        setError('');
    };

    const submit = async () => {
        if (!form.nome.trim() || !form.turma.trim() || !form.rfid.trim()) {
            setError('Preencha nome, turma e ID do cartão RFID.');
            return;
        }

        setSaving(true);
        setError('');
        try {
            await addStudent({ nome: form.nome, turma: form.turma, id_rfid: form.rfid });
            navigation.navigate('RegistrarEntrada', {
                aluno: { nome: form.nome, turma: form.turma },
            });
        } catch (submitError) {
            setError(submitError.message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.screen}
        >
            <StatusBar style="dark" />
            <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
                <AppLogo />
                <View style={styles.form}>
                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>NOME</Text>
                        <TextInput
                            onChangeText={(value) => updateField('nome', value)}
                            placeholder="Digite o nome do aluno"
                            placeholderTextColor="#777777"
                            style={styles.input}
                            value={form.nome}
                        />
                    </View>
                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>TURMA</Text>
                        <SelectField value={form.turma} onChange={(value) => updateField('turma', value)} />
                    </View>
                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>ID DO CARTÃO RFID</Text>
                        <TextInput
                            onChangeText={(value) => updateField('rfid', value)}
                            placeholder="Digite o ID do cartão"
                            placeholderTextColor="#777777"
                            style={styles.input}
                            value={form.rfid}
                        />
                    </View>

                    <Pressable disabled={saving} onPress={submit} style={[styles.button, saving && styles.disabledButton]}>
                        <Text style={styles.buttonText}>{saving ? 'ENVIANDO...' : 'CADASTRAR'}</Text>
                    </Pressable>
                    {error ? <Text style={styles.error}>{error}</Text> : null}
                </View>
            </ScrollView>
            <Pressable accessibilityLabel="Voltar para o início" onPress={() => navigation.navigate('Home')} style={styles.bottomBar}>
                <Ionicons color="#ed1c24" name="arrow-back" size={26} />
            </Pressable>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    screen: { backgroundColor: colors.white, flex: 1 },
    content: { flexGrow: 1, paddingBottom: 36, paddingHorizontal: 26, paddingTop: 14 },
    bottomBar: { alignItems: 'flex-start', borderTopColor: '#e5e5e5', borderTopWidth: 1, paddingHorizontal: 26, paddingVertical: 12 },
    form: { flexGrow: 1, justifyContent: 'space-between', marginTop: 12 },
    fieldGroup: { marginBottom: 10 },
    label: { color: '#111111', fontSize: 20, fontWeight: '700', lineHeight: 24 },
    input: {
        backgroundColor: '#e7e7e7', borderColor: '#626262', borderRadius: 18,
        borderWidth: 2, color: '#222222', fontSize: 16, height: 50,
        marginBottom: 2, paddingHorizontal: 8, paddingVertical: 0,
    },
    select: {
        alignItems: 'center', backgroundColor: '#e7e7e7', borderColor: '#626262', borderRadius: 18,
        borderWidth: 2, flexDirection: 'row', height: 50, justifyContent: 'space-between', paddingHorizontal: 14,
    },
    selectText: { color: '#222222', flex: 1, fontSize: 16 },
    placeholder: { color: '#777777' },
    modalBackdrop: { backgroundColor: 'rgba(0, 0, 0, 0.35)', flex: 1, justifyContent: 'flex-end' },
    options: { backgroundColor: colors.white, borderTopLeftRadius: 18, borderTopRightRadius: 18, padding: 22 },
    modalTitle: { color: '#111111', fontSize: 18, fontWeight: '800', marginBottom: 8 },
    option: { borderBottomColor: '#e5e5e5', borderBottomWidth: 1, paddingVertical: 15 },
    optionText: { color: '#222222', fontSize: 16 },
    observation: { borderRadius: 24, height: 104, paddingHorizontal: 12, paddingTop: 10 },
    button: {
        alignItems: 'center', alignSelf: 'center', backgroundColor: '#e8787b',
        borderColor: '#5e5e5e', borderRadius: 22, borderWidth: 2, height: 50,
        justifyContent: 'center', marginTop: 10, width: '82%',
    },
    buttonText: { color: colors.white, fontSize: 19, fontWeight: '800' },
    disabledButton: { opacity: 0.6 },
    error: { color: '#c62828', fontSize: 13, marginTop: 8, textAlign: 'center' },
});