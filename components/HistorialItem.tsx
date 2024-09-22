import { View, StyleSheet, Text } from 'react-native';


export default function HistorialItem({ message, timestamp }: any) {
    return (
        <View style={styles.notificationContainer}>
            <Text style={styles.timestamp}>{timestamp}</Text>
            <Text style={{paddingBottom:10}}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    notificationContainer: {
        marginTop: 20,
        marginHorizontal: '5%',
        backgroundColor: '#d4d4d4',
        width: '90%',
        padding: 10,
        borderRadius: 20,
    },
    timestamp: {
        color: '#aaa',
        fontSize: 12,
        textAlign: 'right',
    },
});