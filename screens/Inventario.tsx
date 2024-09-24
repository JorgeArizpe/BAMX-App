import { StyleSheet, View } from 'react-native';
import CategoryItem from '../components/CategoryItem';

export default function Inventario({ navigation }: any) {
    const categorias = ['Abarrotes', 'Canasta Basica', 'Fruta y verdura', 'No alimenticios', 'Productos animales']
    return (
        <View style={styles.container}>
            {
                categorias.map((categoria, index) => {
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