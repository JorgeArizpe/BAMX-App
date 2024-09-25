import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Pressable, Alert, Keyboard } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { doc, getDoc, query, collection, getDocs, setDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState, useEffect } from 'react';
import { useFirebase } from '../db/FirebaseContext';
import { ref, getDownloadURL } from 'firebase/storage';
const background = require('../assets/backgroundMainSmall.png');
const placeholder = require('../assets/inventarioPlaceholder.png');

export default function Entrada({ navigation }: any) {
    const { db, storage, auth } = useFirebase();
    const currentUser = auth?.currentUser;

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [categorias, setCategorias] = useState<any[]>([]);  // First dropdown list
    const [productos, setProductos] = useState<any[]>([]);    // Second dropdown list
    const [selectedCategoria, setSelectedCategoria] = useState(null); // Selected category
    const [selectedProducto, setSelectedProducto] = useState(null);   // Selected product
    const [cantidad, setCantidad] = useState(0);
    const [donante, setDonante] = useState('');
    const [image, setImage] = useState(placeholder);
    const [openCategorias, setOpenCategorias] = useState(false);
    const [openProductos, setOpenProductos] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });
        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                if (db) {
                    const docRef = doc(db, 'Inventario', 'Categorias');
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data().categorias;
                        const categoriasFormatted = data.map((categoria: string) => ({
                            label: categoria,
                            value: categoria
                        }));
                        setCategorias(categoriasFormatted);
                    } else {
                        console.log("No categories found!");
                    }
                }
            } catch (error) {
                console.error('Error fetching categorias:', error);
            }
        };
        fetchCategorias();
    }, [db]);

    useEffect(() => {
        if (selectedCategoria) {
            const fetchProductos = async () => {
                try {
                    if (db) {
                        const q = query(collection(db, 'Inventario/Categorias/' + selectedCategoria));
                        const snapshot = await getDocs(q);
                        const productosData = snapshot.docs.map(doc => ({
                            label: doc.data().nombre,
                            value: doc.id
                        }));
                        setProductos(productosData);
                    }
                } catch (error) {
                    console.error('Error fetching products:', error);
                }
            };
            fetchProductos();
        }
    }, [db, selectedCategoria]);

    useEffect(() => {
        if (selectedProducto && storage) {
            const fetchImage = async () => {
                const storageRef = ref(storage, 'Productos/' + selectedProducto + '.png');
                const url = await getDownloadURL(storageRef);
                setImage({ uri: url });
            };
            fetchImage();
        } else {
            setImage(placeholder);
        }
    }, [storage, selectedProducto]);

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
                        source={image}
                        style={styles.productImage}
                    />
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Donante"
                            placeholderTextColor="#888"
                            onChangeText={(text) => setDonante(text)}
                        />
                        <View style={[styles.searchInputContainer, { zIndex: openCategorias ? 2000 : 0 }]}>
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
                        <View style={[styles.searchInputContainer, { zIndex: openProductos ? 1000 : 0 }]}>
                            {selectedCategoria && (
                                <DropDownPicker
                                    items={productos}
                                    open={openProductos}
                                    setOpen={setOpenProductos}
                                    value={selectedProducto}
                                    setValue={setSelectedProducto}
                                    placeholder="Producto"
                                    zIndex={1000}
                                    zIndexInverse={2000}
                                />
                            )}
                        </View>
                        <View style={styles.quantityContainer}>
                            {selectedProducto && (
                                <TextInput
                                    keyboardType='numeric'
                                    style={styles.quantityInput}
                                    placeholder="Cantidad de Unidades"
                                    placeholderTextColor="#888"
                                    onChangeText={(text) => setCantidad(Number(text))}
                                />
                            )}
                        </View>
                        <TouchableOpacity style={styles.confirmButton} onPress={async () => {
                            if (donante !== '' && selectedProducto !== '' && cantidad !== 0 && db && currentUser) {
                                try {
                                    const newEntryRef = doc(collection(db, 'Historial'));
                                    await setDoc(newEntryRef, {
                                        cantidad: cantidad,
                                        donante: donante,
                                        fecha: serverTimestamp(),
                                        producto: doc(db, `Inventario/Categorias/${selectedCategoria}/${selectedProducto}`),
                                        tipo: true,
                                        usuario: doc(db, 'Usuarios', currentUser.uid)
                                    });
                                    const productoRef = doc(db, `Inventario/Categorias/${selectedCategoria}/${selectedProducto}`);
                                    const productoDoc = await getDoc(productoRef);
                                    if (productoDoc.exists()) {
                                        const currentQuantity = productoDoc.data().cantActual;
                                        await updateDoc(productoRef, {
                                            cantActual: currentQuantity + cantidad
                                        });
                                    }
                                    Alert.alert('Entrada', 'Entrada registrada con éxito');
                                    navigation.navigate('Home');
                                } catch (error) {
                                    console.error('Error adding entry:', error);
                                    Alert.alert('Error', 'Hubo un problema al registrar la entrada');
                                }
                            } else {
                                Alert.alert('Entrada', 'Por favor, complete todos los campos')
                            }
                        }}>
                            <Text style={{ fontWeight: 'bold' }}>Confirmar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {!isKeyboardVisible ? (
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.registerButton} onPress={() => {
                            navigation.navigate('RegistroProducto')
                        }}>
                            <Text style={styles.registerButtonText}>+</Text>
                        </TouchableOpacity>
                        <Text style={styles.registerText}>Registrar</Text>
                    </View>
                ) : null}
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
});