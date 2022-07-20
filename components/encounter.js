import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useForm } from 'react-hook-form'
import AdventureComponent from './adventure';

const EncounterComponent = ({ encounterBase }) => {
    const [selectEncounter, setSelectEncounter] = useState(null);

    const { register, setValue, handleSubmit } = useForm();

    useEffect(() => {
        register('encounterNum')
    }, [register])

    const lpad = (char) => {
        let width = 3;
        return "enc" + (new Array(width).join("0") + char).slice(-width);
    }

    const openEncounter = (data) => {
        let encounterId = lpad(data.encounterNum);
        console.log("encounterId", encounterId);
        setSelectEncounter(encounterBase[encounterId]);
    };

    if (selectEncounter !== null) {
        return <AdventureComponent encounterData={selectEncounter} />
    }

    return (
        <View style={styles.container}>
            <Text style={styles.instructions}>
                Informe o numero do encontro
            </Text>
            <TextInput
                style={styles.input}
                keyboardType='numeric'
                placeholder={'Digite o número do encontro'}
                onChangeText={num => setValue('encounterNum', num)} />
            <TouchableOpacity
                onPress={handleSubmit(openEncounter)}
                style={styles.button}>
                <Text style={styles.buttonText}>Ir para o encontro</Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
        </View>
    );
};

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
    thumbnail: {
        width: 300,
        height: 300,
        resizeMode: "contain"
    }
});


export default EncounterComponent;