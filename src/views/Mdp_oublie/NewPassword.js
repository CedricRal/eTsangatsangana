import React, { useState } from 'react';
import {Text, View, StyleSheet, ScrollView, SafeAreaView, Keyboard, Modal, TouchableOpacity} from 'react-native';
import Input from '../Composant/input';
import Button from '../Composant/bouton';
import design from './../Composant/couleur';
import Icon from 'react-native-vector-icons/FontAwesome5';

function NewPass({navigation}) {
const [inputs, setInputs] = React.useState({  //etat pour la validation
    password:'',
    confirm:'',
});
const [modalVisible, setModalVisible] = useState(false)
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
        valid = false
    };
    if (!inputs.password){
        handleError('Entrer votre mot de passe svp!', 'password')
        valid = false
    } else if (inputs.confirm != inputs.password){
        handleError('Mot de passe ne correspond pas', 'confirm')
        valid = false
    };
    if (valid == true) {
        register()
    }
};

const register = () => {
    setModalVisible(!modalVisible)
};

const handleOnChange = (text, input) => {       //prend les valeurs saisi aux input
    setInputs(prevState => ({...prevState, [input]: text}));
}
const handleError = (errorMessage, input) => {       //prend les etat de l'erreur
    setErrors(prevState => ({...prevState, [input]: errorMessage}));
}

return(
        <SafeAreaView style={styles.container}>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.circle}>
                        <Icon name='check' size={35} color={design.Vert} style={styles.check}/>
                        </View>
                        <Text style={styles.modalText}>Récupération de mot de passe réussie</Text>
                        <TouchableOpacity
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}
                        >
                        <Text style={styles.textStyle}>Ok</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </Modal>


            <ScrollView style={styles.scroll_view}>
                <Text style={styles.title}>Changement de mot de passe</Text>
                <Text style={styles.description}>Entrer un nouveau mot de passe pour terminer la récupération</Text>                
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
                    placeholder='Confirmer votre Mot de passe'
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
        color:design.Marron,
        fontSize: 30,
        fontWeight:'bold',
        textAlign:'center',
        fontFamily:design.police
    },
    viewContain : {
        marginVertical:20
    },
    description : {
        color:'black',
        fontSize: 18,
        marginVertical: 10,
        textAlign:'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        width: 50,
        borderRadius: 10,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: design.Marron,
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontFamily:design.police
      },
      modalText: {
        color:'black',
        marginBottom: 15,
        fontSize:16,
        textAlign: "center",
        fontFamily:design.police
      },
      circle: {
        width:52,
        height:52,
        borderWidth:4,
        borderRadius:45,
        borderColor:design.Vert
    },
    check:{
        alignSelf:'center',
        marginTop:'10%'
    }
})

export default NewPass;