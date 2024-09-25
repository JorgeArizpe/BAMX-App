import { View, StyleSheet, Text, ImageBackground, Pressable, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from '@expo/vector-icons/Ionicons';

const background = require('../assets/backgroundMainSmall.png');

export default function GenerarReporte({ navigation }: any) {

    const [dateInicio, setDateInicio] = useState(new Date());
    const [dateFin, setDateFin] = useState(new Date());
    const [showPickerInicio, setShowPickerInicio] = useState(false);
    const [showPickerFin, setShowPickerFin] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const onChangeInicio = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || dateInicio;
        setShowPickerInicio(false);
        setDateInicio(currentDate);
    };
    const onChangeFin = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || dateFin;
        setShowPickerFin(false);
        setDateFin(currentDate);
    };

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
                    <TextInput style={styles.input} placeholder='Titulo' value={titulo} onChangeText={setTitulo} />
                    <View style={styles.label}>
                        <View>
                            <Pressable style={styles.dateButton} onPress={() => setShowPickerInicio(true)}>
                                <Text style={styles.dateButtonText}>Fecha de inicio</Text>
                            </Pressable>
                            <Text style={styles.selectedDate}>
                                Fecha seleccionada: {dateInicio.toLocaleDateString()}
                            </Text>
                        </View>
                        <View>
                            {showPickerInicio && (
                                <DateTimePicker
                                    value={dateInicio}
                                    mode='date'
                                    display="default"
                                    onChange={(event, selectedDate) => {
                                        setShowPickerInicio(false);
                                        onChangeInicio(event, selectedDate);
                                    }}
                                    is24Hour={true}
                                />
                            )}
                        </View>
                    </View>

                    <View style={styles.label}>
                        <View>
                            <Pressable style={styles.dateButton} onPress={() => setShowPickerFin(true)}>
                                <Text style={styles.dateButtonText}>Fecha de fin</Text>
                            </Pressable>
                            <Text style={styles.selectedDate}>
                                Fecha seleccionada: {dateFin.toLocaleDateString()}
                            </Text>
                        </View>
                        <View>
                            {showPickerFin && (
                                <DateTimePicker
                                    value={dateFin}
                                    mode='date'
                                    display="default"
                                    onChange={(event, selectedDate) => {
                                        setShowPickerFin(false);
                                        onChangeFin(event, selectedDate);
                                    }}
                                    is24Hour={true}
                                />
                            )}
                        </View>
                    </View>

                    <TextInput style={[styles.input, styles.descriptionInput]} placeholder="Descripción" value={descripcion} onChangeText={setDescripcion} />

                    <Pressable style={styles.confirmButton} onPress={() => {
                        Alert.alert('Reporte', 'Reporte generado con éxito')
                        navigation.navigate('Home')
                    }}>
                        <Text style={styles.confirmButtonText}>Confirmar</Text>
                    </Pressable>
                </View>
            </ImageBackground >
        </View >
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
    dateButton: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    dateButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
    selectedDate: {
        marginBottom: 10,
        fontSize: 16,
    },
});
