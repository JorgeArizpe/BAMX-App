import { View, StyleSheet, Text, ImageBackground, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useFirebase } from '../db/FirebaseContext';
import { fetchCategorias } from '../db/fetchCategorias';
import { fetchProductos } from '../db/fetchProductos';

const background = require('../assets/backgroundMainSmall.png');

export default function Editar({ navigation, route }: any) {
    const { db } = useFirebase();
    const [data, setData] = useState<any[]>([]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState<any[]>([]);
    const [categorias, setCategorias] = useState<any[]>([]);  // First dropdown list
    const [productos, setProductos] = useState<any[]>([]);    // Second dropdown list
    const [selectedCategoria, setSelectedCategoria] = useState(null); // Selected category
    const [selectedProducto, setSelectedProducto] = useState(null);   // Selected product

    // useEffect(() => {
    //     const fetchData = async () => {
    //         if (db && route.params.type != 'Productos') {
    //             const snapshot = query(collection(db, route.params.type));
    //             const docs = await getDocs(snapshot);
    //             setData(docs.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    //             setItems(docs.docs.map(doc => ({ label: doc.data().nombre, value: doc.id })));
    //         }
    //         if (db && route.params.type == 'Productos') {
    //             fetchCategorias(db).then(setCategorias);
    //         }
    //     };
    //     fetchData();
    // }, [db, route.params.type]);

    // useEffect(() => {
    //     if (selectedCategoria) {
    //         fetchProductos(db, selectedCategoria).then(setProductos);
    //     }
    // }, [db, selectedCategoria]);

    if (route.params.type == 'Productos') {
        return (
            <View style={styles.container}>
                <ImageBackground source={background} resizeMode='stretch' style={styles.back}>
                    <View style={styles.headerContainer}>
                        <Pressable onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back" style={styles.backArrow} />
                        </Pressable>
                        <Text style={styles.title}>Editar {route.params.type}</Text>
                    </View>
                    <View style={{ marginTop: '20%', marginBottom: '50%', width: '100%' }}>
                        <Text style={{ alignSelf: 'center' }}>Editar</Text>
                    </View>
                </ImageBackground>
            </View>
        );
    }

    if (route.params.type == 'Donantes') {
        return (
            <View style={styles.container}>
                <ImageBackground source={background} resizeMode='stretch' style={styles.back}>
                    <View style={styles.headerContainer}>
                        <Pressable onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back" style={styles.backArrow} />
                        </Pressable>
                        <Text style={styles.title}>Editar {route.params.type}</Text>
                    </View>
                    <View style={{ marginTop: '20%', marginBottom: '50%', width: '100%' }}>
                        <Text style={{ alignSelf: 'center' }}>Editar</Text>
                    </View>
                </ImageBackground>
            </View>
        );
    }

    else {
        return (
            <View style={styles.container}>
                <ImageBackground source={background} resizeMode='stretch' style={styles.back}>
                    <View style={styles.headerContainer}>
                        <Pressable onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back" style={styles.backArrow} />
                        </Pressable>
                        <Text style={styles.title}>Editar {route.params.type}</Text>
                    </View>
                    <View style={{ marginTop: '20%', marginBottom: '50%', width: '100%' }}>
                        <Text style={{ alignSelf: 'center' }}>Editar</Text>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

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
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        flex: 1,
        paddingRight: 80,
    },
    backArrow: {
        paddingLeft: 20,
        fontSize: 40,
        color: 'white',
    },
});
