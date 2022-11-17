import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native'; 
import { RadioButton } from 'react-native-paper';

export default function PayementDeLaCommande({navigation}) {
  const [checked, setChecked] = React.useState('');

  const styles = getStyles(checked);

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
      
      <View style={styles.cadre}>
      <TouchableOpacity
        style={styles.radioView1}
        onPress={() => setChecked('Paiement par Carte')}
        
      >
      <RadioButton
        value="Paiement par Carte" 
        status={ checked === 'Paiement par Carte' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('Paiement par Carte')}
      />
      <Text style={styles.labelStyle1}> Paiement par Carte </Text>
      </TouchableOpacity>
      </View>

      <View style={styles.cadre}>
      <TouchableOpacity
        style={styles.radioView2}
        onPress={() => {
          setChecked('Paiement par mobile money')
        }}
      >
      <RadioButton
        value="Paiement par mobile money"
        status={ checked === 'Paiement par mobile money' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('Paiement par mobile money')}
      />
      <Text style={styles.labelStyle2}> Paiement par mobile money </Text>
      </TouchableOpacity>

      </View>

      <View style={styles.cadre}>
      <TouchableOpacity
        style={styles.radioView3}
        onPress={() => setChecked('Paiement sur place ou à la livraison')}
      >
      <RadioButton
        value="Paiement sur place ou à la livraison"
        status={ checked === 'Paiement sur place ou à la livraison' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('Paiement sur place ou à la livraison')}
      />
      <Text style={styles.labelStyle3}> Paiement sur place ou à la livraison </Text>
      </TouchableOpacity>
      </View>

      <View style={styles.buttonStyle}>
        <Button title='Valider'
        onPress={buttonValider}/>
      </View>
    </View>
    </View>
  );
};

  const getStyles = (checked) =>StyleSheet.create({
  radioView1: {
    width: '100%',
    flexDirection:'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 8,
    backgroundColor: checked === 'Paiement par Carte' ? 'blue': 'white'
  },

  radioView2: {
    width: '100%',
    flexDirection:'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 8,
    backgroundColor: checked === 'Paiement par mobile money' ? 'blue': 'white'
  },

  radioView3: {
    width: '100%',
    flexDirection:'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 8,
    backgroundColor: checked === 'Paiement sur place ou à la livraison' ? 'blue': 'white'
  },

  labelStyle1: {
    fontSize: 18,
    width: '75%',
    color: checked === 'Paiement par Carte' ? 'white': 'black'
  },

  labelStyle2: {
    fontSize: 18,
    width: '75%',
    color: checked === 'Paiement par mobile money' ? 'white': 'black'
  },

  labelStyle3: {
    fontSize: 18,
    width: '75%',
    color: checked === 'Paiement sur place ou à la livraison' ? 'white': 'black'
  },

  cadre: {
    width: '100%',
    borderRadius: 8,
    marginBottom: '8%'
  },

  centerRadio: {
    alignSelf: 'center',
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
    marginTop: '5%',
  },
})