import React, { useState } from 'react';
import {Text, View, StyleSheet, ScrollView, SafeAreaView, Image, Keyboard, Alert, TouchableOpacity} from 'react-native';
import Input from '../Composant/input';
import Button from '../Composant/bouton';
import ModifierImage from './../../../ProfileManagement/ProfileImg';
import { launchImageLibrary } from 'react-native-image-picker';
import design from './../Composant/couleur';
import { useTranslation } from 'react-i18next';

function SingIn({navigation}) {

    const {t} = useTranslation();
const [inputs, setInputs] = React.useState({  //etat pour la validation
    email: '',
    nom:'',
    prenom:'',
    phone:'',
    password:'',
    confirm:'',
    adresse:''
});
const [errors, setErrors] = React.useState({})    //etat pour l'erreur
const validate = () => { //fonction de validation des information
    Keyboard.dismiss(); //ferme le clavier quand on appui sur le boutton 'valider'
    let valid = true;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    if (!inputs.email){
        handleError(t('logSignIn:noEmail'), 'email')
        valid = false
    } else if (reg.test(inputs.email)===false){
        handleError(t('logSignIn:incorrectEmail'), 'email')
        valid = false
    };
    if (!inputs.nom){
        handleError(t('logSignIn:noName'), 'nom')
        valid = false
    };
    if (!inputs.prenom){
        handleError(t('logSignIn:noFirstname'), 'prenom')
        valid = false
    };
    if (!inputs.phone){
        handleError(t('logSignIn:noPhone'), 'phone')
        valid = false
    };
    if (!inputs.adresse){
        handleError(t('logSignIn:noAdress'), 'adresse')
        valid = false
    };
    if (!inputs.password){
        handleError(t('logSignIn:noPassword'), 'password')
        valid = false
    } else if (strongRegex.test(inputs.password)===false){
        valid = false
        handleError(t('logSignIn:neededPassword'), 'password')
    };
    if (!inputs.password){
        valid = false
        handleError(t('logSignIn:noPassword'), 'password')
    } else if (inputs.confirm != inputs.password){
        handleError(t('logSignIn:matchingPassword'), 'confirm')
        valid = false
    };
    if (valid == true) {
            Alert.alert("Vous êtes inscrit à l'application. Veuillez-vous connecter");
            navigation.navigate('LogIn');
    }
};

const handleOnChange = (text, input) => {       //prend les valeurs saisi aux input
    setInputs(prevState => ({...prevState, [input]: text}));
}
const handleError = (errorMessage, input) => {       //prend les etat de l'erreur
    setErrors(prevState => ({...prevState, [input]: errorMessage}));
}
const renderFileData = () => {
    if (fileData) {
      return <Image source={fileData}
      style={styles.image}
      />
    } else {
      return <Image source={require('../../../assets/MyImages/profil.jpg')}
      style={styles.image}
      />
    }
  }

  const launchNativeImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, (response) => {
      console.log('HERE IS THE RESPONSE = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ERROR !!!!!!!: ', response.error);
      } else {
        const source = { uri: response.assets.uri };
        console.log('SUCCESS !!!!!', JSON.stringify(response));
        setFileData(response.assets[0]);
      }
    })}


return(
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scroll_view}>
                <Text style={styles.title}>{t('logSignIn:titleSignIn')}</Text>
                
                <View style={styles.viewContain}>
                <Input 
                    placeholder={t('logSignIn:lastname')} 
                    error={errors.nom} 
                    onChangeText={text => handleOnChange(text, 'nom')}
                    onFocus={() => {
                        handleError(null, 'nom')
                    }}/>
                <Input 
                    placeholder={t('logSignIn:firstname')} 
                    error={errors.prenom}
                    onChangeText={text => handleOnChange(text, 'prenom')}
                    onFocus={() => {
                        handleError(null, 'prenom')
                    }}/>
                <Input 
                    placeholder={t('logSignIn:phone')}
                    error={errors.phone}
                    keyboardType = 'numeric' 
                    onChangeText={text => handleOnChange(text, 'phone')}
                    onFocus={() => {
                        handleError(null, 'phone')
                    }}/>
                <Input 
                    placeholder={t('logSignIn:adress')} 
                    error={errors.adresse}
                    onChangeText={text => handleOnChange(text, 'adresse')}
                    onFocus={() => {
                        handleError(null, 'adresse')
                    }}/>
                <Input 
                    placeholder={t('logSignIn:enterEmail')}
                    error={errors.email}
                    onChangeText={text => handleOnChange(text, 'email')}
                    onFocus={() => {
                        handleError(null, 'email')
                    }}/>
                <Input 
                    placeholder={t('logSignIn:password')}
                    error={errors.password}
                    password 
                    onChangeText={text => handleOnChange(text, 'password')}
                    onFocus={() => {
                        handleError(null, 'password')
                    }}/>
                <Input 
                    placeholder={t('logSignIn:confirmation')}
                    error={errors.confirm}
                    password 
                    onChangeText={text => handleOnChange(text, 'confirm')}
                    onFocus={() => {
                        handleError(null, 'confirm')
                    }}/>
                <Button title={t('logSignIn:signIn')} onPress={validate}/>
                <Text style={styles.other} onPress={() => navigation.navigate('LogIn')}>
                    {t('logSignIn:already')}
                </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container : {
        backgroundColor:'white',
        flex:1,
    },
    scroll_view : {
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    title : {
        color:design.Marron,
        fontSize: 30,
        fontWeight:'bold',
        textAlign:'center',
        fontFamily: design.police
    },
    viewContain : {
        marginVertical:20
    },
    other : {
        fontSize: 16,
        fontWeight:'bold',
        textAlign:'center',
        marginTop: '10%',
        marginBottom:100,
        color : design.Marron,
        textDecorationLine:'underline',
        fontFamily: design.police
    },
    image: {
        width: 150,
        height: 150, 
        alignSelf: 'center',
        borderRadius: 90,
        marginBottom: 10
      },
    plusIcon: {
      width: 30,
      height: 30,
      marginLeft: '60%',
      marginTop: '-12%',
      marginBottom: '10%',
      borderRadius: 30
    }
})

export default SingIn;