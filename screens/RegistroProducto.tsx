import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Pressable, Alert, Image } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import { collection, addDoc, setDoc, doc, serverTimestamp } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { useFirebase } from '../db/FirebaseContext';
import { fetchCategorias } from '../db/fetchCategorias';
import { uploadImage } from '../db/uploadImage';

const background = require('../assets/backgroundMainSmall.png');

export default function RegistroProducto({ navigation }: any) {
    const { db, storage, auth } = useFirebase();
    const currentUser = auth?.currentUser;

    const [nombre, setNombre] = useState('');
    const [unidad, setUnidad] = useState('');
    const [openCategorias, setOpenCategorias] = useState(false);
    const [selectedCategoria, setSelectedCategoria] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [image, setImage] = useState('');
    const [cantidad, setCantidad] = useState(0);


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            console.log(result.assets[0].uri)
        }
    };

    useEffect(() => {
        fetchCategorias(db).then(setCategorias);
    }, [db]);

    const handleAddProduct = async () => {
        if (nombre === '' || selectedCategoria === null || unidad === '' || cantidad === 0) {
            Alert.alert('Error', 'Por favor, completa todos los campos.');
            return;
        }

        try {
            if (db && storage && currentUser) {
                await uploadImage(image, nombre, storage);
                const productData = {
                    nombre,
                    categoria: selectedCategoria,
                    unidad,
                    cantActual: cantidad,
                    cantMin: 100,
                };
                await setDoc(doc(db, 'Inventario/Categorias/' + selectedCategoria, nombre), productData);
                const newEntryRef = doc(collection(db, 'Historial'));
                await setDoc(newEntryRef, {
                    cantidad: cantidad,
                    donante: 'n/a',
                    fecha: serverTimestamp(),
                    producto: doc(db, `Inventario/Categorias/${selectedCategoria}/${nombre}`),
                    tipo: true,
                    usuario: doc(db, 'Usuarios', currentUser.uid)
                });
                Alert.alert('Éxito', 'Producto agregado correctamente');
                navigation.navigate('Home');
            }
        } catch (error) {
            console.error('Error adding product: ', error);
            Alert.alert('Error', 'No se pudo agregar el producto. Por favor, intenta de nuevo.');
        }
    };

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
                        {image ? (
                            <Image source={{ uri: image }} style={styles.uploadedImage} />
                        ) : (
                            <>
                                <Text style={styles.placeholderText}>Selecciona una imagen .PNG</Text>
                            </>
                        )}

                    </View>
                    <View>
                        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
                            <Text style={styles.uploadButtonText}>
                                {image ? 'Cambiar Imagen' : 'Seleccionar Archivo'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre del producto"
                            placeholderTextColor="#888"
                            onChangeText={(text) => setNombre(text)}
                        />
                        <View style={[styles.searchInputContainer, { zIndex: openCategorias ? 2000 : 1000 }]}>
                            <DropDownPicker
                                items={categorias}
                                open={openCategorias}
                                setOpen={setOpenCategorias}
                                value={selectedCategoria}
                                setValue={setSelectedCategoria}
                                placeholder="Categoría"
                                zIndex={2000}
                                zIndexInverse={3000}
                            />
                        </View>
                        <View>
                            <TextInput
                                style={styles.input}
                                placeholder="Unidad"
                                placeholderTextColor="#888"
                                onChangeText={(text) => setUnidad(text)}
                            />
                        </View>
                        <View>
                            <TextInput
                                style={styles.input}
                                keyboardType='numeric'
                                placeholder="Cantidad"
                                placeholderTextColor="#888"
                                onChangeText={(text) => setCantidad(parseInt(text))}
                            />
                        </View>
                    </View>
                    <View style={styles.addButtonContainer}>
                        <TouchableOpacity style={[styles.addButton, { zIndex: openCategorias ? -1 : 1000 }]} onPress={handleAddProduct}>
                            <Text style={{ fontWeight: 'bold' }}>Agregar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    addButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    uploadedImage: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        marginBottom: 10,
    },
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom: 10,
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
        marginTop: '18%',
        width: '90%',
        alignItems: 'center',
    },
    imageUploadContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 8,
        borderColor: 'darkred',
        width: '90%',
        height: 200,
        justifyContent: 'center',
    },
    uploadButton: {
        backgroundColor: '#D32F2F',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
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
});