import RadioForm from 'react-native-simple-radio-button';
import { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function PayementDeLaCommande({navigation}) {
  const [chosenOption, setChosenOption] = useState('apple');
  const options = [
    { label: 'Payement par carte', value: 'carte' },
    { label: 'Payement par mobile money', value: 'mobile' },
    { label: 'Payement sur place ou à la livraison', value: 'livraison' },
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.text}> Mode de payement</Text>
      <RadioForm
        radio_props={options}
        initial={0} //initial value of this group
        
        onPress={(value) => {
          setChosenOption(value);
        }} //if the user changes options, set the new value
        style={styles.radioButton}
      />
    <View style={styles.button}>
        <Button title='valider' onPress={() => {
          alert('Valider')
        }}/>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        textAlign: 'right'
    },
    text: {
        marginTop: 150,
        textAlign: 'center',
        fontSize: 25,
        marginBottom: 50
    },

    radioButton: {
        alignSelf: 'center',
        marginTop: 25,
    },

    button: {
        marginTop: 40,
        alignSelf: 'center',
        width: '30%',
    }
})

// npm i react-native-simple-radio-button 