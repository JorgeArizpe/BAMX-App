import { StyleSheet, View } from 'react-native';
import { useState, useEffect } from 'react';
import CategoryItem from '../components/CategoryItem';
import { useFirebase } from '../db/FirebaseContext';
import { doc, getDoc } from 'firebase/firestore';

export default function Inventario({ navigation }: any) {

    const { db } = useFirebase();
    const [categorias, setCategorias] = useState<any[]>([]);

    useEffect(() => {
        if (db) {
            const getCategorias = async () => {
                const docRef = doc(db, 'Inventario', 'Categorias');
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    const categoriasArray: any[] = data.categorias || [];
                    console.log(categoriasArray);
                    setCategorias(categoriasArray);
                } else {
                    console.log("No such document!");
                }
            };
            getCategorias();
        }
    }, [db]);

    return (
        <View style={styles.container}>
            {
                categorias.map((categoria, index) => {
                    console.log(categoria);
                    return (
                        <View key={index}>
                            <CategoryItem title={categoria} navigation={navigation} />
                        </View>
                    )
                })
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