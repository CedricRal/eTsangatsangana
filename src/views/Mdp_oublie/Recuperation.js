import React from 'react';
import {Text, View, StyleSheet, ScrollView, SafeAreaView, Keyboard, Alert} from 'react-native';
import Input from '../Composant/input';
import Button from '../Composant/bouton';

function Recup({navigation}) {
const [inputs, setInputs] = React.useState({  //etat pour la validation
    email: ''
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
    if (valid == true) {
        Alert.alert('Code de confirmation envoyé')
        navigation.navigate('CodeRecup')
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
                <Text style={styles.title}>Mot de passe oublié</Text>
                <Text style={styles.description}>Entrer votre Email pour envoyer le code de récupération </Text>
                <View style={styles.viewContain}>
                <Input 
                    placeholder='Entrer votre Email'
                    error={errors.email}
                    onChangeText={text => handleOnChange(text, 'email')}
                    onFocus={() => {
                        handleError(null, 'email')
                    }}/>
                <Button title="Envoyer" onPress={validate}/>
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
        fontSize: 18,
        marginVertical: 10,
        textAlign:'center'
    }
})

export default Recup;