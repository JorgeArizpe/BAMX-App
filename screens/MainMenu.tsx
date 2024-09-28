import { Text, View, StyleSheet, ImageBackground, Pressable, Image } from 'react-native';
import { signOut } from 'firebase/auth';
import { useFirebase } from '../db/FirebaseContext';
import Ionicons from '@expo/vector-icons/Ionicons';
const background = require('../assets/backgroundMain.png');
const logo = require('../assets/manzana_logo.png');

export default function MainMenu({ navigation }: any) {
    const { auth } = useFirebase();
    const currentUser = auth?.currentUser;
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={background} resizeMode='cover' style={styles.back}>
                <View style={styles.headerContainer}>
                    <Pressable onPress={() => { if (auth) signOut(auth) }}>
                        <Ionicons name="log-out" style={styles.leftHeaderItem} />
                    </Pressable>
                    <Pressable onPress={() => { navigation.navigate('Notificaciones') }}>
                        <Ionicons name="notifications" style={styles.rightHeaderItem} />
                    </Pressable>
                </View>
                <Image source={logo} style={styles.logo} />
                <Text style={styles.welcome}>Bienvenido, {currentUser?.displayName}</Text>
                <Text style={styles.welcome}>Menu Principal</Text>
                <View style={styles.menu}>
                    {/* Botones temporales */}
                    <Pressable style={styles.button} onPress={() => { navigation.navigate('Entrada') }}>
                        <Text>Entrada de Producto</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={() => { navigation.navigate('Salida') }}>
                        <Text>Salida de Producto</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={() => { navigation.navigate('Inventario') }}>
                        <Text>Inventario</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={() => { navigation.navigate('Reporte') }}>
                        <Text>Reporte</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={() => { navigation.navigate('Historial') }}>
                        <Text>Historial</Text>
                    </Pressable>
                    {/* Botones temporales */}
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    back: {
        flex: 1,
        alignItems: 'center',
    },
    input: {
        padding: 10,
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 10,
        width: 200,
        backgroundColor: 'lightgray',
    },
    button: {
        padding: 10,
        margin: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: 250,
        height: 75,
        backgroundColor: 'lightblue',
        justifyContent: 'center',
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        margin: 20,
    },
    welcome: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    menu: {
        marginTop: '5%',
        width: '80%',
        alignItems: 'center',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        paddingTop: 40,
    },
    leftHeaderItem: {
        paddingLeft: 20,
        fontSize: 35,
        color: 'white',
    },
    rightHeaderItem: {
        paddingRight: 20,
        fontSize: 35,
        color: 'white',
    },
});