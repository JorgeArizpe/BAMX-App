import { View, ImageBackground, Image, StyleSheet } from 'react-native';

const background = require('../assets/background.png');
const logo = require('../assets/manzana_logo.png');
const text_logo = require('../assets/texto_logo.png');

export default function Loading() {
    return (
        <View style={styles.container}>
            <ImageBackground source={background} style={styles.background} />
            <Image source={logo} style={styles.logo} />
            <Image source={text_logo} style={styles.text_logo} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 200,
    },
    text_logo: {
        width: 200,
        height: 200,
    },
});