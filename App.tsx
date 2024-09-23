import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Login from './screens/Login';
import CreateAccount from './screens/SignUp';
import MainMenu from './screens/MainMenu';
import Inventario from './screens/Inventario';
import Historial from './screens/Historial';
import GenerarReporte from './screens/GenerarReporte';
import Entrada from './screens/Entrada';
import RegistroProducto from './screens/RegistroProducto';
import Salida from './screens/Salida';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const screenOptions = ({ navigation }:any) => ({
  headerStyle: { height: 100 },
  headerLeft: () => (
    <Pressable onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" style={styles.backArrow} />
    </Pressable>
  ),
  headerRight: () => (
    <Pressable onPress={() => navigation.navigate('Home')}>
      <Image
        source={require('./assets/manzana_logo.png')}
        style={[styles.headerRightImage, { resizeMode: 'contain' }]}
      />
    </Pressable>
  ),
});

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.customContent}>
        <Text style={styles.customText}>Menu Epico Placeholder</Text>
      </View>

      <DrawerItemList {...props} />

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
        drawerStyle: { backgroundColor: '#CE0F2C', width: 240, borderTopRightRadius: 30, borderBottomRightRadius: 30 },
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
        component={Inventario}
        options={({ navigation }) => ({
          drawerIcon: ({ focused, size }) => <Ionicons name="square" size={size} color={'white'} />,
          headerTitle: () => (
            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitle}>Inventario</Text>
            </View>
          ),
          ...screenOptions({ navigation }),
        })}
      />

      <Drawer.Screen
        name="Historial"
        component={Historial}
        options={{
          headerShown: false,
          drawerIcon: ({ focused, size }) => <Ionicons name="search-circle" size={size} color={'white'} />,
        }}
      />
      <Drawer.Screen
        name="Generar Reporte"
        component={GenerarReporte}
        options={{
          headerShown: false,
          drawerIcon: ({ focused, size }) => <Ionicons name="pencil" size={size} color={'white'} />
        }}
      />
      <Drawer.Screen
        name="Entrada"
        component={Entrada}
        options={{
          headerShown: false,
          drawerIcon: ({ focused, size }) => <Ionicons name="add-circle-outline" size={size} color={'white'} />
        }}
      />
    </Drawer.Navigator>
  );
}

export default function navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Stack para las pantallas de login y registro  */}
        <Stack.Group>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="CreateAccount" component={CreateAccount} />
          <Stack.Screen name="Main" component={DrawerNavigator} />
        </Stack.Group>
        {/* Stack para las pantallas de inventario y otros usos*/}
        <Stack.Group>
          <Stack.Screen name="RegistroProducto" component={RegistroProducto} />
          <Stack.Screen name="Salida" component={Salida} />
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
  backArrow: {
    width: 60,
    fontSize: 40,
    color: 'white',
    backgroundColor: '#CE0F2C',
    paddingLeft: 20,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
  },
  headerTitleContainer: {
    backgroundColor: '#d3d3d3',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
    alignSelf: 'center',
    width: 270,
  },
  headerTitle: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  headerRightImage: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
});