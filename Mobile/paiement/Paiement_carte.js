import { Text, View, StyleSheet, TextInput, ScrollView, Image, Alert} from 'react-native';
import React, { useState, useRef } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { useTranslation } from 'react-i18next';
import Button from '../src/views/Composant/bouton';
import design from '../src/views/Composant/couleur';
import { useRoute } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list';

export default function Carte({navigation}) {
  const {t} = useTranslation();
  const route = useRoute();

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
  const [isFocused, setIsFocused] = useState(false);
  const [isFocus1, setIsFocus1] = useState(false);
  const [isFocus2, setIsFocus2] = useState(false);

  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();

  const [value, setValue] = useState(null); // Les valeurs dans le dropdown
  const [errCountryMess,setErrCountryMess] = useState();

  const [isFocus, setIsFocus] = useState(false);

  const [errMess, setErrMess] = useState(); // state pour l'erreur de l'email
  const [errCardMess, setErrCardMess] = useState(); // state pour l'erreur de la carte 
  const [errExpMess, setErrExpMess] = useState(); // state pour l'erreur de la date d'expiration
  const [errCvcMess, setErrCvcMess] = useState(); // state pour l'erreur du cvc
  const [errTitulaireMess, setErrTitulaireMess] = useState(); // state pour l'erreur du cvc
  
  
  const [input, setInputs] = useState(""); // state pour l'email
  const [inputCard1, setInputCard1] = useState(); // state pour la carte
  const [inputCard2, setInputCard2] = useState(); // state pour la carte
  const [inputCard3, setInputCard3] = useState(); // state pour la carte
  const [inputCard4, setInputCard4] = useState(); // state pour la carte
  const [inputExp, setInputExp] = useState(null); // state pour le mois d'expiration
  const [inputExpY, setInputExpY] = useState(null); // state pour le mois d'expiration
  const [inputCvc, setInputCvc] = useState(null); // state pour le Cvc
  const [inputTitulaire, setInputTitulaire] = useState(null);

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

  const handleOnChange = (text) => {       //prend les valeurs saisi de l'email
    setInputs(text);
  }

  const handleOnChangeCard1 = (text) => {       //prend les valeurs saisi de la carte
    setInputCard1(text);
  }

  const handleOnChangeCard2 = (text) => {       //prend les valeurs saisi de la carte
    setInputCard2(text);
  }

  const handleOnChangeCard3 = (text) => {       //prend les valeurs saisi de la carte
    setInputCard3(text);
  }

  const handleOnChangeCard4 = (text) => {       //prend les valeurs saisi de la carte
    setInputCard4(text);
  }

  const handleOnChangeExp = (text) => {       //prend les valeurs saisi du mois d'expiration
    if(text>12){setInputExp(null);}
    else{setInputExp(text);}
  }

  const handleOnChangeExpY = (text) => {       //prend les valeurs saisi de la date d'expiration
    setInputExpY(text);
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
      handleError(t('langues:enterEmail'))
  } else if (reg_email.test(input)===false){
      valid = false
      handleError(t('langues:correctEmail'))
  }

    if (!inputCard1 || !inputCard2 || !inputCard3 || !inputCard4){                                                // l'utilisateur ne complète pas le champ de la CARTE
      valid = false
      handleCardError(t('langues:cardField'))
  } else if (reg_carte.test(inputCard1+inputCard2+inputCard3+inputCard4)===false){                  // champ de la carte
    valid = false
      handleCardError(t('langues:incorrectCode'))
  };
  
  if (!inputExp || !inputExpY){                                                // l'utilisateur ne complète pas le champ de la CARTE
    valid = false
    handleExpError(t('langues:expiration'))
  }
  
  if (!inputCvc){                                                // l'utilisateur ne complète pas le champ de la CARTE
    valid = false
    handleCvcError(t('langues:cvc'))
  }else if (reg_cvc.test(inputCvc)===false){ // champ du cvc
    valid = false
    handleCvcError(t('langues:incorrectCvc'))

};


if (!inputTitulaire) {
  valid = false
  handleTitulaireError(t('langues:noName'))
}

if (!value){                                                // l'utilisateur ne complète pas le champ de la CARTE
  valid = false
  handleCountryError(t('langues:noCountry'))      // l'utilisateur doit choisir un pays
}
  
  if (valid == true) {
    navigation.navigate('resum_commande', {information})
  };

}


    return (
      
      <View>
        <ScrollView>
        
        <Text style={styles.label}>{t('langues:email')}</Text>
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

        <Text style={styles.label}>{t('langues:information')}</Text>
        
      <View style={[styles.inputCardContainer, {borderBottomWidth:0}, isFocus2 && { borderColor: design.Vert }]}>
        <TextInput
          style={styles.inputCard}
          placeholder='xxxx'
          maxLength={4}
          ref={firstInput}
          keyboardType={'decimal-pad'}
          onChangeText={text => {
            handleOnChangeCard1(text);
            text.length==4 && secondInput.current.focus()}}
          onFocus={() => {
            handleCardError(null),setIsFocus2(true)
          }}
          onBlur={() => setIsFocus2(false)}
        />
        <TextInput
          style={styles.inputCard}
          placeholder='xxxx'
          maxLength={4}
          ref={secondInput}
          keyboardType={'decimal-pad'}
          onChangeText={text => {
            handleOnChangeCard2(text);
            if(text.length==4){thirdInput.current.focus()}
            else if(!text){firstInput.current.focus()}}}
          onFocus={() => {
            handleCardError(null),setIsFocus2(true)
          }}
          onBlur={() => setIsFocus2(false)}
        />
        <TextInput
          style={styles.inputCard}
          placeholder='xxxx'
          maxLength={4}
          ref={thirdInput}
          keyboardType={'decimal-pad'}
          onChangeText={text => {
            handleOnChangeCard3(text);
            if(text.length==4){fourthInput.current.focus()}
            else if(!text){secondInput.current.focus()}}}
          onFocus={() => {
            handleCardError(null),setIsFocus2(true)
          }}
          onBlur={() => setIsFocus2(false)}
        />
        <TextInput
          style={styles.inputCard}
          placeholder='xxxx'
          maxLength={4}
          ref={fourthInput}
          keyboardType={'decimal-pad'}
          onChangeText={text => {
            handleOnChangeCard4(text);
            (!text) && thirdInput.current.focus()}}
          onFocus={() => {
            handleCardError(null),setIsFocus2(true)
          }}
          onBlur={() => setIsFocus2(false)}
        />
        <View style={styles.imageCardJustified}>
          <Image source={require('../assets/MyImages/card.png')} style={styles.cardImage}/>
          <Image source={require('../assets/MyImages/visa.png')} style={styles.cardImage}/>
          <Image source={require('../assets/MyImages/paypal.png')} style={styles.cardImage}/>
          <Image source={require('../assets/MyImages/unionpay.png')} style={styles.cardImage}/>
        </View>
      </View>

      <View style={styles.coteAcote}>
        <View style={[styles.date, isFocus2 && { borderColor: design.Vert }]}>
        <TextInput
          style={styles.expiration_de_la_carte}
          placeholder='MM'
          value={inputExp}
          maxLength={2}
          keyboardType={'phone-pad'}
          onChangeText={handleOnChangeExp}
          onFocus={() => {
            handleExpError(null),setIsFocus2(true)
          }}
          onBlur={() => setIsFocus2(false)}
        />
        <Text style={styles.slash}>/</Text>
        <TextInput
          style={styles.expiration_de_la_carte}
          placeholder='AA'
          maxLength={2}
          keyboardType={'phone-pad'}
          onChangeText={handleOnChangeExpY}
          onFocus={() => {
            handleExpError(null),setIsFocus2(true)
          }}
          onBlur={() => setIsFocus2(false)}
        />
        </View>
        <View style={[styles.cvcEtIcon, isFocus2 && { borderColor: design.Vert }]}>
        <TextInput
          style={styles.cvc}
          placeholder='CVC'
          onChangeText={handleOnChangeCvc}
          keyboardType={'decimal-pad'}
          maxLength={3}
          onFocus={() => {
            handleCvcError(null),setIsFocus2(true)
          }}
          onBlur={() => setIsFocus2(false)}
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

      <Text style={styles.label}>{t('langues:owner')}</Text>
        
        <TextInput
          style={[styles.input, isFocus1 && { borderColor: design.Vert }]}
          onChangeText={handleOnChangeTitulaire}
          onFocus={() => {
            handleTitulaireError(null),setIsFocus1(true)
          }}
          onBlur={() => setIsFocus1(false)}
        />

      {errTitulaireMess && (
                <Text style={styles.errorMess}>{errTitulaireMess}</Text>//affiche l'erreur s'il y en a
            )}

        <Text style={styles.label}>{t('langues:country')}</Text>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: design.Vert }]}
          containerStyle={{ backgroundColor: 'whitesmoke'}}

          iconStyle={{marginRight: '1%', width: '10%'}}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          dropdownPosition='bottom'
          data={data}
          maxHeight={150}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? '' : ''}
          value={value}
          inverted={false}
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
    marginBottom: '10%',
    color: 'black',
  },

  label: {
    fontSize: 16,
    marginLeft: '10%',
    marginBottom: '1%',
    marginTop: '7%',
    fontWeight: 'bold',
    color:'black',
  },

  input: {
    fontSize: 16,
    height: '8%',
    width: '80%',
    alignSelf: 'center',
    borderColor: design.Marron,
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: '2%',
    overflow: 'hidden',
  },

  inputCardContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    height: '8%',
    width: '80%',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8, 
    borderWidth: 1,
    borderColor: design.Marron,
  },

  inputCard: {
    fontSize: 16,
    width: '15%',
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
    height: '80%',
    width: '35%',
    borderBottomRightRadius: 8, 
    borderWidth: 1,
    borderColor: design.Marron,
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
    paddingLeft: '2%',
    width:'40%',
    textAlign:'center'
  },

  dropdown: {
    height: 50,
    width: '80%',
    alignSelf: 'center',
    paddingLeft: '2%',
    borderColor: design.Marron,
    borderRadius: 8,
    borderStartWidth: 1,
    borderEndWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderWidth: 1,
    marginBottom:50
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
    marginBottom: '20%',
    marginTop: '10%',
  },
  slash: {
    textAlignVertical:'center',
    fontSize: 34,
    fontWeight:'bold',
    marginBottom:8,
  },
  errorMess: {
    color: 'red',
     marginLeft: '10%'
  },
  date: {
    borderWidth: 1,
    flexDirection: 'row',
    height: '80%',
    width: '45%',
    borderBottomLeftRadius: 8,
    borderRightWidth:0,
    borderColor: design.Marron,
  }
});