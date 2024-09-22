import { View, StyleSheet, Text, ImageBackground, Pressable, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const background = require('../assets/backgroundMainSmall.png');

export default function GenerarReporte({ navigation }: any) {
    return (
        <View style={styles.container}>
            <ImageBackground source={background} resizeMode='cover' style={styles.back}>
                <View style={styles.headerContainer}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" style={styles.backArrow} />
                    </Pressable>
                    <Text style={styles.title}>Generar reporte</Text>
                </View>

                <View style={styles.contentContainer}>
                    <View style={styles.formContainer}>
                        <TextInput style={styles.input} placeholder="Título" placeholderTextColor="#888" />

                        <Text style={styles.label}>Seleccionar fecha desde</Text>
                        <View style={styles.dateContainer}>
                            <Pressable style={styles.dateButton}><Text style={styles.dateButtonText}>Día</Text></Pressable>
                            <Pressable style={styles.dateButton}><Text style={styles.dateButtonText}>Mes</Text></Pressable>
                            <Pressable style={styles.dateButton}><Text style={styles.dateButtonText}>Año</Text></Pressable>
                        </View>

                        <Text style={styles.label}>Seleccionar fecha hasta</Text>
                        <View style={styles.dateContainer}>
                            <Pressable style={styles.dateButton}><Text style={styles.dateButtonText}>Día</Text></Pressable>
                            <Pressable style={styles.dateButton}><Text style={styles.dateButtonText}>Mes</Text></Pressable>
                            <Pressable style={styles.dateButton}><Text style={styles.dateButtonText}>Año</Text></Pressable>
                        </View>

                        <TextInput style={[styles.input, styles.descriptionInput]} placeholder="Descripción" placeholderTextColor="#888" multiline />

                        <Pressable style={styles.confirmButton}>
                            <Text style={styles.confirmButtonText}>Confirmar</Text>
                        </Pressable>
                    </View>
                </View>
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
    contentContainer: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: 100,
    },
    formContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
    },
    input: {
        backgroundColor: '#f0f0f0',
        borderRadius: 15,
        padding: 10,
        marginBottom: 15,
    },
    label: {
        textAlign: 'center',
        marginBottom: 5,
        color: '#333',
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    dateButton: {
        backgroundColor: '#ffc107',
        borderRadius: 15,
        padding: 10,
        flex: 1,
        marginHorizontal: 5,
    },
    dateButtonText: {
        color: 'black',
        textAlign: 'center',
    },
    descriptionInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    confirmButton: {
        backgroundColor: '#ffc107',
        borderRadius: 15,
        padding: 15,
        alignItems: 'center',
    },
    confirmButtonText: {
        color: 'black',
        fontWeight: 'bold',
    },
});
