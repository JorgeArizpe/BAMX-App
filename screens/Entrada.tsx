import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Pressable, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const background = require('../assets/backgroundMainSmall.png');

export default function Entrada({ navigation }: any) {
    return (
        <View style={styles.container}>
            <ImageBackground source={background} resizeMode='stretch' style={styles.back}>
                <View style={styles.headerContainer}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" style={styles.backArrow} />
                    </Pressable>
                    <Text style={styles.title}>Entrada de Productos</Text>
                </View>
                
                <View style={styles.content}>
                    <Image
                        source={require('../assets/inventarioPlaceholder.png')}
                        style={styles.productImage}
                    />
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Buscar Donante"
                            placeholderTextColor="#888"
                        />
                        <View style={styles.searchInputContainer}>
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Buscar Producto"
                                placeholderTextColor="#888"
                            />
                            <TouchableOpacity style={styles.searchButton}>
                                <Ionicons name="search" size={24} color="#888" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.quantityContainer}>
                            <TextInput
                                style={styles.quantityInput}
                                placeholder="Cantidad de Unidades"
                                placeholderTextColor="#888"
                            />
                            <View style={styles.unitContainer}>
                                <Text style={styles.unitText}>Kg</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.confirmButton} onPress={() => {
                            Alert.alert('Entrada', 'Entrada registrada con éxito')
                            navigation.navigate('Home')
                        }}>
                            <Text style={{fontWeight: 'bold'}}>Confirmar</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity style={styles.registerButton} onPress={() => {
                        navigation.navigate('RegistroProducto')
                    }}>
                        <Text style={styles.registerButtonText}>+</Text>
                    </TouchableOpacity>
                    <Text style={styles.registerText}>Registrar</Text>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    back: {
        flex: 1,
        alignItems: 'center',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        paddingTop: 40,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        flex: 1,
    },
    backArrow: {
        fontSize: 40,
        color: 'white',
    },
    content: {
        flex: 1,
        width: '100%',
        paddingTop: 100,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    productImage: {
        width: '90%',
        height: 200,
        borderRadius: 10,
        marginVertical: 20,
        borderWidth: 8,
        borderColor: 'darkred',
    },
    inputContainer: {
        backgroundColor: '#d9d9d9',
        borderRadius: 10,
        padding: 15,
        width: '90%',
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom: 10,
    },
    searchInput: {
        flex: 1,
        padding: 10,
    },
    searchButton: {
        padding: 10,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom: 10,
    },
    quantityInput: {
        flex: 1,
        padding: 10,
    },
    unitText: {
        padding: 10,
        backgroundColor: '#e0e0e0',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    confirmButton: {
        backgroundColor: '#ffd700',
        borderRadius: 5,
        padding: 15,
        alignItems: 'center',
    },
    footer: {
        alignItems: 'center',
        padding: 10,
        width: '100%',
    },
    registerButton: {
        backgroundColor: '#fff',
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },
    registerButtonText: {
        fontSize: 30,
        color: '#ff0000',
    },
    registerText: {
        color: '#fff',
    },
    unitContainer: {
        padding: 10,
        backgroundColor: '#e0e0e0',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
});