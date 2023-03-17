import React, {useRef, useState} from 'react';
import {Text, View, StyleSheet, ScrollView, SafeAreaView, Keyboard, ActivityIndicator, TextInput, Modal} from 'react-native';
import Input from '../Composant/input';
import Button from '../Composant/bouton';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import design from './../Composant/couleur';
import { useTranslation } from 'react-i18next';
import { useRoute } from '@react-navigation/native';
import { useMutation } from '@apollo/client';
import { SEND_MAIL, VERIFY_CODE } from '../../hooks/mutation';
import AppStyles from '../../../styles/App_style';

function CodeRecup({navigation}) {

    const {t} = useTranslation();
    const route = useRoute();
    const [ idCode, setIdCode ] = React.useState(route.params.id);
    console.log(route.params.mail)
    const [loading1, setLoading1] = React.useState(false);
    const [loading2, setLoading2] = React.useState(false);

    const [ send_mail, { data, error }] = useMutation(SEND_MAIL, {
        onCompleted: (data) => {
            console.log('Code envoyé', data.send_mail.id);
            setIdCode(data.send_mail.id);
            setLoading1(false);
            setModalVisible(!modalVisible);
        },
        onError: (error) => {
            console.log(JSON.stringify(error,null,2));
            setLoading1(false);
        },
        variables: {mail:route.params.mail}
    });
    
    const [inputs, setInputs] = React.useState({  //etat pour la validation
        case1: '',
        case2: '',
        case3: ''
    });
    const concatenatedCode = inputs.case1.toString() + inputs.case2.toString() + inputs.case3.toString();
    console.log(concatenatedCode);
    
    const [ verifier_code ] = useMutation(VERIFY_CODE, {
        onCompleted: (data) => {
            console.log('code vérifié', data);
            setLoading2(false);
            navigation.navigate('NewPass',{
                id:data.verification_code.id,
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
        variables: {id:idCode, code:concatenatedCode}
    });

    const [isFocused, setIsFocused] = React.useState(false);
    const [errors, setErrors] = React.useState({})    //etat pour l'erreur

    const firstInput = useRef();
    const secondInput = useRef();
    const thirdInput = useRef();

    const [modalVisible, setModalVisible] = useState(true);

    const validate = () => { //fonction de validation des information
        Keyboard.dismiss(); //ferme le clavier quand on appui sur le boutton 'valider'
        let valid = true;
        if (!inputs.case1 || !inputs.case2 || !inputs.case3){
            handleError(t('langues:enterCode'), 'code')
            valid = false
        } else if (inputs.case1.length!=2 || inputs.case2.length!=2 || inputs.case3.length!=2){
            handleError(t('langues:incorrectCode'), 'code')
            valid = false
        };
        if (valid == true) {
            setLoading2(true);
            verifier_code();
        }
    };


    const handleOnChange = (text, input) => {       //prend les valeurs saisi aux input
        setInputs(prevState => ({...prevState, [input]: text}));
    }
    const handleError = (errorMessage, input) => {       //prend les etat de l'erreur
        setErrors(prevState => ({...prevState, [input]: errorMessage}));
    }

    if(loading1 || loading2) return (<ActivityIndicator size={'large'} color={design.Vert} style={AppStyles.loader}/>)

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scroll_view}>

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
                        <Text style={styles.modalText}>{t('langues:recuperationModal')}</Text>
                        <TouchableOpacity
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}
                        >
                        <Text style={styles.textStyle}>Ok</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </Modal>



                <Text style={styles.title}>{t('langues:newPassword')}</Text>
                <Text style={styles.description}>{t('langues:newPasswordDescription')}</Text>
                <View style={styles.viewContain}>
                <View style={styles.boxContainer}>
                <View style={[styles.inputContainer, {borderColor: error? 'red': isFocused? design.Vert: design.Marron}]}>
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
                <View style={[styles.inputContainer, {borderColor: error? 'red': isFocused? design.Vert: design.Marron}]}>
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
                <View style={[styles.inputContainer, {borderColor: error? 'red': isFocused? design.Vert: design.Marron}]}>
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
                <Text style={styles.resend} onPress= {() => {
                    send_mail();
                    setLoading1(true);
                    }}>{t('langues:resend')}</Text>
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
        paddingTop:40,
        textAlign:'center',
        fontFamily:design.police
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
        color:design.Marron,
        marginVertical:20,
        textAlign: 'center',
        textDecorationLine:'underline'
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

export default CodeRecup;