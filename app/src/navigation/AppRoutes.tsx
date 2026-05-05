import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

import Login from '../screens/Login';
import Dashboard from '../screens/Dashboard';
import Register from '../screens/Register';
import Trade from '../screens/Trade';
import Transactions from '../screens/Transactions';



const Stack = createNativeStackNavigator();

export default function AppRoutes() {
  const { token, loading } = useContext(AuthContext);

  if (loading) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {token ? (
        <>
          <Stack.Screen name="Dashboard" component={Dashboard} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
        </>
      )}
       <Stack.Screen name="Register" component={Register} />
       <Stack.Screen name="Trade" component={Trade} />
       <Stack.Screen name="Transactions" component={Transactions} />
    </Stack.Navigator>
  );
}