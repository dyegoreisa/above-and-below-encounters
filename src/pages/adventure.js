import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import { findEncounterById } from '../service/base-encounter';
import caveCard from '../assets/cave-cards.jpg'

const AdventurePage = ({ navigation }) => {
  const encounterData = navigation.getParam('encounter');

  const Options = ({ options }) => {

    const onFailure = (e, message) => {
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
        <View key={element.id} style={styles.card}>
          <Text style={styles.optionName}>{element.option}</Text>
          {challenge}
          <TouchableOpacity
            style={styles.failureButton}
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
    <KeyboardAvoidingView >
      <ScrollView >
        <Image source={caveCard} style={styles.img} />
        <Text style={styles.adventureDescription}>
          {encounterData.adventure}
        </Text>
        {encounterData.bonus.length !== 0 && (
          <View style={styles.card}>
            <Text style={styles.bonus}>
              Bônus:
            </Text>
            <Text style={styles.bonusDescription}>
              {encounterData.bonus}
            </Text>
          </View>
        )}
        <Options options={encounterData.options} />
      </ScrollView>
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
  adventureDescription: {
    color: '#666',
    fontSize: 22,
    marginHorizontal: 15,
    marginBottom: 10
  },
  bonusDescription: {
    color: '#444',
    fontSize: 22,
    marginHorizontal: 15,
  },
  bonus: {
    color: '#222',
    fontSize: 16,
    marginHorizontal: 8,
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
  failureButton: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#DF4723',
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
    borderColor: '#DDD',
    borderRadius: 8,
    margin: 5,
    overflow: 'hidden',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  optionName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center'
  },
  img: {
    width: 400,
    alignSelf: 'center',
    resizeMode: 'contain'
  },
});


export default AdventurePage;