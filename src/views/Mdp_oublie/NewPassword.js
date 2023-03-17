import React, { useState } from 'react';
import {Text, View, StyleSheet, ScrollView, SafeAreaView, Keyboard, Modal, TouchableOpacity, ActivityIndicator} from 'react-native';
import Input from '../Composant/input';
import Button from '../Composant/bouton';
import design from './../Composant/couleur';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';
import { UPDATE_MDP } from '../../hooks/mutation';
import { useRoute } from '@react-navigation/native';
import AppStyles from '../../../styles/App_style';

function NewPass({navigation}) {

    const {t} = useTranslation();
    const route = useRoute();

    const [inputs, setInputs] = React.useState({  //etat pour la validation
        password:'',
        confirm:'',
    });
    console.log(route.params.id);

    const [ update_mdp, {data, loading, error } ] = useMutation(UPDATE_MDP, {
        onCompleted: (data) => {
            setModalVisible(!modalVisible);
        },
        onError: (error) => {
            console.log(JSON.stringify(error, null, 2));
        },
        variables: { id:route.params.id, mdp:inputs.password}
    })

    const [modalVisible, setModalVisible] = useState(false)
    const [errors, setErrors] = React.useState({})    //etat pour l'erreur
    const validate = () => { //fonction de validation des information
        Keyboard.dismiss(); //ferme le clavier quand on appui sur le boutton 'valider'
        let valid = true;
        const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        if (!inputs.password){
            handleError(t('langues:noPassword'), 'password')
            valid = false
        } else if (strongRegex.test(inputs.password)===false){
            handleError(t('langues:neededPassword'), 'password')
            valid = false
        };
        if (!inputs.password){
            handleError(t('langues:noPassword'), 'password')
            valid = false
        } else if (inputs.confirm != inputs.password){
            handleError(t('langues:matchingPassword'), 'confirm')
            valid = false
        };
        if (valid == true) {
            update_mdp();
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
                        <Text style={styles.modalText}>{t('langues:succesModal')}</Text>
                        <TouchableOpacity
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                            navigation.navigate('LogIn',{
                                type:route.params.type,
                                produit:route.params.produit,
                                entreprise:route.params.entreprise,
                                prix:route.params.prix,
                                idPub:route.params.idPub,
                                idEtp:route.params.idEtp,
                                idProduit:route.params.idProduit
                            })}}
                        >
                        <Text style={styles.textStyle}>Ok</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </Modal>


            <ScrollView style={styles.scroll_view}>
                <Text style={styles.title}>{t('langues:passwordChange')}</Text>
                <Text style={styles.description}>{t('langues:changingDescription')}</Text>                
                <View style={styles.viewContain}>
                <Input 
                    placeholder={t('langues:enterPassword')}
                    error={errors.password}
                    password 
                    onChangeText={text => handleOnChange(text, 'password')}
                    onFocus={() => {
                        handleError(null, 'password')
                    }}/>
                <Input 
                    placeholder={t('langues:confirmPassword')}
                    error={errors.confirm}
                    password 
                    onChangeText={text => handleOnChange(text, 'confirm')}
                    onFocus={() => {
                        handleError(null, 'confirm')
                    }}/>
                <Button title={t('langues:continue')} onPress={validate}/>
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
        fontSize: 28,
        fontWeight:'bold',
        textAlign:'center',
        fontFamily:design.police
    },
    viewContain : {
        marginVertical:20
    },
    description : {
        color:'black',
        fontSize: 16,
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