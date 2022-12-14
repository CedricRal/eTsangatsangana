import { Text, View, StyleSheet, TextInput, ScrollView, Image, Button, Alert} from 'react-native';
import React, { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { useTranslation } from 'react-i18next';

export default function Mobile({navigation}) {
  const {t} = useTranslation();

  const [data, setData] = useState([
    { label: 'Mvola', value: 'Mvola' },
    { label: 'Orange Money', value: 'Orange Money' },
    { label: 'Airtel Money', value: 'Airtel Money' },
  ]);

  const [isFocus, setIsFocus] = useState(false);
  
  const [value, setValue] = useState(null); // Les valeurs dans le dropdown
  const [inputNom, setInputNom] = useState("");
  const [inputEnvoyeur, setInputEnvoyeur] = useState("");

  const [errMobileMess,setErrMobileMess] = useState(); // state pour l'erreur mobile
  const [errEnvoyeurMess, setErrEnvoyeurMess] = useState();
  const [errNomMess, setErrNomMess] = useState();

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
    } else if (reg_phone_number.test(inputEnvoyeur)===false){
        valid = false
        handleEnvoyeurError(t('langues:noPhone'))
    }

    if (!inputNom) {                                          // si l'utilisateur ne complète pas le champ de l'EMAIL
        valid = false
        handleNomError(t('langues:noNameSender'))
    }
      if (valid == true) {
        navigation.navigate('resum_commande',
    {
      carte: value,
      nom: 'Rakoto Francis'

    })
      };
}



    return (
      
      <View>
        <ScrollView>
        <Text style={styles.titre}>{t('langues:mobileMoney')}</Text>
        
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
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

        <Text style={styles.label}>{t('langues:recipient')}</Text>
        <TextInput
          style={styles.input}
          keyboardType={'decimal-pad'}
          editable={false}
        >+261340425936</TextInput>

        <View style={styles.rowName}>
            <Text style={styles.label}>{t('langues:name')}</Text><Text style={styles.inputMontant}>Rakoto Francis</Text>
        </View>

        <Text style={styles.label}>{t('langues:sender')}</Text>
        <TextInput
          style={styles.input}
          keyboardType={'phone-pad'}
          placeholder="numero de l'envoyeur (sans espace)"
          onChangeText={handleOnChangeEnvoyeur}
          onFocus={() => {
            handleEnvoyeurError(null)
        }}
        >+261</TextInput>
        {errEnvoyeurMess && (
                <Text style={styles.error}>{errEnvoyeurMess}</Text>//affiche l'erreur s'il y en a
            )}

    <View style={styles.rowName}>
      <Text style={styles.label}>{t('langues:name')} </Text>
        
        <TextInput
          style={styles.inputNom}
          onChangeText={handleOnChangeNom}
          onFocus={() => {
            handleNomError(null)
        }}
        />
    </View>
    {errNomMess && (
                <Text style={styles.errorNom}>{errNomMess}</Text>//affiche l'erreur s'il y en a
            )}
    <View style={styles.rowName}>
        <Text style={styles.label}>{t('langues:amount')}</Text><Text style={styles.inputMontant}>Ar 80 000</Text>
   </View>  
      <View style={styles.buttonStyle}>
        <Button title={t('langues:pay')} onPress={champ}/>
      </View>
      </ScrollView>
      </View>
      
    );
}

const styles = StyleSheet.create({

    titre: {
        textAlign: 'center',
        fontSize: 38,
        fontWeight: 'bold',
        marginTop: '10%',
        marginBottom: '10%'
      },

      dropdown: {
        height: 50,
        borderColor: 'gray',
        width: '80%',
        alignSelf: 'center',
        borderColor: 'gray',
        borderRadius: 8,
        borderWidth: StyleSheet.hairlineWidth,
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
      },

      selectedTextStyle: {
        fontSize: 16,
      },

      label: {
        fontSize: 16,
        marginLeft: '10%',
        marginBottom: '1%',
        marginTop: '5%',
        fontWeight: 'bold',
      },
    
      input: {
        fontSize: 16,
        width: '80%',
        alignSelf: 'center',
        borderColor: 'gray',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 8,
        paddingLeft: '2%'
      },

      rowName: {
        flexDirection: 'row',
        marginTop: '5%',
      },
      

      inputNom: {
        fontSize: 16,
        width: '50%',
        marginLeft: '5%',
        borderColor: 'gray',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 8,
        paddingLeft: '2%',
      },

      inputMontant: {
        fontSize: 16,
        marginLeft: '5%',
        paddingLeft: '2%',
        marginTop: '4.6%',
      },

      buttonStyle: {
        width: '25%',
        alignSelf: 'center',
        marginBottom: '10%',
        marginTop: '10%',
      },
});