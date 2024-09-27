import { Text, View, StyleSheet, ImageBackground, Pressable } from 'react-native';
import { signOut, getAuth } from 'firebase/auth';
import { useFirebase } from '../db/FirebaseContext';

const background = require('../assets/backgroundMain.png');

export default function MainMenu({ navigation }: any) {
    const { auth } = useFirebase();
    return (
        <View style={styles.container}>
            <ImageBackground source={background} resizeMode='cover' style={styles.back}>
                <Text>Main Menu</Text>
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
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    back: {
        flex: 1,
        justifyContent: 'center',
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
});