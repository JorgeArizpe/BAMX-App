import { Text, View, StyleSheet, ImageBackground, Pressable } from 'react-native';

const background = require('../assets/backgroundMain.png');

export default function MainMenu({ navigation }: any) {
    return (
        <View style={styles.container}>
            <ImageBackground source={background} resizeMode='cover' style={styles.back}>
                <Text>Main Menu</Text>
                {/* Botones temporales */}
                <Pressable style={styles.button} onPress={() => { navigation.navigate('Salida') }}>
                    <Text>Salida de Producto</Text>
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
        borderRadius: 5,
        alignItems: 'center',
        width: 200,
        backgroundColor: 'lightblue',
    },
});