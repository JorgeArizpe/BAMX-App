import { View, StyleSheet, Text, Pressable, ActivityIndicator, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useFirebase } from '../db/FirebaseContext';
import { doc, getDoc } from 'firebase/firestore';

export default function HistorialItem({ item }: any) {
    const { db } = useFirebase();
    const [producto, setProducto] = useState<any>(null);
    const [usuario, setUsuario] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProducto = async () => {
            if (db) {
                try {
                    const docRef = doc(db, item.producto.path);
                    const docSnap = await getDoc(docRef);
                    setProducto(docSnap.data());
                    const userDocRef = doc(db, item.usuario.path);
                    const userDocSnap = await getDoc(userDocRef);
                    setUsuario(userDocSnap.data());
                } catch (error) {
                    console.error('Error fetching product:', error);
                } finally {
                    setLoading(false);
                }
            }
        };
        getProducto();
    }, [db, item.producto.path]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    const timestamp = formatDistanceToNow(new Date(item.fecha.seconds * 1000), { addSuffix: true });
    var alerta = `${item.tipo ? 'Ingreso' : 'Salida'}: ${item.cantidad} ${producto.unidad} de ${producto.nombre} \n por ${usuario.name} \n${timestamp}`
    if (item.donante !== 'n/a') {
        alerta += `\n Donante: ${item.donante}`;
    }

    return (
        <View style={styles.notificationContainer}>
            <Pressable onPress={() => Alert.alert("Historial", alerta)}>
                <Text style={styles.timestamp}>{timestamp}</Text>
                <Text style={{ paddingBottom: 10 }}>
                    {item.tipo ? 'Ingreso:' : 'Salida:'} {item.cantidad} {producto.unidad} de {producto.nombre}
                </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    notificationContainer: {
        marginTop: 20,
        marginHorizontal: '5%',
        backgroundColor: '#d4d4d4',
        width: '90%',
        padding: 10,
        borderRadius: 20,
    },
    timestamp: {
        color: '#aaa',
        fontSize: 12,
        textAlign: 'right',
    },
    loadingContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
});
