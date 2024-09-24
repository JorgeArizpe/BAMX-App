import { StyleSheet, View, Text } from 'react-native';

export default function InventarioDetalles({ navigation, route }: any) {
    const { title } = route.params;
    return (
        <View style={styles.container}>
            <Text>Inventario Detalles</Text>
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