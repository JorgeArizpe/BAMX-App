import { ScrollView, View, StyleSheet, Text, ImageBackground, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import HistorialItem from '../components/HistorialItem';

const background = require('../assets/backgroundMainSmall.png');

export default function Historial({ navigation }: any) {
    return (
        <View style={styles.container}>
            <ImageBackground source={background} resizeMode='stretch' style={styles.back}>
                <View style={styles.headerContainer}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" style={styles.backArrow} />
                    </Pressable>
                    <Text style={styles.title}>Historial</Text>
                </View>
                <ScrollView style={{ marginTop: '20%', marginBottom: '30%', width: '100%' }}>
                    <HistorialItem message='Notificacion placeholder' timestamp="Hace 4h" />
                    <HistorialItem message='Notificacion placeholder' timestamp="Hace 4h" />
                    <HistorialItem message='Notificacion placeholder' timestamp="Hace 4h" />
                    <HistorialItem message='Notificacion placeholder' timestamp="Hace 4h" />
                    <HistorialItem message='Notificacion placeholder' timestamp="Hace 4h" />
                    <HistorialItem message='Notificacion placeholder' timestamp="Hace 4h" />
                    <HistorialItem message='Notificacion placeholder' timestamp="Hace 4h" />
                    <HistorialItem message='Notificacion placeholder' timestamp="Hace 4h" />
                    <HistorialItem message='Notificacion placeholder' timestamp="Hace 4h" />
                </ScrollView>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    back: {
        flex: 1,
        alignItems: 'center',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        paddingTop: 40,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        flex: 1,
        paddingRight: 80,
    },
    backArrow: {
        paddingLeft: 20,
        fontSize: 40,
        color: 'white',
    },
});
