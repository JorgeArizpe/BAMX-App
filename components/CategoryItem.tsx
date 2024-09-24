import { View, Text, Image, StyleSheet, Pressable } from 'react-native';

const imageSource = require('../assets/inventarioPlaceholder.png');

export default function InventoryItem({ title, navigation }: any) {
    return (
        <View style={{ marginTop: 30 }}>
            <Pressable onPress={() => navigation.navigate('InventarioDetalles', { title })}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.itemContainer}>
                    <View style={styles.contentContainer}>
                        <View style={styles.imageContainer}>
                            <Image source={imageSource} style={styles.image} />
                        </View>
                        <Text>
                            placeholder
                        </Text>
                    </View>
                </View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        borderWidth: 15,
        borderRadius: 10,
        borderColor: 'green',
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
});
