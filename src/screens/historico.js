import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRecords } from '../context/records';
import colors from '../theme/colors';

export default function Historico({ navigation }) {
	const { records } = useRecords();
	const [nameFilter, setNameFilter] = useState('');
	const [classFilter, setClassFilter] = useState('');
	const filteredRecords = records.filter((record) => (
		record.nome.toLowerCase().includes(nameFilter.toLowerCase())
		&& record.turma.toLowerCase().includes(classFilter.toLowerCase())
	));

	return (
		<View style={styles.screen}>
			<StatusBar style="dark" />
			<ScrollView contentContainerStyle={styles.content}>
				<View style={styles.header}>
					<Text style={styles.title}>HISTÓRICO</Text>
				</View>

				<View style={styles.filters}>
					<TextInput onChangeText={setNameFilter} placeholder="Nome" placeholderTextColor="#777777" style={styles.filterInput} value={nameFilter} />
					<TextInput onChangeText={setClassFilter} placeholder="Turma" placeholderTextColor="#777777" style={styles.filterInput} value={classFilter} />
				</View>

				<Text style={styles.subtitle}>{filteredRecords.length} registro{filteredRecords.length === 1 ? '' : 's'}</Text>

				{filteredRecords.length ? filteredRecords.map((record, index) => (
					<View key={record.id} style={styles.record}>
						<View style={styles.number}>
							<Text style={styles.numberText}>{index + 1}</Text>
						</View>
						<View style={styles.recordCopy}>
							<Text style={styles.student}>{record.nome}</Text>
							<Text style={styles.detail}>Turma: {record.turma}</Text>
							{record.horario ? <Text style={styles.detail}>Horário: {record.horario}</Text> : null}
							{record.atividade ? <Text style={styles.detail}>Atividade: {record.atividade}</Text> : null}
							{record.data ? <Text style={styles.detail}>Data: {record.data}</Text> : null}
						</View>
					</View>
				)) : (
					<View style={styles.empty}>
						<Ionicons color="#ed1c24" name="document-text-outline" size={42} />
						<Text style={styles.emptyTitle}>Nenhum registro ainda</Text>
						<Text style={styles.emptyText}>Os alunos cadastrados aparecerão aqui.</Text>
					</View>
				)}
			</ScrollView>
			<Pressable accessibilityLabel="Voltar" onPress={() => navigation.goBack()} style={styles.bottomBar}>
				<Ionicons color="#ed1c24" name="arrow-back" size={26} />
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: { backgroundColor: colors.white, flex: 1 },
	content: { flexGrow: 1, padding: 22, paddingBottom: 36 },
	header: { alignItems: 'center', marginBottom: 2 },
	filters: { gap: 8, marginTop: 12 },
	filterInput: { backgroundColor: '#f4f4f4', borderColor: '#c9c9c9', borderRadius: 8, borderWidth: 1, color: '#222222', height: 46, paddingHorizontal: 12 },
	bottomBar: { alignItems: 'flex-start', borderTopColor: '#e5e5e5', borderTopWidth: 1, paddingHorizontal: 22, paddingVertical: 12 },
	title: { color: '#111111', fontSize: 24, fontWeight: '800' },
	subtitle: { color: '#777777', fontSize: 14, fontWeight: '700', marginBottom: 18, marginTop: 8, textAlign: 'center' },
	record: {
		alignItems: 'center', backgroundColor: '#f4f4f4', borderColor: '#dddddd',
		borderRadius: 12, borderWidth: 1, flexDirection: 'row', marginBottom: 10, padding: 14,
	},
	number: { alignItems: 'center', backgroundColor: '#ed1c24', borderRadius: 18, height: 36, justifyContent: 'center', width: 36 },
	numberText: { color: colors.white, fontSize: 16, fontWeight: '800' },
	recordCopy: { flex: 1, marginLeft: 12 },
	student: { color: '#111111', fontSize: 16, fontWeight: '800' },
	detail: { color: '#666666', fontSize: 13, marginTop: 3 },
	empty: { alignItems: 'center', marginTop: 100 },
	emptyTitle: { color: '#222222', fontSize: 18, fontWeight: '800', marginTop: 12 },
	emptyText: { color: '#777777', fontSize: 14, marginTop: 5, textAlign: 'center' },
});
