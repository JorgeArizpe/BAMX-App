import { collection, query, where, getDocs, Timestamp, doc, getDoc } from 'firebase/firestore';
import { Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export const reporte = async (db, dateInicio, dateFin, navigation, titulo, descripcion) => {

    try {
        const startDate = Timestamp.fromDate(dateInicio);
        const endDate = Timestamp.fromDate(dateFin);

        const q = query(
            collection(db, 'Historial'),
            where('fecha', '>=', startDate),
            where('fecha', '<=', endDate)
        );

        const querySnapshot = await getDocs(q);
        const documents = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Here you can process the documents or pass them to another function/screen
        var fileContent = '';
        fileContent += `Titulo: ${titulo}\n`;
        fileContent += `Descripcion: ${descripcion}\n`;
        fileContent += `Fecha de inicio: ${dateInicio}\n`;
        fileContent += `Fecha de fin: ${dateFin}\n`;
        fileContent += '\n';
        for (const docu of documents) {
            fileContent += `ID: ${docu.id}\n`;

            // Loop over each key-value pair in the document
            for (const [key, value] of Object.entries(docu)) {
                if (key !== 'id') {
                    if (key === 'producto') {
                        const productoPath = docu.producto?.path || 'N/A';
                        if (productoPath !== 'N/A') {
                            const docRef = doc(db, productoPath);
                            const docSnap = await getDoc(docRef);
                            const productoNombre = docSnap.data()?.nombre || 'N/A';
                            fileContent += `producto: ${productoNombre}\n`;
                            fileContent += `cantidad: ${docu.cantidad} ${docSnap.data()?.unidad}\n`;
                        } else {
                            fileContent += `producto: N/A\n`;
                        }
                    } else if (key === 'usuario') {
                        const usuarioPath = docu.usuario?.path || 'N/A';
                        if (usuarioPath !== 'N/A') {
                            const docRef = doc(db, usuarioPath);
                            const docSnap = await getDoc(docRef);
                            const usuarioNombre = docSnap.data()?.name || 'N/A';
                            fileContent += `usuario: ${usuarioNombre}\n`;
                        } else {
                            fileContent += `usuario: N/A\n`;
                        }
                    } else if (key === 'fecha') {
                        const fecha = docu.fecha?.toDate().toLocaleDateString() || 'N/A';
                        fileContent += `fecha: ${fecha}\n`;
                    } else if (key === 'cantidad') {
                        ;
                    } else if (key === 'tipo') {
                        if (docu.tipo === false) {
                            fileContent += `tipo: Retiro\n`;
                        } else if (docu.tipo === true) {
                            fileContent += `tipo: Donacion\n`;
                        }
                    } else {
                        fileContent += `${key}: ${value}\n`;
                    }
                }
            }
            fileContent += '\n';
        }

        // Generate a filename with current date and time
        const fileName = `reporte_${new Date().toISOString().replace(/[:.]/g, '_')}.txt`;
        const filePath = `${FileSystem.documentDirectory}${fileName}`;

        // Write the file
        await FileSystem.writeAsStringAsync(filePath, fileContent);

        // Share the file
        if (await Sharing.isAvailableAsync()) {
            await Sharing.shareAsync(filePath);
            Alert.alert('Reporte', `Reporte generado con éxito. ${documents.length} documentos encontrados.`);
        } else {
            Alert.alert('Error', 'Compartir no está disponible en este dispositivo');
        }

        navigation.navigate('Home');
    } catch (error) {
        console.error('Error generating report:', error);
        Alert.alert('Error', 'Hubo un problema al generar el reporte.');
    }
}