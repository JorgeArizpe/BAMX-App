import { View, Text, Image, StyleSheet } from 'react-native';
import { useState } from 'react';
import { ref, getDownloadURL } from 'firebase/storage';
import { useFirebase } from '../db/FirebaseContext';

export default function InventoryItem({ nombre, cantActual, unidad, cantMin }: any) {
    const { storage } = useFirebase();
    const [imageSource, setImageSource] = useState(require('../assets/inventarioPlaceholder.png'));
    const isLowStock = cantActual < cantMin;

    var storageRef = storage ? ref(storage, `Productos/${nombre}.png`) : require('../assets/inventarioPlaceholder.png');

    getDownloadURL(storageRef).then((url) => {
        setImageSource({ uri: url });
    }).catch((error) => {
        console.log(error);
    });

    return (
        <View style={{ marginTop: 30 }}>
            <Text style={styles.title}>{nombre}</Text>
            <View style={[styles.itemContainer, isLowStock ? styles.lowStock : styles.inStock]}>
                <View style={styles.contentContainer}>
                    <View style={styles.imageContainer}>
                        <Image source={imageSource} style={styles.image} />
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.text}>
                            Cantidad: {cantActual} {unidad}
                        </Text>
                        {isLowStock && <Text style={[styles.text, { color: 'red' }]}>Mínimo: {cantMin} {unidad}</Text>}
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        borderWidth: 15,
        borderRadius: 10,
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageContainer: {
        flex: 1,
    },
    image: {
        width: 150,
        height: 100,
        resizeMode: 'contain',
    },
    detailsContainer: {
        flex: 1,
        paddingLeft: 10,
    },
    title: {
        fontSize: 18,
        color: '#555555',
        backgroundColor: '#f8c208',
        padding: 5,
        borderRadius: 20,
        position: 'absolute',
        top: -15,
        alignSelf: 'center',
        zIndex: 1,
    },
    text: {
        fontSize: 16,
        color: '#555555',
    },
    inStock: {
        borderColor: 'green',
    },
    lowStock: {
        borderColor: 'red',
    },
});
