import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native'; 
import { RadioButton } from 'react-native-paper';

export default function PayementDeLaCommande({navigation}) {
  const [checked, setChecked] = React.useState('');

  const buttonValider = () => {
    if(checked === 'Paiement par Carte') {
      navigation.navigate('CardPayement')
    } else if(checked === 'Paiement par mobile money') {
      navigation.navigate('MobilePayement')
    }
  }

  return (
    <View>
      <Text style={styles.headerText}>Mode de paiement</Text>
      
    <View style={styles.centerRadio}>
      <TouchableOpacity
        style={styles.radioView}
        onPress={() => setChecked('Paiement par Carte')}
        
      >
      <RadioButton
        value="Paiement par Carte" 
        status={ checked === 'Paiement par Carte' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('Paiement par Carte')}
      />
      <Text style={styles.labelStyle}> Paiement par Carte </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.radioView}
        onPress={() => {
          setChecked('Paiement par mobile money')
        }}

      >
      <RadioButton
        value="Paiement par mobile money"
        status={ checked === 'Paiement par mobile money' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('Paiement par mobile money')}
      />
      <Text style={styles.labelStyle}> Paiement par mobile money </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.radioView}
        onPress={() => setChecked('Paiement sur place ou à la livraison')}
      >
      <RadioButton
        value="Paiement sur place ou à la livraison"
        status={ checked === 'Paiement sur place ou à la livraison' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('Paiement sur place ou à la livraison')}
      />
      <Text style={styles.labelStyle}> Paiement sur place ou à la livraison </Text>
      </TouchableOpacity>
      <View style={styles.buttonStyle}>
        <Button title='Valider'
        onPress={buttonValider}/>
      </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  radioView: {
    width: '100%',
    flexDirection:'row',
    alignItems: 'center',
    marginLeft: '8%',
    paddingVertical: 4,
    marginTop: '1%',
    marginBottom: '10%',

  },

  centerRadio: {
    alignSelf: 'center'
  },

  headerText: {
    fontSize: 38,
    textAlign: 'center',
    marginTop: '10%',
    marginBottom: '25%',
  },

  labelStyle: {
    fontSize: 18
  },

  buttonStyle: {
    width: 100,
    alignSelf: 'center',
    marginBottom: '10%',
    marginTop: '5%'
  },
})