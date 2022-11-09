import React, { useState } from 'react';
import {Text, View, StyleSheet, ScrollView, SafeAreaView, Keyboard, Alert, TouchableOpacity} from 'react-native';
import Input from '../Composant/input';
import Button from '../Composant/bouton';

function NewPass({navigation}) {
const [inputs, setInputs] = React.useState({  //etat pour la validation
    password:'',
    confirm:'',
});
const [errors, setErrors] = React.useState({})    //etat pour l'erreur
const validate = () => { //fonction de validation des information
    Keyboard.dismiss(); //ferme le clavier quand on appui sur le boutton 'valider'
    let valid = true;
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
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
        register()
    }
};

const register = () => {
        Alert.alert("Récupération réussi")
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
                <Text style={styles.title}>Mot de passe oublié</Text>
                <Text style={styles.description}>Entrer un nouveau Mot de passe pour terminer la récupération</Text>                
                <View style={styles.viewContain}>
                <Input 
                    placeholder='Entrer votre nouveau Mot de passe'
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
                <Button title="Continuer" onPress={validate}/>
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
    }
})

export default NewPass;