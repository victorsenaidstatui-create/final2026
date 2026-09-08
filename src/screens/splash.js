import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AppLogo from '../components/applogo';
import colors from '../theme/colors';

export default function Splash({ navigation }) {
    useEffect(() => {
        const timer = setTimeout(() => navigation.replace('Home'), 1200);
        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.screen}>
            <StatusBar style="dark" />
            <AppLogo style={styles.logo} />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        alignItems: 'center',
        backgroundColor: colors.white,
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 26,
    },
    logo: {
        width: '86%',
    },
});