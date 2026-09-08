import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Cadastro_User from '../screens/cadastro_user';
import Home from '../screens/home';
import Historico from '../screens/historico';
import Splash from '../screens/splash';

export default function Router() {

    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Cadastro_User" component={Cadastro_User} />
            <Stack.Screen name="Historico" component={Historico} />

        </Stack.Navigator>

    );
}