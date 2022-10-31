import React from 'react';
import {Text, View, StyleSheet, ScrollView, SafeAreaView, Keyboard, Alert} from 'react-native';
import Input from '../Composant/input';
import Button from '../Composant/bouton';

function CodeRecup({navigation}) {
const [inputs, setInputs] = React.useState({  //etat pour la validation
    code: ''
});
const [errors, setErrors] = React.useState({})    //etat pour l'erreur
const validate = () => { //fonction de validation des information
    Keyboard.dismiss(); //ferme le clavier quand on appui sur le boutton 'valider'
    let valid = true;
    if (!inputs.code){
        handleError('Entrer le code svp!', 'code')
        valid = false
    } else if (inputs.code<6){
        handleError('Entrer un code correct svp!', 'code')
        valid = false
    };
    if (valid == true) {
        navigation.navigate('NewPass')
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
                <Text style={styles.description}>Veuillez entrer le code de récupération qui vous-êtes envoyé par Email</Text>
                <View style={styles.viewContain}>
                <Input 
                    keyboardType = 'numeric'
                    placeholder='Entrer le code de récupération'
                    error={errors.code}
                    onChangeText={text => handleOnChange(text, 'code')}
                    onFocus={() => {
                        handleError(null, 'code')
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

export default CodeRecup;