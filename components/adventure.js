import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form'
import Failure from './failure';
import Reward from './reward';

const Preconditions = ({ preconditions, setSelectedReward }) => {
  const { register, setValue, handleSubmit } = useForm();

  useEffect(() => {
    register('mensagem')
  }, [register])

  const onSuccess = (data, reward) => {
    console.log("message", reward);
    setSelectedReward(reward);
  }

  let contents = [];

  preconditions.forEach(element => {
    contents.push(
      <TouchableOpacity 
        key={element.id} 
        style={styles.button}
        onPress={handleSubmit(data => onSuccess(data, element.reward))}>
          <Text style={styles.buttonText}>{element.precondition}</Text>
      </TouchableOpacity>
    )
  })

  return <>{contents}</>;
}

const Options = ({ options, setSelectedFailure, setSelectedReward }) => {

  const { register, setValue, handleSubmit } = useForm();

  useEffect(() => {
    register('mensagem')
  }, [register])

  const onFailure = (data, message) => {
    console.log("message", message);
    setSelectedFailure(message);
  }

  let contents = [];

  options.forEach(element => {
    contents.push(
      <View key={element.id}>
        <Text style={styles.instructions}>{element.option}</Text>
        <Preconditions 
          preconditions={element.preconditions}
          setSelectedReward={setSelectedReward} />
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(data => onFailure(data, element.failure))}>
          <Text style={styles.buttonText}>Falhou?</Text>
        </TouchableOpacity>
      </View>
    )
  })

  return <>{contents}</>;
}

const AdventureComponent = ({ encounterData }) => {
  const [selectedFailure, setSelectedFailure] = useState(null);
  const [selectedReward, setSelectedReward] = useState(null);

  if (selectedFailure !== null) {
    return <Failure message={selectedFailure} />
  }

  if (selectedReward !== null) {
    return <Reward reward={selectedReward} />
  }


  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>
        {encounterData.adventure}
      </Text>
      <Options
        options={encounterData.options}
        setSelectedFailure={setSelectedFailure} 
        setSelectedReward={setSelectedReward} />
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


export default AdventureComponent;