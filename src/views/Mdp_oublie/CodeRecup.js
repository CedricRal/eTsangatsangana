import React, {useRef} from 'react';
import {Text, View, StyleSheet, ScrollView, SafeAreaView, Keyboard, Alert, TextInput} from 'react-native';
import Input from '../Composant/input';
import Button from '../Composant/bouton';

function CodeRecup({navigation, error}) {
const [isFocused, setIsFocused] = React.useState(false);
const [inputs, setInputs] = React.useState({  //etat pour la validation
    case1: '',
    case2:'',
    case3:''
});
const [errors, setErrors] = React.useState({})    //etat pour l'erreur

const firstInput = useRef();
const secondInput = useRef();
const thirdInput = useRef();

const validate = () => { //fonction de validation des information
    Keyboard.dismiss(); //ferme le clavier quand on appui sur le boutton 'valider'
    let valid = true;
    if (!inputs.case1 || !inputs.case2 || !inputs.case3){
        handleError('Entrer le code svp!', 'code')
        valid = false
    } else if (inputs.case1.length!=2 || inputs.case2.length!=2 || inputs.case3.length!=2){
        handleError('Entrer un code correct svp!', 'code')
        valid = false
    };
    if (valid == true) {
        navigation.navigate('NewPass')
    }
    console.log(inputs.case3)
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
                <Text style={styles.title}>Nouveau mot de passe</Text>
                <Text style={styles.description}>Veuillez saisir le code reçu par Email</Text>
                <View style={styles.viewContain}>
                <View style={styles.boxContainer}>
                <View style={[styles.inputContainer, {borderColor: error? 'red': isFocused? 'blue': 'black'}]}>
                <TextInput 
                    keyboardType = 'numeric'
                    autoFocus
                    style={styles.inputBox}
                    maxLength={2}
                    ref={firstInput}
                    error={errors.case1}
                    onChangeText={text => {
                        handleOnChange(text, 'case1');
                        text.length==2 && secondInput.current.focus()}}
                    onFocus={()=>{
                        handleError(null, 'code');
                        setIsFocused(true);
                        }}
                        onBlur={()=>{
                        setIsFocused(false);
                    }}/>
                </View>
                <View style={[styles.inputContainer, {borderColor: error? 'red': isFocused? 'blue': 'black'}]}>
                <TextInput 
                    keyboardType = 'numeric'
                    style={styles.inputBox}
                    maxLength={2}
                    ref={secondInput}
                    error={errors.code}
                    onChangeText={text => {
                        handleOnChange(text, 'case2');
                        if(text.length==2){thirdInput.current.focus()}
                        else if(!text){firstInput.current.focus()}}}
                    onFocus={()=>{
                        handleError(null, 'code');
                        setIsFocused(true);
                        }}
                        onBlur={()=>{
                        setIsFocused(false);
                    }}/>
                </View>
                <View style={[styles.inputContainer, {borderColor: error? 'red': isFocused? 'blue': 'black'}]}>
                <TextInput
                    keyboardType = 'numeric'
                    style={styles.inputBox}
                    maxLength={2}
                    ref={thirdInput}
                    error={errors.code}
                    onChangeText={text => {
                        handleOnChange(text, 'case3');
                        (!text) && secondInput.current.focus()}}
                    onFocus={()=>{
                        handleError(null, 'code');
                        setIsFocused(true);
                        }}
                        onBlur={()=>{
                        setIsFocused(false);
                    }}/>
                </View>
                </View>
                <Text style={styles.erreur}>{errors.code}</Text>
                <Text style={styles.resend} onPress= {() => {Alert.alert('Code de récupération envoyé')}}>Renvoyer le code</Text>
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
        paddingTop:40,
        textAlign:'center'
    },
    boxContainer : {
        flexDirection:'row',
        alignSelf:'center'
    },
    inputBox : {
        width:20,
        paddingHorizontal:1
    },
    spacing : {
        marginHorizontal:20
    },
    inputContainer: {
        height: 40,
        backgroundColor: 'whitesmoke',
        flexDirection: 'row',
        paddingHorizontal: 15,
        borderWidth: 1,
        borderRadius:10,
        alignItems: 'center',
        marginHorizontal:20
    },
    erreur : {
        color:'red',
        fontSize:12,
        marginTop:7,
        textAlign:'center'
    },
    resend : {
        fontSize:16,
        color:'dodgerblue',
        marginVertical:20,
        marginLeft:'20%',
        textDecorationLine:'underline'
    }
})

export default CodeRecup;