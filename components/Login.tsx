import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, TextInput, View, ImageBackground, Image, Pressable, Text } from 'react-native';


const background = require('../assets/background.png');
const logo = require('../assets/manzana_logo.png');
const text_logo = require('../assets/texto_logo.png');

export default function Login({navigation}: any) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
            <ImageBackground source={background} resizeMode='cover' style={styles.back}>
                <Image source={logo} style={{ width: 150, height: 150, resizeMode: 'contain', margin: 20, }} />
                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    onChangeText={text => {
                        setEmail(text);
                    }} />
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    secureTextEntry={true}
                    onChangeText={text => {
                        setPassword(text);
                    }} />
                <Pressable style={[styles.button, { backgroundColor: '#CE0F2C', }]}>
                    <Text style={{ color: 'white' }}>LOG IN</Text>
                </Pressable>
                <Pressable style={[styles.button, { backgroundColor: '#F5A700', }]}
                    onPress={() => { navigation.navigate('CreateAccount') }}>
                    <Text style={{ color: 'black' }}>SIGN UP</Text>
                </Pressable>
                <Image source={text_logo} style={{ width: 150, height: 80, resizeMode: 'contain', marginBottom: 50 }} />
            </ImageBackground>
            <StatusBar style="auto" />
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
        backgroundColor: 'lightgray',
        width: 200,
    },
    button: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
        width: 200,
    },
});
