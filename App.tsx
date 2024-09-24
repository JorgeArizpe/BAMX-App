import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence, onAuthStateChanged, signOut } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { Login, CreateAccount, MainMenu, Inventario, Historial, GenerarReporte, Entrada, RegistroProducto, Salida, Loading } from './screens';
import { FirebaseContext } from './db/FirebaseContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState, useEffect } from 'react';
import InventarioDetalles from './screens/InventarioDetalles';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.EXPO_PUBLIC_DATABASE_URL,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);
const storage = getStorage(app);
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const screenOptionsDrawer = ({ navigation }: any) => ({
  headerLeft: () => (
    <Pressable onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" style={styles.backArrow} />
    </Pressable>
  ),
  headerRight: () => (
    <Pressable onPress={() => navigation.navigate('Home')}>
      <Image
        source={require('./assets/manzana_logo.png')}
        style={styles.headerRightImage}
      />
    </Pressable>
  ),
});

const screenOptionsStack = ({ navigation }: any) => ({
  headerBackVisible: false,
  headerShown: true,
  headerTitle: () => (
    <View style={styles.headerTitleContainer}>
      <Text style={styles.headerTitle}>Inventario</Text>
    </View>
  ),
  headerRight: () => (
    <Pressable onPress={() => navigation.navigate('Home')}>
      <Image
        source={require('./assets/manzana_logo.png')}
        style={styles.headerRightImage}
      />
    </Pressable>
  ),
  headerLeft: () => (
    <Pressable onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" style={[styles.backArrow, { marginLeft: -20, marginRight: 20 }]} />
    </Pressable>
  ),
});

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.customContent}>
        <Text style={styles.customText}>Bienvenido, {props.name}</Text>
      </View>

      <DrawerItemList {...props} />

      <View style={styles.bottomDrawerSection}>
        <Pressable style={styles.drawerItem} onPress={() => {
          signOut(auth)
            .then(() => {
              props.navigation.navigate('Login');
            })
            .catch((error) => {
              console.error('Error al cerrar sesión:', error);
            });
        }}>
          <Ionicons name="log-out" size={24} color={'white'} style={styles.drawerItemIcon} />
          <Text style={styles.drawerItemText}>Cerrar Sesión</Text>
        </Pressable>
      </View>
    </DrawerContentScrollView>
  );
}

function DrawerNavigator({ route }: any) {
  const { name } = route.params;
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} name={name} />}
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
          drawerIcon: ({ size }) => <Ionicons name="home" size={size} color={'white'} />
        }}
      />
      <Drawer.Screen
        name="Inventario"
        component={Inventario}
        options={({ navigation }) => ({
          drawerIcon: ({ size }) => <Ionicons name="square" size={size} color={'white'} />,
          headerTitle: () => (
            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitle}>Inventario</Text>
            </View>
          ),
          ...screenOptionsDrawer({ navigation }),
        })}
      />

      <Drawer.Screen
        name="Historial"
        component={Historial}
        options={{
          headerShown: false,
          drawerIcon: ({ size }) => <Ionicons name="search-circle" size={size} color={'white'} />,
        }}
      />
      <Drawer.Screen
        name="Generar Reporte"
        component={GenerarReporte}
        options={{
          headerShown: false,
          drawerIcon: ({ size }) => <Ionicons name="pencil" size={size} color={'white'} />
        }}
      />
      <Drawer.Screen
        name="Entrada"
        component={Entrada}
        options={{
          headerShown: false,
          drawerIcon: ({ size }) => <Ionicons name="add-circle-outline" size={size} color={'white'} />
        }}
      />
    </Drawer.Navigator>
  );
}

export default function Navigation() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });

    return unsubscribe;
  }, []);

  if (initializing) return <Loading />;

  return (
    <FirebaseContext.Provider value={{ app, auth, db, storage }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {user ? (
            <>
              <Stack.Screen name="Main" component={DrawerNavigator} initialParams={{ name: user.displayName }} />
              <Stack.Screen name="RegistroProducto" component={RegistroProducto} />
              <Stack.Screen name="Salida" component={Salida} />
              <Stack.Screen
                name="InventarioDetalles"
                component={InventarioDetalles}
                options={({ navigation }) => ({
                  ...screenOptionsStack({ navigation }),
                })}
              />
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="CreateAccount" component={CreateAccount} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </FirebaseContext.Provider>
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
    resizeMode: 'contain',
  },
});