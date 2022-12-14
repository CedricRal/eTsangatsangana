import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native'; 
import { RadioButton } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

export default function PayementDeLaCommande({navigation}) {
  const {t} = useTranslation();
  const [checked, setChecked] = React.useState('');

  const styles = getStyles(checked);

  const buttonValider = () => {
    if(checked === 'Paiement par carte') {
      navigation.navigate('CardPayement')
    } else if(checked === 'Paiement par mobile money') {
      navigation.navigate('MobilePayement')
    }
  }



  return (
    <View style={styles.arrierPlanBlanc}>
      <Text style={styles.headerText}>{t('langues:orderBy')}: </Text>
      
    <View style={styles.centerRadio}>
      
      <View style={styles.cadre}>
      <TouchableOpacity
        style={styles.radioView1}
        onPress={() => setChecked('Paiement par carte')}
        
      >
      <RadioButton
        value="Paiement par carte" 
        status={ checked === 'Paiement par carte' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('Paiement par carte')}
      />
      <Text style={styles.labelStyle1}>{t('langues:card')}</Text>
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
      <Text style={styles.labelStyle2}>{t('langues:mobileMoney')}</Text>
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
      <Text style={styles.labelStyle3}>{t('langues:onTheSpot')}</Text>
      </TouchableOpacity>
      </View>

      <Pressable style={styles.button} onPress={buttonValider}>
          <Text style={styles.text}>{t('langues:validateButton')}</Text>
      </Pressable>
    </View>
    </View>
  );
};

  const getStyles = (checked) =>StyleSheet.create({
  arrierPlanBlanc:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
  radioView1: {
    width: '100%',
    flexDirection:'row',
    alignItems: 'center',
    paddingVertical: '4%',
    borderRadius: 8,
    backgroundColor: checked === 'Paiement par carte' ? design.Marron: 'white'
  },

  radioView2: {
    width: '100%',
    flexDirection:'row',
    alignItems: 'center',
    paddingVertical: '4%',
    borderRadius: 8,
    backgroundColor: checked === 'Paiement par mobile money' ? design.Marron: 'white'
  },

  radioView3: {
    width: '100%',
    flexDirection:'row',
    alignItems: 'center',
    paddingVertical: '4%',
    borderRadius: 8,
    backgroundColor: checked === 'Paiement sur place ou à la livraison' ? design.Marron: 'white'
  },

  labelStyle1: {
    fontSize: 18,
    marginLeft: '8%',
    width: '75%',
    color: checked === 'Paiement par carte' ? 'white': 'black'
  },

  labelStyle2: {
    fontSize: 18,
    marginLeft: '8%',
    width: '75%',
    color: checked === 'Paiement par mobile money' ? 'white': 'black'
  },

  labelStyle3: {
    fontSize: 18,
    width: '75%',
    marginLeft: '8%',
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
    fontSize: 21,
    textAlign: 'center',
    marginBottom: '20%',
    fontWeight: 'bold',
  },

  labelStyle: {
    fontSize: 18
  },

  button: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '3%',
    paddingHorizontal: '10%',
    borderRadius: 25,
    backgroundColor: design.Marron,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: design.Blanc,
  },
})