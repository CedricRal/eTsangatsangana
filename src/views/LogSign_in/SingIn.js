import React, { useState } from 'react';
import {Text, View, StyleSheet, ScrollView, SafeAreaView, Keyboard, Alert, TouchableOpacity} from 'react-native';
import Input from '../Composant/input';
import Button from '../Composant/bouton';

function SingIn({navigation}) {
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
        handleError('Entrer votre numéro télephone svp!', 'phone')
        valid = false
    };
    if (!inputs.adresse){
        handleError('Entrer votre prénom svp!', 'adresse')
        valid = false
    };
    if (!inputs.password){
        handleError('Entrer votre mot de passe svp!', 'password')
        valid = false
    } else if (strongRegex.test(inputs.password)===false){
        handleError('Le mot de passe doit comporté 8 caractères comprenant des majuscules, des minuscules, des chiffres et des caractères spéciaux', 'password')
    };
    if (!inputs.password){
        
        valid =handleError('Entrer votre mot de passe svp!', 'password')
    } else if (inputs.confirm != inputs.password){
        handleError('Mot de passe ne correspond pas', 'confirm')
        valid = false
    };
    if (valid == true) {
        register = () => {
            Alert.alert("Vous êtes inscrit à l'application. Veuillez-vous connecter")
            navigation.navigate('Profil')
        }
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
                <Text style={styles.title}>S'inscrire</Text>
                <Text style={styles.description}>Entrer votre information</Text>
                
                <View style={styles.viewContain}>
                <Input 
                    placeholder='Entrer votre Nom' 
                    error={errors.nom} 
                    onChangeText={text => handleOnChange(text, 'nom')}
                    onFocus={() => {
                        handleError(null, 'nom')
                    }}/>
                <Input 
                    placeholder='Entrer votre Prénom' 
                    error={errors.prenom}
                    onChangeText={text => handleOnChange(text, 'prenom')}
                    onFocus={() => {
                        handleError(null, 'prenom')
                    }}/>
                <Input 
                    placeholder='Entrer votre Numéro télephone'
                    error={errors.phone}
                    keyboardType = 'numeric' 
                    onChangeText={text => handleOnChange(text, 'phone')}
                    onFocus={() => {
                        handleError(null, 'phone')
                    }}/>
                <Input 
                    placeholder='Entrer votre adresse' 
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
                    placeholder='Entrer votre Mot de passe'
                    error={errors.password}
                    password 
                    onChangeText={text => handleOnChange(text, 'password')}
                    onFocus={() => {
                        handleError(null, 'password')
                    }}/>
                <Input 
                    placeholder='confirmer votre Mot de passe'
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
        flex:1
    },
    scroll_view : {
        paddingTop: 50,
        paddingHorizontal: 20
    },
    title : {
        color:'black',
        fontSize: 40,
        fontWeight:'bold'
    },
    viewContain : {
        marginVertical:20
    },
    description : {
        color:'black',
        fontSize: 18,
        marginVertical: 10
    },
    other : {
        fontSize: 18,
        fontWeight:'bold',
        textAlign:'center',
        marginBottom:100
    }
})

export default SingIn;