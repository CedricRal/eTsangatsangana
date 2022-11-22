import React from 'react';
import {Text, View, StyleSheet, ScrollView, SafeAreaView, Keyboard, Alert} from 'react-native';
import Input from '../Composant/input';
import Button from '../Composant/bouton';
import design from './../Composant/couleur';

function LogIn({navigation}) {
const [inputs, setInputs] = React.useState({  //etat pour la validation
    email: '',
    password:''
});
const [errors, setErrors] = React.useState({})    //etat pour l'erreur
const validate = () => { //fonction de validation des information
    Keyboard.dismiss(); //ferme le clavier quand on appui sur le boutton 'valider'
    let valid = true;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    if (!inputs.email){
        handleError('Entrer votre e-mail svp!', 'email')
        valid = false
    } else if (reg.test(inputs.email)===false){
        handleError('Entrer un e-mail correct svp!', 'email')
        valid = false
    };
    if (!inputs.password){
        handleError('Entrer votre mot de passe svp!', 'password')
        valid = false
    } else if (strongRegex.test(inputs.password)===false){
        handleError('Mot de passe incorrect', 'password')
        valid = false
    };
    if (valid == true) {
        navigation.navigate('PaymentCommand')
    }
};

const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('email')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
    }
  };


const handleOnChange = (text, input) => {       //prend les valeurs saisi aux input
    setInputs(prevState => ({...prevState, [input]: text}));
}
const handleError = (errorMessage, input) => {       //prend les etat de l'erreur
    setErrors(prevState => ({...prevState, [input]: errorMessage}));
}
    return(
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scroll_view}>
                <Text style={styles.title}>Connexion</Text>
                <View style={styles.viewContain}>
                <Input 
                    placeholder='E-mail' 
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
                <Text style={styles.other2} onPress={() => navigation.navigate('Recup')}>
                    Mot de passe oublié?
                </Text>
                <Button title="Se connecter" onPress={validate}/>
                <Text style={styles.other} onPress={ () => navigation.navigate('SingIn')}>
                    Créer un compte?
                </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container : {
        backgroundColor:'white',
        flex:1
    },
    scroll_view : {
        paddingTop: 50,
        paddingHorizontal: 20
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
        fontSize: 18,
        fontWeight:'bold',
        textAlign:'center',
        marginVertical: '10%',
        color:'black',
        fontFamily: design.police
    },
    other2 : {
        fontSize: 16,
        fontWeight:'bold',
        textAlign:'center',
        marginVertical: '5%',
        color : design.Marron,
        textDecorationLine:'underline',
        fontFamily: design.police
    }
})

export default LogIn;