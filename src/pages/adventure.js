import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { findEncounterById } from '../service/base-encounter';

const AdventurePage = ({ navigation }) => {
  const encounterData = navigation.getParam('encounter');

  const Options = ({ options }) => {

    const onFailure = (e, message) => {
      console.log("message", message);
      navigation.navigate('FailurePage', { message });
    }

    const goTo = (e, encounterId) => {
      let encounter = findEncounterById(encounterId);
      navigation.navigate('AdventurePage', { encounter });
    }

    let contents = [];

    options.forEach(element => {
      let challenge = "";
      if (element.preconditions.length !== 0) {
        challenge = <Preconditions preconditions={element.preconditions} />
      } else {
        challenge = (
          <TouchableOpacity
            key={element.id}
            style={styles.button}
            onPress={e => goTo(e, element.encounterId)}>
            <Text style={styles.buttonText}>Seguir esta Aventura</Text>
          </TouchableOpacity>
        );
      }


      contents.push(
        <View key={element.id}>
          <Text style={styles.instructions}>{element.option}</Text>
          {challenge}
          <TouchableOpacity
            style={styles.button}
            onPress={e => onFailure(e, element.failure)}>
            <Text style={styles.buttonText}>Falhou?</Text>
          </TouchableOpacity>
        </View>
      )
    })

    return <>{contents}</>;
  }

  const Preconditions = ({ preconditions }) => {

    const onSuccess = (e, reward) => {
      console.log("reward", reward);
      navigation.navigate('RewardPage', { reward });
    }

    let contents = [];

    preconditions.forEach(element => {
      contents.push(
        <TouchableOpacity
          key={element.id}
          style={styles.button}
          onPress={e => onSuccess(e, element.reward)}>
          <Text style={styles.buttonText}>{element.precondition}</Text>
        </TouchableOpacity>
      )
    })

    return <>{contents}</>;
  }


  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>
        {encounterData.adventure}
      </Text>
      <Options options={encounterData.options} />
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


export default AdventurePage;