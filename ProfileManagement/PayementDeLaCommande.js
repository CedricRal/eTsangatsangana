import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable, ScrollView } from 'react-native'; 
import { RadioButton } from 'react-native-paper';
import design from '../src/views/Composant/couleur';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

export default function PayementDeLaCommande({navigation}) {
  const {t} = useTranslation();
  const route = useRoute();
  const [checked, setChecked] = React.useState('');

  const styles = getStyles(checked);
  const information = {
    nom: route.params.nom,
    tel: route.params.tel,
    commande: route.params.commande,
    entreprise: route.params.entreprise,
    nombre: route.params.nombre,
    prix: route.params.prix,
    idPub: route.params.idPub,
    idEtp:route.params.idEtp,
    idProduit:route.params.idProduit,
    type:route.params.type,
    modePaiement: checked,
  };
  
  console.log('info =>  ',information);

  const buttonValider = () => {
    if(checked === 'Paiement par carte') {
      navigation.navigate('CardPayement', {information})
    } else if(checked === 'Paiement par mobile money') {
      navigation.navigate('MobilePayement', {information})
    } else if(checked === 'Paiement sur place' || checked === 'Paiement à la livraison') {
      navigation.navigate('resum_commande', {information})
    }
  }



  return (
    <ScrollView>
    <View style={styles.arrierPlanBlanc}>
      <Text style={styles.headerText}>{t('langues:orderBy')}: </Text>
      
    <View style={styles.centerRadio}>
      
      <View style={styles.cadre}>
      <TouchableOpacity
        style={styles.radioView1}
        onPress={() => setChecked('Paiement par carte')}
        
      >
      <RadioButton
        color={design.Vert}
        value="Paiement par carte" 
        status={ checked === 'Paiement par carte' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('Paiement par carte')}
      />
      <Text style={styles.labelStyle1}>{t('langues:Pcard')}</Text>
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
        color={design.Vert}
        value="Paiement par mobile money"
        status={ checked === 'Paiement par mobile money' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('Paiement par mobile money')}
      />
      <Text style={styles.labelStyle2}>{t('langues:PmobileMoney')}</Text>
      </TouchableOpacity>

      </View>

      <View style={styles.cadre}>
      <TouchableOpacity
        style={styles.radioView3}
        onPress={() => setChecked('Paiement sur place')}
      >
      <RadioButton
        color={design.Vert}
        value="Paiement sur place"
        status={ checked === 'Paiement sur place' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('Paiement sur place')}
      />
      <Text style={styles.labelStyle3}>{t('langues:PonTheSpot')}</Text>
      </TouchableOpacity>
      </View>

      <View style={styles.cadre}>
      <TouchableOpacity
        style={styles.radioView4}
        onPress={() => setChecked('Paiement à la livraison')}
      >
      <RadioButton
        color={design.Vert}
        value="Paiement à la livraison"
        status={ checked === 'Paiement à la livraison' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('Paiement à la livraison')}
      />
      <Text style={styles.labelStyle4}>{t('langues:PonDelivery')}</Text>
      </TouchableOpacity>
      </View>

      <Pressable style={styles.button} onPress={buttonValider}>
          <Text style={styles.text}>{t('langues:validateButton')}</Text>
      </Pressable>
    </View>
    </View>
    </ScrollView>
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
    backgroundColor: checked === 'Paiement sur place' ? design.Marron: 'white'
  },
  radioView4: {
    width: '100%',
    flexDirection:'row',
    alignItems: 'center',
    paddingVertical: '4%',
    borderRadius: 8,
    backgroundColor: checked === 'Paiement à la livraison' ? design.Marron: 'white'
  },

  labelStyle1: {
    fontSize: 16,
    marginLeft: '8%',
    width: '75%',
    color: checked === 'Paiement par carte' ? 'white': 'black'
  },

  labelStyle2: {
    fontSize: 16,
    marginLeft: '8%',
    width: '75%',
    color: checked === 'Paiement par mobile money' ? 'white': 'black'
  },

  labelStyle3: {
    fontSize: 16,
    width: '75%',
    marginLeft: '8%',
    color: checked === 'Paiement sur place' ? 'white': 'black'
  },
  labelStyle4: {
    fontSize: 16,
    width: '75%',
    marginLeft: '8%',
    color: checked === 'Paiement à la livraison' ? 'white': 'black'
  },

  cadre: {
    width: '100%',
    borderRadius: 8,
    marginVertical: '4%',
  },

  centerRadio: {
    alignSelf: 'center',
  },

  headerText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: '18%',
    marginBottom: '8%',
    fontWeight: 'bold',
    color:'black'
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
    marginBottom:30,
    borderRadius: 25,
    backgroundColor: design.Marron,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: design.Blanc,
  },
})