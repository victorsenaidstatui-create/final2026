import { useState } from 'react';
import {
    KeyboardAvoidingView,
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

const fields = [
    { key: 'nome', label: 'NOME DO ALUNO', placeholder: 'DIGITE O NOME DO ALUNO' },
    { key: 'turma', label: 'TURMA', placeholder: 'DIGITE A TURMA' },
    { key: 'atividade', label: 'ATIVIDADE', placeholder: 'SELECIONE' },
    { key: 'horario', label: 'HORÁRIO', placeholder: '' },
];

export default function Cadastro_User({ navigation }) {
    const [form, setForm] = useState({ nome: '', turma: '', atividade: '', horario: '', observacao: '' });
    const [submitted, setSubmitted] = useState(false);
    const { addRecord } = useRecords();

    const updateField = (key, value) => {
        setForm((current) => ({ ...current, [key]: value }));
        setSubmitted(false);
    };

    const submit = () => {
        if (form.nome.trim() && form.turma.trim()) {
            addRecord(form);
            navigation.goBack();
            return;
        }

        setSubmitted(false);
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
                    {fields.map((field) => (
                        <View key={field.key} style={styles.fieldGroup}>
                            <Text style={styles.label}>{field.label}</Text>
                            <TextInput
                                onChangeText={(value) => updateField(field.key, value)}
                                placeholder={field.placeholder}
                                placeholderTextColor="#777777"
                                style={styles.input}
                                value={form[field.key]}
                            />
                        </View>
                    ))}

                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>OBSERVAÇÃO</Text>
                        <TextInput
                            multiline
                            onChangeText={(value) => updateField('observacao', value)}
                            placeholderTextColor="#777777"
                            style={[styles.input, styles.observation]}
                            textAlignVertical="top"
                            value={form.observacao}
                        />
                    </View>

                    <Pressable onPress={submit} style={styles.button}>
                        <Text style={styles.buttonText}>CADASTRAR</Text>
                    </Pressable>
                    {submitted ? <Text style={styles.success}>Cadastro realizado.</Text> : null}
                    <Pressable
                        accessibilityLabel="Voltar para o início"
                        onPress={() => navigation.navigate('Home')}
                        style={styles.backButton}
                    >
                        <Ionicons color="#ed1c24" name="arrow-back" size={24} />
                    </Pressable>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    screen: { backgroundColor: colors.white, flex: 1 },
    content: { flexGrow: 1, paddingBottom: 22, paddingHorizontal: 26, paddingTop: 14 },
    backButton: { alignSelf: 'flex-start', padding: 3 },
    form: { flexGrow: 1, justifyContent: 'space-between', marginTop: 12 },
    fieldGroup: { marginBottom: 10 },
    label: { color: '#111111', fontSize: 20, fontWeight: '700', lineHeight: 24 },
    input: {
        backgroundColor: '#e7e7e7', borderColor: '#626262', borderRadius: 18,
        borderWidth: 2, color: '#222222', fontSize: 16, height: 50,
        marginBottom: 2, paddingHorizontal: 8, paddingVertical: 0,
    },
    observation: { borderRadius: 24, height: 104, paddingHorizontal: 12, paddingTop: 10 },
    button: {
        alignItems: 'center', alignSelf: 'center', backgroundColor: '#e8787b',
        borderColor: '#5e5e5e', borderRadius: 22, borderWidth: 2, height: 50,
        justifyContent: 'center', marginTop: 10, width: '82%',
    },
    buttonText: { color: colors.white, fontSize: 19, fontWeight: '800' },
    success: { color: '#258242', fontSize: 13, marginTop: 6, textAlign: 'center' },
});