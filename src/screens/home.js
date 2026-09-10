import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import AppLogo from '../components/applogo';
import colors from '../theme/colors';
import { useRecords } from '../context/records';

export default function Home({ navigation }) {
    const { records } = useRecords();
    const activityCount = new Set(records.map((record) => record.atividade).filter(Boolean)).size;
    const metrics = [
        { icon: 'today-outline', label: 'REGISTROS DE HOJE', value: records.length, color: '#e8787b' },
        { icon: 'people-outline', label: 'ALUNOS REGISTRADOS', value: records.length, color: '#4c9a8a' },
        { icon: 'clipboard-outline', label: 'ATIVIDADES', value: activityCount, color: '#e0a24c' },
    ];

    return (
        <View style={styles.screen}>
            <StatusBar style="dark" />
            <ScrollView contentContainerStyle={styles.content}>
                <AppLogo />
                <View style={styles.heading}>
                    <View>
                        <Text style={styles.title}>INÍCIO</Text>
                        <Text style={styles.date}>CONTROLE DE ENTRADAS</Text>
                    </View>
                    <Ionicons color="#ed1c24" name="bar-chart-outline" size={32} />
                </View>

                <View style={styles.metrics}>
                    {metrics.map((metric) => (
                        <View key={metric.label} style={styles.metric}>
                            <View style={[styles.metricIcon, { backgroundColor: metric.color }]}>
                                <Ionicons color={colors.white} name={metric.icon} size={24} />
                            </View>
                            <Text style={styles.metricValue}>{metric.value}</Text>
                            <Text style={styles.metricLabel}>{metric.label}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.alertSection}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>ALERTAS</Text>
                        <Ionicons color="#e8787b" name="warning-outline" size={24} />
                    </View>
                    <View style={styles.alert}>
                        <Ionicons
                            color={records.length ? '#258242' : '#d88725'}
                            name={records.length ? 'checkmark-circle-outline' : 'alert-circle-outline'}
                            size={26}
                        />
                        <View style={styles.alertCopy}>
                            <Text style={styles.alertTitle}>
                                {records.length ? 'Registros realizados' : 'Alunos sem registro'}
                            </Text>
                            <Text style={styles.alertText}>
                                {records.length
                                    ? `${records.length} registro${records.length === 1 ? '' : 's'} realizado${records.length === 1 ? '' : 's'}.`
                                    : 'Nenhum aluno registrado hoje.'}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.actions}>
                    <Pressable onPress={() => navigation.navigate('RegistrarEntrada')} style={styles.button}>
                        <Ionicons color={colors.white} name="add-circle-outline" size={23} />
                        <Text style={styles.buttonText}>REGISTRAR ENTRADA</Text>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('Cadastro_User')} style={styles.historyButton}>
                        <Ionicons color="#ed1c24" name="person-add-outline" size={21} />
                        <Text style={styles.historyButtonText}>CADASTRAR ALUNO</Text>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('Historico')} style={styles.historyButton}>
                        <Ionicons color="#ed1c24" name="time-outline" size={21} />
                        <Text style={styles.historyButtonText}>HISTÓRICO</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { backgroundColor: colors.white, flex: 1 },
    content: { flexGrow: 1, paddingBottom: 26, paddingHorizontal: 22, paddingTop: 14 },
    heading: {
        alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between',
        marginBottom: 18, marginTop: 24,
    },
    title: { color: '#111111', fontSize: 28, fontWeight: '800' },
    date: { color: '#777777', fontSize: 13, fontWeight: '700', marginTop: 2 },
    metrics: { flexDirection: 'row', gap: 8, justifyContent: 'space-between' },
    metric: {
        backgroundColor: '#f4f4f4', borderColor: '#dddddd', borderRadius: 12,
        borderWidth: 1, flex: 1, minHeight: 142, padding: 10,
    },
    metricIcon: {
        alignItems: 'center', borderRadius: 18, height: 36, justifyContent: 'center', width: 36,
    },
    metricValue: { color: '#111111', fontSize: 28, fontWeight: '800', marginTop: 10 },
    metricLabel: { color: '#555555', fontSize: 11, fontWeight: '700', lineHeight: 14, marginTop: 4 },
    alertSection: { marginTop: 24 },
    sectionHeader: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
    sectionTitle: { color: '#111111', fontSize: 19, fontWeight: '800' },
    alert: {
        alignItems: 'center', backgroundColor: '#fff5e6', borderColor: '#f0c98f',
        borderRadius: 12, borderWidth: 1, flexDirection: 'row', marginTop: 10, padding: 14,
    },
    alertCopy: { flex: 1, marginLeft: 10 },
    alertTitle: { color: '#5a3a12', fontSize: 15, fontWeight: '800' },
    alertText: { color: '#765c38', fontSize: 13, marginTop: 3 },
    actions: { alignItems: 'center', marginTop: 'auto', width: '100%' },
    button: {
        alignItems: 'center', alignSelf: 'center', backgroundColor: '#e8787b',
        borderColor: '#5e5e5e', borderRadius: 22, borderWidth: 2, flexDirection: 'row',
        gap: 8, justifyContent: 'center', minHeight: 52, width: '88%',
    },
    buttonText: { color: colors.white, fontSize: 17, fontWeight: '800' },
    historyButton: {
        alignItems: 'center', borderColor: '#ed1c24', borderRadius: 20, borderWidth: 2,
        flexDirection: 'row', gap: 7, justifyContent: 'center', marginTop: 12, minHeight: 44, width: '88%',
    },
    historyButtonText: { color: '#ed1c24', fontSize: 15, fontWeight: '800' },
});