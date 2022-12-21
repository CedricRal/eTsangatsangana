import React from 'react';
import {Text, View, StyleSheet, ScrollView, SafeAreaView, Keyboard } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Input from '../Composant/input';
import Button from '../Composant/bouton';
import design from './../Composant/couleur';
import { useTranslation } from 'react-i18next';

function LogIn({navigation}) {
    const {t} = useTranslation();
    const route = useRoute();
    const type = route.params.type;
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
        handleError(t('langues:noEmail'), 'email')
        valid = false
    } else if (reg.test(inputs.email)===false){
        handleError(t('langues:incorrectEmail'), 'email')
        valid = false
    };
    if (!inputs.password){
        handleError(t('langues:noPassword'), 'password')
        valid = false
    } else if (strongRegex.test(inputs.password)===false){
        handleError(t('langues:incorrectPassword'), 'password')
        valid = false
    };
    if (valid == true) {
        navigation.navigate('detailCmd',{type:type})
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
                <Text style={styles.title}>{t('langues:titleLogIn')}</Text>
                <View style={styles.viewContain}>
                <Input 
                    placeholder={t('langues:email')} 
                    error={errors.email}
                    onChangeText={text => handleOnChange(text, 'email')}
                    onFocus={() => {
                        handleError(null, 'email')
                    }}/>
                <Input 
                    placeholder={t('langues:password')} 
                    error={errors.password}
                    password 
                    onChangeText={text => handleOnChange(text, 'password')}
                    onFocus={() => {
                        handleError(null, 'password')
                    }}/>
                <Text style={styles.other2} onPress={() => navigation.navigate('Recup')}>
                    {t('langues:forgot')}
                </Text>
                <Button title={t('langues:logIn')} onPress={validate}/>
                <Text style={styles.other} onPress={ () => navigation.navigate('SingIn',{type:type})}>
                    {t('langues:create')}
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