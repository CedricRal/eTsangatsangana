import React, { useState } from 'react';
import {Text, View, StyleSheet, ScrollView, SafeAreaView, Image, Keyboard, Alert, TouchableOpacity} from 'react-native';
import Input from '../Composant/input';
import Button from '../Composant/bouton';
import ModifierImage from './../../../ProfileManagement/ProfileImg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';

function SingIn({navigation}) {

const [fileData, setFileData] = useState(null);
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
        handleError('Entrer votre email svp!', 'email')
        valid = false
    } else if (reg.test(inputs.email)===false){
        handleError('Entrer un email correct svp!', 'email')
        valid = false
    };
    if (!inputs.nom){
        handleError('Entrer votre nom svp!', 'nom')
        valid = false
    };
    if (!inputs.prenom){
        handleError('Entrer votre prénom svp!', 'prenom')
        valid = false
    };
    if (!inputs.phone){
        handleError('Entrer votre numéro téléphone svp!', 'phone')
        valid = false
    };
    if (!inputs.adresse){
        handleError('Entrer votre adresse svp!', 'adresse')
        valid = false
    };
    if (!inputs.password){
        handleError('Entrer votre mot de passe svp!', 'password')
        valid = false
    } else if (strongRegex.test(inputs.password)===false){
        valid = false
        handleError('Le mot de passe doit comporté 8 caractères comprenant des majuscules, des minuscules, des chiffres et des caractères spéciaux', 'password')
    };
    if (!inputs.password){
        valid = false
        handleError('Entrer votre mot de passe svp!', 'password')
    } else if (inputs.confirm != inputs.password){
        handleError('Mot de passe ne correspond pas', 'confirm')
        valid = false
    };
    if (valid == true) {
            Alert.alert("Vous êtes inscrit à l'application. Veuillez-vous connecter");
            navigation.navigate('LogIn');
            prevState => ({...prevState, [inputs]: ''});

            storeData = async (inputs) => {
                try {
                  const jsonValue = JSON.stringify(inputs)
                  await AsyncStorage.setItem('email', jsonValue)
                } catch (e) {
                  // saving error
                }
              };
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
                <Text style={styles.title}>S'inscrire</Text>
                <Text style={styles.description}>Entrer votre information</Text>
                {renderFileData()}
                <View>
                <TouchableOpacity onPress={() => {
                launchNativeImageLibrary()}} >
                <Image style={styles.plusIcon}
                  source={require('../../../assets/MyImages/plus.jpg')}
                />
            </TouchableOpacity>
            </View>
                <View style={styles.viewContain}>
                <Input 
                    placeholder='Nom' 
                    error={errors.nom} 
                    onChangeText={text => handleOnChange(text, 'nom')}
                    onFocus={() => {
                        handleError(null, 'nom')
                    }}/>
                <Input 
                    placeholder='Prénom' 
                    error={errors.prenom}
                    onChangeText={text => handleOnChange(text, 'prenom')}
                    onFocus={() => {
                        handleError(null, 'prenom')
                    }}/>
                <Input 
                    placeholder='Numéro Téléphone'
                    error={errors.phone}
                    keyboardType = 'numeric' 
                    onChangeText={text => handleOnChange(text, 'phone')}
                    onFocus={() => {
                        handleError(null, 'phone')
                    }}/>
                <Input 
                    placeholder='Adresse' 
                    error={errors.adresse}
                    onChangeText={text => handleOnChange(text, 'adresse')}
                    onFocus={() => {
                        handleError(null, 'adresse')
                    }}/>
                <Input 
                    placeholder='Entrer votre Email'
                    error={errors.email}
                    onChangeText={text => handleOnChange(text, 'email')}
                    onFocus={() => {
                        handleError(null, 'email')
                    }}/>
                <Input 
                    placeholder='Mot de passe'
                    error={errors.password}
                    password 
                    onChangeText={text => handleOnChange(text, 'password')}
                    onFocus={() => {
                        handleError(null, 'password')
                    }}/>
                <Input 
                    placeholder='Confirmation de mot de passe'
                    error={errors.confirm}
                    password 
                    onChangeText={text => handleOnChange(text, 'confirm')}
                    onFocus={() => {
                        handleError(null, 'confirm')
                    }}/>
                <Button title="S'inscrire" onPress={validate}/>
                <Text style={styles.other} onPress={() => navigation.navigate('LogIn')}>
                    Vous avez déjà un compte?
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
        color:'black',
        fontSize: 38,
        fontWeight:'bold',
        textAlign:'center'
    },
    viewContain : {
        marginVertical:20
    },
    description : {
        color:'black',
        fontSize: 16,
        marginVertical: 10,
        textAlign: 'center'
    },
    other : {
        fontSize: 18,
        fontWeight:'bold',
        textAlign:'center',
        marginBottom:100
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