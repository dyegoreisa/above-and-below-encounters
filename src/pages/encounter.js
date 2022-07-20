import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useForm } from 'react-hook-form'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { findEncounterByNum } from '../service/base-encounter';

const EncounterPage = ({ navigation }) => {
    const { register, setValue, handleSubmit } = useForm();

    useEffect(() => {
        AsyncStorage.getItem('encounterNum').then(encounterNum => {
            if (encounterNum) {
                let encounter = findEncounterByNum(encounterNum);
                if (encounter) {
                    navigation.navigate('AdventurePage', { encounter });
                } else {
                    AsyncStorage.clear();
                }
            }
        })
        register('encounterNum')
    }, [register])

    const openEncounter = async (data) => {
        let encounter = findEncounterByNum(data.encounterNum);

        if (typeof encounter !== 'undefined') {
            await AsyncStorage.setItem('encounterNum', data.encounterNum);
            navigation.navigate('AdventurePage', { encounter });
        } else {
            alert('Aventura não encontrada');
        }
    };

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


export default EncounterPage;