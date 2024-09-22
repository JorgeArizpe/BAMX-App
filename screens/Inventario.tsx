import { ScrollView, StyleSheet } from 'react-native';
import InventoryItem from '../components/InventoryItem';


export default function Inventario({ navigation }: any) {
    return (
        <ScrollView style={styles.container}>
            <InventoryItem
                title="Manzanas"
                imageSource={require('../assets/inventarioPlaceholder.png')}
                quantity={120}
                unit="Kg"
                minQuantity={100}
            />
            <InventoryItem
                title="Manzanas"
                imageSource={require('../assets/inventarioPlaceholder.png')}
                quantity={20}
                unit="Kg"
                minQuantity={100}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
});