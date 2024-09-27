import { Text, View, StyleSheet, ImageBackground, Pressable, Image } from 'react-native';
import { signOut } from 'firebase/auth';
import { useFirebase } from '../db/FirebaseContext';

const background = require('../assets/backgroundMain.png');
const logo = require('../assets/manzana_logo.png');

export default function MainMenu({ navigation }: any) {
    const { auth } = useFirebase();
    const currentUser = auth?.currentUser;
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={background} resizeMode='cover' style={styles.back}>
                <Image source={logo} style={styles.logo} />
                <Text style={styles.welcome}>Bienvenido, {currentUser?.displayName}</Text>
                <View style={styles.menu}>
                    <Text style={{ fontSize: 20 }}>Main Menu</Text>
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
                    <Pressable style={styles.button} onPress={() => { if (auth) signOut(auth) }}>
                        <Text>Logout</Text>
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
        width: 200,
        backgroundColor: 'lightblue',
    },
    logo: {
        marginTop: '20%',
        width: 150,
        height: 150,
        resizeMode: 'contain',
        margin: 20,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
    },
    menu: {
        marginTop: '10%',
        alignItems: 'center',
    },
});