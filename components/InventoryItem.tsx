import { View, Text, Image, StyleSheet } from 'react-native';

export default function InventoryItem({ title, imageSource, quantity, unit, minQuantity }: any) {
    const isLowStock = quantity < minQuantity;
    return (
        <View style={{marginTop:30}}>
            <Text style={styles.title}>{title}</Text>
            <View style={[styles.itemContainer, isLowStock ? styles.lowStock : styles.inStock]}>
                <View style={styles.contentContainer}>
                    <View style={styles.imageContainer}>
                        <Image source={imageSource} style={styles.image} />
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.text}>
                            Cantidad: {quantity} {unit}
                        </Text>
                        {isLowStock && <Text style={[styles.text, { color: 'red' }]}>Mínimo: {minQuantity} {unit}</Text>}
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
        resizeMode: 'center',
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
