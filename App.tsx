import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Login from './screens/Login';
import CreateAccount from './screens/SignUp';
import MainMenu from './screens/MainMenu';
import Registro from './screens/Registro';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// const HomeIcon = ({ focused, color, size }: any) => ;

// Custom Drawer Content Component
function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      {/* Custom content at the top of the drawer */}
      <View style={styles.customContent}>
        {/* TODO poner el nombre del usuario */}
        <Text style={styles.customText}>Menu Epico Placeholder</Text>
      </View>

      {/* Render the default drawer items */}
      <DrawerItemList {...props} />

      {/* Custom content at the bottom */}
      <View style={styles.bottomDrawerSection}>
        <Pressable style={styles.drawerItem} onPress={() => props.navigation.navigate('Login')}>
          <Ionicons name="log-out" size={24} color={'white'} style={styles.drawerItemIcon} />
          <Text style={styles.drawerItemText}>Cerrar Sesión</Text>
        </Pressable>
      </View>
    </DrawerContentScrollView>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: { backgroundColor: '#CE0F2C', width: 240 },
        drawerLabelStyle: { color: 'white', fontSize: 13, flexWrap: 'wrap' },
        headerTintColor: '#fff',
      }}
    >
      <Drawer.Screen
        name="Home"
        component={MainMenu}
        options={{
          headerTitle: ' ',
          headerStyle: { backgroundColor: '#CE0F2C', height: 100 },
          drawerIcon: ({ focused, size }) => <Ionicons name="home" size={size} color={'white'} />
        }}
      />
      <Drawer.Screen
        name="Configuracion"
        component={MainMenu}
        options={{
          headerShown: false,
          drawerIcon: ({ focused, size }) => <Ionicons name="settings" size={size} color={'white'} />
        }}
      />
      <Drawer.Screen
        name="Inventario"
        component={MainMenu}
        options={{
          headerShown: false,
          drawerIcon: ({ focused, size }) => <Ionicons name="square" size={size} color={'white'} />
        }}
      />
      <Drawer.Screen
        name="Historial"
        component={MainMenu}
        options={{
          headerShown: false,
          drawerIcon: ({ focused, size }) => <Ionicons name="search-circle" size={size} color={'white'} />
        }}
      />
      <Drawer.Screen
        name="Generar Reporte"
        component={MainMenu}
        options={{
          headerShown: false,
          drawerIcon: ({ focused, size }) => <Ionicons name="pencil" size={size} color={'white'} />
        }}
      />
    </Drawer.Navigator>
  );
}

export default function navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Login flow */}
        <Stack.Group>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="CreateAccount" component={CreateAccount} />
          <Stack.Screen name="Main" component={DrawerNavigator} />
        </Stack.Group>
        {/* Main flow */}
        <Stack.Group>
          <Stack.Screen name="Registro" component={Registro} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  customContent: {
    padding: 20,
    marginVertical: 10,
    borderRadius: 5,
  },
  customText: {
    color: '#fff',
    fontSize: 30,
    textAlign: 'center',
  },
  bottomDrawerSection: {
    marginTop: 'auto',
    paddingVertical: 20,
    backgroundColor: '#CE0F2C',
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  drawerItemIcon: {
    marginRight: 20,
  },
  drawerItemText: {
    color: 'white',
    fontSize: 16,
  },
});