import { Text, View, StyleSheet, TextInput, ScrollView, Image, Button, Alert} from 'react-native';
import React, { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { red100 } from 'react-native-paper/lib/typescript/styles/colors';


export default function Mobile({navigation}) {

  const [data, setData] = useState([
    { label: 'Mvola', value: '1' },
    { label: 'Orange Money', value: '2' },
    { label: 'Airtel Money', value: '3' },
  ]);

  const [isFocus, setIsFocus] = useState(false);
  
  const [value, setValue] = useState(null); // Les valeurs dans le dropdown
  const [inputDestinataire, setInputDestinataire] = useState("");
  const [inputNom, setInputNom] = useState("");
  const [inputEnvoyeur, setInputEnvoyeur] = useState("");

  const [errMobileMess,setErrMobileMess] = useState(); // state pour l'erreur mobile
  const [errDestinataireMess, setErrDestinataireMess] = useState();
  const [errEnvoyeurMess, setErrEnvoyeurMess] = useState();
  const [errNomMess, setErrNomMess] = useState();

  const handleOnChangeDestinataire = (text) => {       //prend les valeurs saisi dans le champ destinataire
    setInputDestinataire(text);
  }

  const handleOnChangeEnvoyeur = (text) => {       //prend les valeurs saisi dans le champ destinataire
    setInputEnvoyeur(text);
  }

  const handleOnChangeNom = (text) => {       //prend les valeurs saisi dans le champ destinataire
    setInputNom(text);
  }

  const handleMobileError = (errorMessage) => {       //prend les etat de l'erreur dans le champ mobile
    setErrMobileMess(errorMessage);
  }

  const handleDestinataireError = (errorMessage) => {       //prend les etat de l'erreur l'email
    setErrDestinataireMess(errorMessage);
  }

  const handleEnvoyeurError = (errorMessage) => {       //prend les etat de l'erreur l'email
    setErrEnvoyeurMess(errorMessage);
  }

  const handleNomError = (errorMessage) => {       //prend les etat de l'erreur l'email
    setErrNomMess(errorMessage);
  }

const champ = () => {
    let valid = true;
    let reg_phone_number = /^(?:\+1)?\(?([2-9]{0,1}[0-9]{2})\)?[. -]?([0-9]{3})[.-]?([0-9]{4})$/

    if (!value){   // l'utilisateur ne complète pas le champ de la CARTE
        valid = false
        handleMobileError('Veuillez choisir un type mobile')      // l'utilisateur doit choisir un pays
      }

      if (!inputDestinataire) {                                          // si l'utilisateur ne complète pas le champ de l'EMAIL
        valid = false
        handleDestinataireError('Veuillez entrer le nom du destinataire')
    } else if (reg_phone_number.test(inputDestinataire)===false){
        valid = false
        handleDestinataireError('Veuillez entrer un email valide')
    }

    if (!inputEnvoyeur) {                                          // si l'utilisateur ne complète pas le champ de l'EMAIL
        valid = false
        handleEnvoyeurError("Entrer le numero de l'envoyeur")
    } else if (reg_phone_number.test(inputEnvoyeur)===false){
        valid = false
        handleEnvoyeurError('Veuillez entrer un numéro de téléphone')
    }

    if (!inputNom) {                                          // si l'utilisateur ne complète pas le champ de l'EMAIL
        valid = false
        handleNomError("Entrer le nom de l'envoyeur")
    }
      if (valid == true) {
        Alert.alert('Félicitation !!! Vôtre paiement a été effectué avec succès')
      };
}



    return (
      
      <View>
        <ScrollView>
        <Text style={styles.titre}>Paiement par mobile money</Text>
        
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}

          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Type mobile' : ''}
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

        <Text style={styles.label}>Destinataire</Text>
        <TextInput
          style={styles.input}
          keyboardType={'decimal-pad'}
          onChangeText={handleOnChangeDestinataire}
          placeholder='numero du destinataire'
          onFocus={() => {
            handleDestinataireError(null)
        }}
        >+261 34 04 259 36</TextInput>
        {errDestinataireMess && (
                <Text style={styles.error}>{errDestinataireMess}</Text>//affiche l'erreur s'il y en a
            )}

        <View style={styles.rowName}>
            <Text style={styles.label}>Nom</Text><Text style={styles.inputMontant}>Rakoto Francis</Text>
        </View>

        <Text style={styles.label}>Envoyeur</Text>
        <TextInput
          style={styles.input}
          keyboardType={'decimal-pad'}
          placeholder="numero de l'envoyeur"
          onChangeText={handleOnChangeEnvoyeur}
          onFocus={() => {
            handleEnvoyeurError(null)
        }}
        >+261 34 04 259 36</TextInput>
        {errEnvoyeurMess && (
                <Text style={styles.error}>{errEnvoyeurMess}</Text>//affiche l'erreur s'il y en a
            )}

    <View style={styles.rowName}>
      <Text style={styles.label}>Nom </Text>
        
        <TextInput
          style={styles.inputNom}
          onChangeText={handleOnChangeNom}
          onFocus={() => {
            handleNomError(null)
        }}
        />
    </View>
    <View style={styles.rowName}>
        <Text style={styles.label}>Montant</Text><Text style={styles.inputMontant}>Ar 80 000</Text>
   </View>  
      <View style={styles.buttonStyle}>
        <Button title='Payer' onPress={champ}/>
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