import { NavigationContainer } from '@react-navigation/native';
import Router from './src/routers/routes';
import { RecordsProvider } from './src/context/records';

export default function App() {
  return (
    <RecordsProvider>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </RecordsProvider>
  );
}
