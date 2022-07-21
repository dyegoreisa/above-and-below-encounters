import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useForm } from 'react-hook-form'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { findEncounterByNum } from '../service/base-encounter';
import encounterImg from '../assets/the-game.gif';

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
        <KeyboardAvoidingView style={styles.container}>
            <Image source={encounterImg} style={{ width: '100%', height: 240 }} />
            <Text style={styles.instructions}>
                Informe o número do encontro
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
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },
    img: {
        alignSelf: 'center',
        resizeMode: 'contain'
    },
    instructions: {
        color: '#888',
        fontSize: 26,
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
    thumbnail: {
        width: 300,
        height: 300,
        resizeMode: "contain"
    },
    input: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 4,
        marginTop: 20,
        paddingHorizontal: 15,
    }
});


export default EncounterPage;