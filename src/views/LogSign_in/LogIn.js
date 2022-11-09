import React from 'react';
import {Text, View, StyleSheet, ScrollView, SafeAreaView, Keyboard, Alert} from 'react-native';
import Input from '../Composant/input';
import Button from '../Composant/bouton';

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
        handleError('Entrer votre email svp!', 'email')
        valid = false
    } else if (reg.test(inputs.email)===false){
        handleError('Entrer un email correct svp!', 'email')
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
        navigation.navigate('DetailsCommand')
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
                <Text style={styles.title}>Se connecter</Text>
                <Text style={styles.description}>Entrer votre information</Text>
                <View style={styles.viewContain}>
                <Input 
                    placeholder='Email' 
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
                <Text style={styles.other} onPress={() => navigation.navigate('Recup')}>
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
        marginBottom:10
    }
})

export default LogIn;