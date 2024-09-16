import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';

const stack = createNativeStackNavigator();

export default function navigation() {
  return (
    <NavigationContainer>
      <stack.Navigator screenOptions={{ headerShown: false }}>
        <stack.Screen name="Login" component={Login} />
        <stack.Screen name="CreateAccount" component={CreateAccount} />
      </stack.Navigator>
    </NavigationContainer>
  );
}