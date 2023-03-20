import { Text, View, StyleSheet, TextInput, ScrollView} from 'react-native';
import React, { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { useTranslation } from 'react-i18next';
import design from '../src/views/Composant/couleur';
import Button from '../src/views/Composant/bouton';
import { useRoute } from '@react-navigation/native';
import { formatPhoneNumber } from '../src/views/Composant/Format';

export default function Mobile({navigation}) {
  const {t} = useTranslation();
  const route = useRoute();

  const [data, setData] = useState([
    { label: 'Mvola', value: 'Mvola' },
    { label: 'Orange Money', value: 'Orange Money' },
    { label: 'Airtel Money', value: 'Airtel Money' },
  ]);

  const [isFocus, setIsFocus] = useState(false);
  const [isFocus1, setIsFocus1] = useState(false);
  const [isFocus2, setIsFocus2] = useState(false);
  
  const [value, setValue] = useState(null); // Les valeurs dans le dropdown
  const [inputNom, setInputNom] = useState("");
  const [inputEnvoyeur, setInputEnvoyeur] = useState();

  const [errMobileMess,setErrMobileMess] = useState(); // state pour l'erreur mobile
  const [errEnvoyeurMess, setErrEnvoyeurMess] = useState();
  const [errNomMess, setErrNomMess] = useState();

  const information = {
    nom: route.params.information.nom,
    tel: route.params.information.tel,
    commande: route.params.information.commande,
    entreprise: route.params.information.entreprise,
    nombre: route.params.information.nombre,
    prix: route.params.information.prix,
    idPub: route.params.information.idPub,
    idEtp:route.params.information.idEtp,
    idProduit:route.params.information.idProduit,
    modePaiement: route.params.information.modePaiement,
    type:route.params.information.type
  };

  const handleOnChangeEnvoyeur = (text) => {       //prend les valeurs saisi dans le champ destinataire
    setInputEnvoyeur(text);
  }

  const handleOnChangeNom = (text) => {       //prend les valeurs saisi dans le champ destinataire
    setInputNom(text);
  }

  const handleMobileError = (errorMessage) => {       //prend les etat de l'erreur dans le champ mobile
    setErrMobileMess(errorMessage);
  }

  const handleEnvoyeurError = (errorMessage) => {       //prend les etat de l'erreur l'email
    setErrEnvoyeurMess(errorMessage);
  }

  const handleNomError = (errorMessage) => {       //prend les etat de l'erreur l'email
    setErrNomMess(errorMessage);
  }

const champ = () => {
    let valid = true;
    let reg_phone_number = /^(\+|00)[0-9]*$/

    if (!value){   // l'utilisateur ne complète pas le champ de la CARTE
        valid = false
        handleMobileError(t('langues:noType'))      // l'utilisateur doit choisir un pays
      }

    if (!inputEnvoyeur) {                                          // si l'utilisateur ne complète pas le champ de l'EMAIL
        valid = false
        handleEnvoyeurError(t('langues:noSender'))
    } else if (inputEnvoyeur.length<11){
        valid = false
        handleEnvoyeurError(t('langues:noPhone'))
    }

    if (!inputNom) {                                          // si l'utilisateur ne complète pas le champ de l'EMAIL
        valid = false
        handleNomError(t('langues:noNameSender'))
    }
      if (valid == true) {
        navigation.navigate('resum_commande', {information})
      };
}



    return (
      
      <View>
        <ScrollView >
        
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: design.Vert }]}
          iconStyle={{marginRight: '1%', width: '10%'}}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? t('langues:type') : ''}
          value={value}
          onFocus={() => {handleMobileError(null),setIsFocus(true)}}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
        />

          {errMobileMess && (
                <Text style={styles.error}>{errMobileMess}</Text>//affiche l'erreur s'il y en a
          )}

        <Text style={[styles.label, {marginTop:'10%'}]}>{t('langues:recipient')}</Text>
        <TextInput
          style={styles.input}
          keyboardType={'decimal-pad'}
          editable={false}
        >{formatPhoneNumber(1340425936)}</TextInput>

        <View style={styles.rowName}>
            <Text style={styles.label}>{t('langues:name')}</Text><Text style={styles.inputMontant}>Rakoto Francis</Text>
        </View>

        <Text style={styles.label}>{t('langues:sender')}</Text>
        <TextInput
          style={[styles.input, isFocus1 && { borderColor: design.Vert }]}
          keyboardType={'phone-pad'}
          placeholder="numero de l'envoyeur (sans espace)"
          onChangeText={(text) => {handleOnChangeEnvoyeur(text)}}
          onFocus={() => {
            handleEnvoyeurError(null); setIsFocus1(true)
        }}
        onBlur={() => setIsFocus1(false)}
        >+261</TextInput>
        {errEnvoyeurMess && (
                <Text style={styles.error}>{errEnvoyeurMess}</Text>//affiche l'erreur s'il y en a
            )}

    <View style={[styles.rowName, {marginTop:'10%'}]}>
      <Text style={styles.label}>{t('langues:name')} </Text>
        <TextInput
          style={[styles.inputNom, isFocus2 && { borderColor: design.Vert }]}
          onChangeText={handleOnChangeNom}
          onFocus={() => {
            handleNomError(null); setIsFocus2(true)
          }}
          onBlur={() => setIsFocus2(false)}
        />
    </View>
    {errNomMess && (
                <Text style={styles.errorNom}>{errNomMess}</Text>//affiche l'erreur s'il y en a
            )}
    <View style={styles.rowName}>
        <Text style={styles.label}>{t('langues:amount')}</Text><Text style={styles.inputMontant}> {information.prix} ariary</Text>
    </View>  
      <View style={styles.buttonStyle}>
        <Button title={t('langues:pay')} onPress={champ}/>
      </View>
      </ScrollView>
    </View>
    );
}

const styles = StyleSheet.create({
      dropdown: {
        height: 50,
        width: '80%',
        alignSelf: 'center',
        borderColor: design.Marron,
        borderRadius: 8,
        borderWidth: 1,
        marginTop: '20%',
      },

      error: {
        color: 'red',
        marginLeft: '10%'
      },
      errorNom: {
        color: 'red',
        marginLeft: '25%'
      },

      placeholderStyle: {
        fontSize: 16,
        marginLeft: 20,
        color: 'black',
      },

      selectedTextStyle: {
        fontSize: 16,
        color: 'black',
      },

      label: {
        fontSize: 16,
        marginLeft: '10%',
        marginBottom: '1%',
        marginTop: '5%',
        fontWeight: 'bold',
        color: 'black',
      },
    
      input: {
        fontSize: 16,
        width: '80%',
        height:'8%',
        alignSelf: 'center',
        borderColor: design.Marron,
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: '2%',
        color: 'black',
      },

      rowName: {
        flexDirection: 'row',
        marginTop: '5%',
      },
      All: {
        marginTop:'20%',
        marginBottom: '10%',
      },

      inputNom: {
        fontSize: 16,
        width: '64%',
        height: '90%',
        marginLeft: '5%',
        borderColor: design.Marron,
        borderWidth: 1,
        borderRadius: 8,
        textAlignVertical: 'center',
        paddingLeft: '2%',
        color: 'black',
      },

      inputMontant: {
        fontSize: 16,
        marginLeft: '5%',
        paddingLeft: '2%',
        marginTop: '4.6%',
        color: 'black',
      },

      buttonStyle: {
        alignSelf: 'center',
        marginBottom: '10%',
        marginTop: '10%',
      },
});