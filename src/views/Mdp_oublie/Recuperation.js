import React, {useState} from 'react';
import { Text, View, StyleSheet, ScrollView, SafeAreaView, Keyboard, ActivityIndicator } from 'react-native';
import Input from '../Composant/input';
import Button from '../Composant/bouton';
import design from './../Composant/couleur';
import { useTranslation } from 'react-i18next';
import { useRoute } from '@react-navigation/native';
import { useMutation } from '@apollo/client';
import { SEND_MAIL } from '../../hooks/mutation';
import AppStyles from '../../../styles/App_style';


function Recup({navigation}) {
    
    const {t} = useTranslation();
    const route = useRoute();

    const [inputs, setInputs] = React.useState({  //etat pour la validation
        email: ''
    });

    const [ send_mail, { loading, data, error }] = useMutation(SEND_MAIL, {
        onCompleted: (data) => {
            console.log('Code envoyé', data.send_mail.id);
            navigation.navigate('CodeRecup',{
                id:data.send_mail.id,
                mail:inputs.email,
                type:route.params.type,
                produit:route.params.produit,
                entreprise:route.params.entreprise,
                prix:route.params.prix,
                idPub:route.params.idPub,
                idEtp:route.params.idEtp,
                idProduit:route.params.idProduit
            })
        },
        onError: (error) => {
            console.log(JSON.stringify(error,null,2))
        },
        variables: {mail:inputs.email}
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
        if (valid == true) {
            send_mail();
        }
    };

    const handleOnChange = (text, input) => {       //prend les valeurs saisi aux input
        setInputs(prevState => ({...prevState, [input]: text}));
    }
    const handleError = (errorMessage, input) => {       //prend les etat de l'erreur
        setErrors(prevState => ({...prevState, [input]: errorMessage}));
    }

    if(loading) return (<ActivityIndicator size={'large'} color={design.Vert} style={AppStyles.loader}/>)
    
    return(
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scroll_view}>

                <Text style={styles.title}>{t('langues:forgotPassword')}</Text>
                <View style={styles.viewContain}>
                <Input 
                    placeholder={t('langues:enterEmail')}
                    error={errors.email}
                    onChangeText={text => handleOnChange(text, 'email')}
                    onFocus={() => {
                        handleError(null, 'email')
                    }}/>
                <Button title={t('langues:sending')} onPress={validate}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container : {
        flex:1
    },
    scroll_view : {
        paddingTop: 50,
        paddingHorizontal: 20
    },
    title : {
        color:design.Marron,
        fontSize: 28,
        fontWeight:'bold',
        textAlign:'center',
        fontFamily:design.police
    },
    viewContain : {
        marginVertical:20
    },
})

export default Recup;