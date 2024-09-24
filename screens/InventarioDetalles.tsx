import { StyleSheet, View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { useFirebase } from '../db/FirebaseContext';
import InventoryItem from '../components/InventoryItem';

export default function InventarioDetalles({ navigation, route }: any) {
    const { db } = useFirebase();
    const { title } = route.params;
    const [productos, setProductos] = useState<any[]>([]);

    useEffect(() => {
        if (db) {
            const getProductos = async () => {
                console.log(`/Inventario/Categorias/${title}`);
                const querySnapshot = await getDocs(collection(db, `/Inventario/Categorias/${title}`));
                const productos = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setProductos(productos);
            };
            getProductos();
        }
    }, [db, title]);


    return (
        <View style={styles.container}>
            {
                productos.length > 0 ?
                    <FlatList 
                        data={productos}
                        renderItem={({ item }) => <InventoryItem nombre={item.nombre} cantActual={item.cantActual} unidad={item.unidad} cantMin={item.cantMin} />}
                    />
                    :
                    <ActivityIndicator size="large" color="#0000ff" />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
});