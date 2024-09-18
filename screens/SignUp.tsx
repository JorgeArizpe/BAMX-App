import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, TextInput, View, ImageBackground, Image, Pressable, Text } from 'react-native';

const background = require('../assets/background.png');
const logo = require('../assets/manzana_logo.png');
const text_logo = require('../assets/texto_logo.png');

export default function SignUp({navigation}: any) {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <View style={styles.container}>
            <ImageBackground source={background} resizeMode='cover' style={styles.back}>
                <Image source={logo} style={{ width: 150, height: 150, resizeMode: 'contain', margin: 20, }} />
                <TextInput
                    style={styles.input}
                    placeholder='Nombre Completo'
                    onChangeText={text => {
                        setName(text);
                    }} />
                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    onChangeText={text => {
                        setEmail(text);
                    }} />
                <TextInput
                    style={styles.input}
                    placeholder='Nombre de Usuario'
                    onChangeText={text => {
                        setUsername(text);
                    }} />
                <TextInput
                    style={styles.input}
                    placeholder='Contraseña'
                    onChangeText={text => {
                        setPassword(text);
                    }} />
                <TextInput
                    style={styles.input}
                    placeholder='Confirmar Contraseña'
                    onChangeText={text => {
                        setConfirmPassword(text);
                    }} />
                <Pressable style={[styles.button, { backgroundColor: '#F5A700', }]}>
                    <Text style={{ color: 'black' }}>CREAR CUENTA</Text>
                </Pressable>
                <Image source={text_logo} style={{ width: 150, height: 80, resizeMode: 'contain', marginBottom: 125 }} />
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
        width: 200,
        backgroundColor: 'lightgray',
    },
    button: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: 200,
    },
});
