import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { ref, getDownloadURL } from 'firebase/storage';
import { useFirebase } from '../db/FirebaseContext';

export default function CategoryItem({ title, navigation }: any) {
    const [imageSource, setImageSource] = useState(require('../assets/inventarioPlaceholder.png'));
    const { storage } = useFirebase();

    useEffect(() => {
        const extensions = ['png', 'jpg', 'jpeg'];
        const fetchImage = async () => {
            if (!storage) return;

            for (const ext of extensions) {
                const storageRef = ref(storage, `Categorias/${title}.${ext}`);
                try {
                    const url = await getDownloadURL(storageRef);
                    setImageSource({ uri: url });
                    return;
                } catch (error) {
                    console.log(`No ${ext} image found for ${title}`);
                }
            }
            console.log(`No image found for ${title}`);
        };

        fetchImage();
    }, [title, storage]);

    return (
        <View style={{ marginTop: 25 }}>
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
        resizeMode: 'contain',
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
