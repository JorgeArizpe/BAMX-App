import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Pressable, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const background = require('../assets/backgroundMainSmall.png');

export default function RegistroProducto({ navigation }: any) {
    return (
        <View style={styles.container}>
            <ImageBackground source={background} resizeMode='stretch' style={styles.back}>
                <View style={styles.headerContainer}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" style={styles.backArrow} />
                    </Pressable>
                    <Text style={styles.title}>Registro de Producto</Text>
                </View>

                <View style={styles.contentContainer}>
                    <View style={styles.imageUploadContainer}>
                        <Text style={styles.uploadText}>Arrastrar y soltar aquí el archivo</Text>
                        <Text style={styles.uploadSubtext}>PNG y JPG</Text>
                        <TouchableOpacity style={styles.uploadButton}>
                            <Text style={styles.uploadButtonText}>Seleccionar Archivo</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre del producto"
                            placeholderTextColor="#888"
                        />
                        <View>
                            <TouchableOpacity style={styles.categoryButton}>
                                <Text style={styles.categoryButtonText}>Categoria del producto</Text>
                                <Ionicons name="chevron-down" size={24} color="#888" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.unitsContainer}>
                            <Text style={styles.unitText}>Unidad de medida</Text>
                            <TouchableOpacity style={styles.unitButton}>
                                <Text style={styles.unitButtonText}>Lt</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.unitButton}>
                                <Text style={styles.unitButtonText}>Kg</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.addButton} onPress={() => { 
                        Alert.alert('Registro', 'Producto agregado')
                        navigation.navigate('Home') 
                        }}>
                        <Text style={styles.addButtonText}>Agregar</Text>
                    </TouchableOpacity>
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
    backArrow: {
        paddingLeft: 10,
        fontSize: 40,
        color: 'white',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        paddingRight: 70,
    },
    contentContainer: {
        marginTop: '30%',
        width: '90%',
        alignItems: 'center',
    },
    imageUploadContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 8,
        borderColor: 'darkred',
        width: '90%',
        height: 200,
        justifyContent: 'center',
    },
    uploadText: {
        fontSize: 16,
        color: '#888',
    },
    uploadSubtext: {
        fontSize: 14,
        color: '#888',
        marginBottom: 10,
    },
    uploadButton: {
        backgroundColor: '#D32F2F',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    uploadButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    inputContainer: {
        width: '90%',
        backgroundColor: '#d9d9d9',
        borderRadius: 10,
        padding: 15,
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    placeholderText: {
        color: '#888',
    },
    unitsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    unitButton: {
        backgroundColor: '#b4b4b4',
        borderRadius: 10,
        padding: 15,
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    unitButtonText: {
        color: '#525252',
    },
    addButton: {
        backgroundColor: '#FFC107',
        borderRadius: 10,
        padding: 15,
        width: '90%',
        alignItems: 'center',
        marginTop: 20,
    },
    addButtonText: {
        color: 'gray',
        fontWeight: 'bold',
        fontSize: 16,
    },
    unitText: {
        color: '#888',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
    },
    categoryButton: {
        backgroundColor: '#b4b4b4',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    categoryButtonText: {
        color: '#525252',
    },
});