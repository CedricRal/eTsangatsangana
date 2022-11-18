import { Text, View, StyleSheet, TextInput, ScrollView, Image, Button, Alert} from 'react-native';
import React, { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';


export default function Carte({navigation}) {

  const [data, setData] = useState([
    { label: 'Madagascar', value: '1' },
    { label: 'Italie', value: '2' },
    { label: 'Espagne', value: '3' },
    { label: 'Portugal', value: '4' },
    { label: 'Chine', value: '5' },
    { label: 'Australie', value: '6' },
    { label: 'Tunisie', value: '7' },
    { label: 'Russie', value: '8' },
    { label: 'Maroc', value: '9' },
    { label: 'Australie', value: '10' },
    { label: 'France', value: '11' },
    { label: 'Egypte', value: '12' },
  ]);

  const [value, setValue] = useState(null); // Les valeurs dans le dropdown
  const [errCountryMess,setErrCountryMess] = useState();

  const [isFocus, setIsFocus] = useState(false);

  const [errMess, setErrMess] = useState(); // state pour l'erreur de l'email
  const [errCardMess, setErrCardMess] = useState(); // state pour l'erreur de la carte 
  const [errExpMess, setErrExpMess] = useState(); // state pour l'erreur de la date d'expiration
  const [errCvcMess, setErrCvcMess] = useState(); // state pour l'erreur du cvc
  const [errTitulaireMess, setErrTitulaireMess] = useState(); // state pour l'erreur du cvc
  
  
  const [input, setInputs] = useState(""); // state pour l'email
  const [inputCard, setInputCard] = useState(null); // state pour la carte
  const [inputExp, setInputExp] = useState(null); // state pour la date d'expiration
  const [inputCvc, setInputCvc] = useState(null); // state pour le Cvc
  const [inputTitulaire, setInputTitulaire] = useState(null);

  const handleOnChange = (text) => {       //prend les valeurs saisi de l'email
    setInputs(text);
  }

  const handleOnChangeCard = (text) => {       //prend les valeurs saisi de la carte
    setInputCard(text);
  }

  const handleOnChangeExp = (text) => {       //prend les valeurs saisi de la date d'expiration
    setInputExp(text);
  }

  const handleOnChangeCvc = (text) => {       //prend les valeurs saisi de la date d'expiration
    setInputCvc(text);
  }

  const handleOnChangeTitulaire = (text) => {       //prend les valeurs saisi de la date d'expiration
    setInputTitulaire(text);
  }


  const handleError = (errorMessage) => {       //prend les etat de l'erreur l'email
    setErrMess(errorMessage);
  }

  const handleCardError = (errorMessage) => {       //prend les etat de l'erreur de la carte
    setErrCardMess(errorMessage);
  }

  const handleExpError = (errorMessage) => {       //prend les etat de l'erreur de la date d'expiration
    setErrExpMess(errorMessage);
  }

  const handleCvcError = (errorMessage) => {       //prend les etat de l'erreur du cvc
    setErrCvcMess(errorMessage);
  }

  const handleTitulaireError = (errorMessage) => {       //prend les etat de l'erreur du cvc
    setErrTitulaireMess(errorMessage);
  }

  const handleCountryError = (errorMessage) => {       //prend les etat de l'erreur du cvc
    setErrCountryMess(errorMessage);
  }

const champ = () => {
    let valid = true;
    let reg_email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;     // regex de l'email
    let reg_carte = /(\d{4}[-\s]?){3}\d{4}/;                         // regex de  la carte
    let reg_exp = /^(0?[1-9]{1}|1[0-2]{1})\/([0-9]{2})$/;               // regex de la date d'expiration
    let reg_cvc = /^[0-9]{3,4}$/;                                      // regex du cvc
    

    if (!input) {                                          // si l'utilisateur ne complète pas le champ de l'EMAIL
      valid = false
      handleError('Entrer vôtre email')
  } else if (reg_email.test(input)===false){
      valid = false
      handleError('Veuillez entrer un email valide')
  }

    if (!inputCard){                                                // l'utilisateur ne complète pas le champ de la CARTE
      valid = false
      handleCardError('Veuillez completer le champ de la carte ')
  } else if (reg_carte.test(inputCard)===false){                  // champ de la carte
    valid = false
      handleCardError('code carte non valide')
  };
  
  if (!inputExp){                                                // l'utilisateur ne complète pas le champ de la CARTE
    valid = false
    handleExpError("Veuillez completer la date d'expiration de la carte")
  }else if (reg_exp.test(inputExp)===false) { // champ de la date d'expiration
    valid = false
    handleExpError("date d'expiration incorrect")

  }; 
  
  if (!inputCvc){                                                // l'utilisateur ne complète pas le champ de la CARTE
    valid = false
    handleCvcError('Veuillez completer le CVC')
  }else if (reg_cvc.test(inputCvc)===false){ // champ du cvc
    valid = false
    handleCvcError('CVC non valide')

};


if (!inputTitulaire) {
  valid = false
  handleTitulaireError('Entrer le nom du titulaire')
}

if (!value){                                                // l'utilisateur ne complète pas le champ de la CARTE
  valid = false
  handleCountryError('Veuillez choisir un pays')      // l'utilisateur doit choisir un pays
}
  
  if (valid == true) {
    navigation.navigate('resum_commande',
    {
      carte: 'paiement par carte',
      nom: inputTitulaire,
    })
  };

}


    return (
      
      <View>
        <ScrollView>
        <Text style={styles.titre}>Paiement par carte</Text>
        
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          keyboardType={'email-address'}
          onChangeText={handleOnChange}
          onFocus={() => {
            handleError(null)
        }}
        />
        {errMess && (
                <Text style={styles.errorMess}>{errMess}</Text>//affiche l'erreur s'il y en a
            )}

        <Text style={styles.label}>Information de la carte</Text>
        
      <View style={styles.inputCardContainer}>
        <TextInput
          style={styles.inputCard}
          placeholder='xxxx xxxx xxxx xxxx'
          maxLength={16}
          keyboardType={'decimal-pad'}
          onChangeText={handleOnChangeCard}
          onFocus={() => {
            handleCardError(null)
        }}
        />
        <View style={styles.imageCardJustified}>
          <Image source={require('../assets/MyImages/card.png')} style={styles.cardImage}/>
          <Image source={require('../assets/MyImages/visa.png')} style={styles.cardImage}/>
          <Image source={require('../assets/MyImages/paypal.png')} style={styles.cardImage}/>
          <Image source={require('../assets/MyImages/unionpay.png')} style={styles.cardImage}/>
        </View>
      </View>

      <View style={styles.coteAcote}>
        <TextInput
          style={styles.expiration_de_la_carte}
          placeholder='MM/AA'
          maxLength={5}
          keyboardType={'phone-pad'}
          onChangeText={handleOnChangeExp}
          onFocus={() => {
            handleExpError(null)
        }}
        />
        <View style={styles.cvcEtIcon}>
        <TextInput
          style={styles.cvc}
          placeholder='CVC'
          onChangeText={handleOnChangeCvc}
          keyboardType={'decimal-pad'}
          maxLength={3}
          onFocus={() => {
            handleCvcError(null)
        }}
        />
        <Image source={require('../assets/MyImages/cvc.png')} style={styles.cvcImage}/>
        </View>
      </View>

      {errCardMess && (
                <Text style={styles.errorMess}>{errCardMess}</Text>//affiche l'erreur s'il y en a
            )}
      {errExpMess && (
                <Text style={styles.errorMess}>{errExpMess}</Text>//affiche l'erreur s'il y en a
            )}
      {errCvcMess && (
                <Text style={styles.errorMess}>{errCvcMess}</Text>//affiche l'erreur s'il y en a
            )}

      <Text style={styles.label}>Nom du titulaire de la carte</Text>
        
        <TextInput
          style={styles.input}
          onChangeText={handleOnChangeTitulaire}
          onFocus={() => {
            handleTitulaireError(null)
        }}
        />

      {errTitulaireMess && (
                <Text style={styles.errorMess}>{errTitulaireMess}</Text>//affiche l'erreur s'il y en a
            )}

        <Text style={styles.label}>Pays ou région</Text>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          containerStyle={{top:'45%', marginBottom: '30%', backgroundColor: 'whitesmoke', height: '20%'}}

          iconStyle={{marginRight: '1%', width: '10%'}}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? '' : ''}
          value={value}
          onFocus={() => {handleCountryError(null),setIsFocus(true)}}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
        />

          {errCountryMess && (
                <Text style={styles.errorMess}>{errCountryMess}</Text>//affiche l'erreur s'il y en a
          )}
      

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

  label: {
    fontSize: 16,
    marginLeft: '10%',
    marginBottom: '1%',
    marginTop: '7%',
    fontWeight: 'bold',
  },

  input: {
    fontSize: 16,
    width: '80%',
    alignSelf: 'center',
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    paddingLeft: '2%',
    overflow: 'hidden',
  },

  inputCardContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: '80%',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8, 
    borderWidth: StyleSheet.hairlineWidth,
  },

  inputCard: {
    fontSize: 16,
    width: '60%'
  },

  cardImage: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    margin: '3%',
  },

  cvcImage: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginRight: '5%',
    marginLeft: '50%',
  },

  cvcEtIcon: {
    flexDirection: 'row',
    width: '35%',
    borderBottomRightRadius: 8, 
    borderWidth: StyleSheet.hairlineWidth,
  },

  imageCardJustified: {
    flexDirection: 'row',
    width: '40%',
    alignSelf: 'center',
  },

  coteAcote: {
    flexDirection: 'row',
    alignSelf: 'center',
  },

  cvc: {
    fontSize: 16,
    width: '30%',
    paddingLeft: '2%'
  },

  expiration_de_la_carte: {
    fontSize: 16,
    width: '45%',
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomLeftRadius: 8,
    paddingLeft: '2%',
  },

  dropdown: {
    height: 50,
    borderColor: 'gray',
    width: '80%',
    alignSelf: 'center',
    paddingLeft: '2%',
    borderColor: 'gray',
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
  },

  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },

  buttonStyle: {
    width: '25%',
    alignSelf: 'center',
    marginBottom: '10%',
    marginTop: '10%',
  },

  errorMess: {
    color: 'red',
     marginLeft: '10%'
  },

});