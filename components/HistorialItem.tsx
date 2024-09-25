import { View, StyleSheet, Text, Pressable, ActivityIndicator, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useFirebase } from '../db/FirebaseContext';
import { getProductoUsuario } from '../db/getProductoUsuario';

export default function HistorialItem({ item }: any) {
    const { db } = useFirebase();
    const [producto, setProducto] = useState<any>(null);
    const [usuario, setUsuario] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        getProductoUsuario(db, item, setProducto, setUsuario)
            .then(() => setLoading(false));
    }, [db, item.producto, item.usuario]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (!producto || !usuario) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Error loading product or user data</Text>
            </View>
        );
    }

    const timestamp = formatDistanceToNow(new Date(item.fecha.seconds * 1000), { addSuffix: true });
    let alerta = `${item.tipo ? 'Ingreso' : 'Salida'}: ${item.cantidad} ${producto.unidad} de ${producto.nombre} \npor ${usuario.name}\n${timestamp}`;

    if (item.donante !== 'n/a') {
        alerta += `\nDonante: ${item.donante}`;
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
    errorContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
    },
});
