import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Encounter from './encounter';

const FailurePage = ({ navigation }) => {
    const message = navigation.getParam('message');

    const goBack = async () => {
        await AsyncStorage.clear();
        console.log("back");
        navigation.navigate('EncounterPage');
    }

    return (
        <View>
            <Text style={styles.instructions}>{message}</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={goBack}>
                <Text style={styles.buttonText}>Informar novo encontro</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 305,
        height: 159,
        marginBottom: 10
    },
    instructions: {
        color: '#888',
        fontSize: 18,
        marginHorizontal: 15,
    },
    button: {
        backgroundColor: 'blue',
        padding: 20,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
    },
    preconditionButtonText: {
        fontSize: 20,
        color: '#ccc',
    },
    thumbnail: {
        width: 300,
        height: 300,
        resizeMode: "contain"
    }
});

export default FailurePage;