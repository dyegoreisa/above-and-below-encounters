import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, ScrollView, Image } from 'react-native';
import rewardImg from '../assets/reward.png'

const RewardPage = ({ navigation }) => {
    const reward = navigation.getParam('reward');

    const goBack = async () => {
        await AsyncStorage.clear();
        navigation.navigate('EncounterPage');
    }

    return (
        <KeyboardAvoidingView >
            <ScrollView >
                <Image source={rewardImg} style={styles.img} />
                <Text style={styles.success}>
                    Conseguiu encontrar um lugar seguro para construir!
                </Text>
                <View style={styles.card}>
                    <Text style={styles.instructions}>{reward}</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={goBack}>
                        <Text style={styles.buttonText}>Informar novo encontro</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView >
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
    success: {
        color: '#555',
        fontSize: 24,
        textAlign: 'center',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 15,
    },
    instructions: {
        color: '#446128',
        fontSize: 22,
        marginHorizontal: 15,
    },
    button: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#154c79',
        borderRadius: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    preconditionButtonText: {
        fontSize: 20,
        color: '#ccc',
    },
    cardsContainer: {
        flex: 1,
        alignSelf: 'stretch',
        maxHeight: 500
    },
    card: {
        borderWidth: 1,
        borderColor: '#b8e77f',
        borderRadius: 8,
        margin: 5,
        overflow: 'hidden',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    img: {
        width: 400,
        height: 400,
        alignSelf: 'center',
        resizeMode: 'contain'
    }
});

export default RewardPage;