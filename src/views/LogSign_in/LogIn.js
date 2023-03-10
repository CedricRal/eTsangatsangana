import React, { useLayoutEffect, useEffect } from 'react';
import {Text, View, StyleSheet, ScrollView, SafeAreaView,TouchableOpacity, Keyboard, ActivityIndicator, Modal } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Input from '../Composant/input';
import Button from '../Composant/bouton';
import design from './../Composant/couleur';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useTranslation } from 'react-i18next';
import { GET_USER } from '../../hooks/query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLazyQuery } from '@apollo/client';

function LogIn({navigation}) {
    const {t} = useTranslation();
    const route = useRoute();
    const type = route.params.type;
    const produit = route.params.produit;
    const entreprise = route.params.entreprise;
    const prix = route.params.prix;
    const idPub = route.params.idPub;
    const [modalVisible, setModalVisible] = React.useState(false);
    const [user, setUser] = React.useState({
        email:'',
        mdp:'',
    });
    const [inputs, setInputs] = React.useState({  //etat pour la validation
        email: '',
        password:''
    });

    const [get_user,{ loading, data, called, error }] = useLazyQuery(GET_USER, {
        onCompleted: (data) => {
            console.log('onCompletedData =>',data);
            handleSave(data);
        },
        onError: (error) => {
            console.log('on error =>', error.clientErrors);
            setModalVisible(!modalVisible)
            {
                console.log('reset inputs')
                const updatedInputs = { ...inputs };
                // Modifier les propriétés "email" et "mdp" de la copie
                updatedInputs['email'] = null;
                updatedInputs['password'] = null;
                setInputs(updatedInputs);
            };
        },
        fetchPolicy: 'cache-and-network',
        variables: {
            mail:user.email, mdp:user.mdp
        }
    });
    console.log( 'called =>',called, 'loading =>', loading, user);

    const [errors, setErrors] = React.useState({})    //etat pour l'erreur
    const validate = () => { //fonction de validation des information
        Keyboard.dismiss(); //ferme le clavier quand on appui sur le boutton 'valider'
        let valid = false;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        console.log(valid);
        if (!inputs.email){
            handleError(t('langues:noEmail'), 'email')
            valid = false
        } else if (reg.test(inputs.email)===false){
            console.log('test email avant erreur,  valid=>', valid)
            handleError(t('langues:incorrectEmail'), 'email')
            valid = false
            console.log('test email,  valid=>', valid)
        } if (!inputs.password){
            handleError(t('langues:noPassword'), 'password')
            valid = false
        } if (reg.test(inputs.email) && inputs.email && inputs.password){
            valid = true;
            console.log('Les champs sont valide')
        };
        console.log(valid, inputs.email, inputs.password);
        if (valid == true) {
            handleUser();
            get_user();
            valid = false;
        };
        console.log(valid);
    };
    function handleUser() {
        // Créer une copie de l'objet existant
        const updatedUser = { ...user };
    
        // Modifier les propriétés "email" et "mdp" de la copie
        updatedUser['email'] = inputs.email;
        updatedUser['mdp'] = inputs.password;
    
        // Mettre à jour le state avec la nouvelle copie
        setUser(updatedUser);
    };

    const handleSave = async(data) => {
        console.log('handleSave data =>',data)
        if(data){try {
            AsyncStorage.setItem("myToken", data.auth_user.token);  //sauvegarder token dans la variable myToken dans AsyncStorage
            AsyncStorage.setItem("myId", data.auth_user.id);
            navigation.navigate('detailCmd',{
                type:type,
                produit:produit,
                entreprise:entreprise,
                prix:prix,
                idPub:idPub,
                idEtp:route.params.idEtp,
                idProduit:route.params.idProduit
            });
        }catch (error) {
            alert(error)
        }}
    };

    const loadToken = async() => {
        try {
            const token = await AsyncStorage.getItem("myToken");    //prendre myToken dans AsyncStorage
            if(token !== null){    //condition si token existe déjà dans AsyncStorage
                navigation.navigate('detailCmd',{
                    type:type,
                    produit:produit,
                    entreprise:entreprise,
                    prix:prix,
                    idPub:idPub,
                    idEtp:route.params.idEtp,
                    idProduit:route.params.idProduit
                });
            };
        } catch (error) {
            alert(error);
        }
    };
    useLayoutEffect(() => {     //execute la fonction loadToken dès que la page LogIn se lance
        console.log('Screen opened')
        loadToken();
    },[]);

    const handleOnChange = (text, input) => {       //prend les valeurs saisi aux input
        setInputs(prevState => ({...prevState, [input]: text}));
    }
    const handleError = (errorMessage, input) => {       //prend les etat de l'erreur
        setErrors(prevState => ({...prevState, [input]: errorMessage}));
    }
    if(loading) return <ActivityIndicator size={'large'} color={design.Vert} style={styles.loader}/>

    
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
                        <Icon name='times' size={35} color={design.Vert} style={styles.check}/>
                        </View>
                        <Text style={styles.modalText}>{t('langues:invalidCredential')}</Text>
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
                <Button title={t('langues:logIn')} onPress={() => {
                        validate();
                    }}/>
                <Text style={styles.other} onPress={ () => navigation.navigate('SingIn',{
                    type:type,
                    produit:produit,
                    entreprise:entreprise,
                    prix:prix,
                    idPub:idPub,
                    idEtp:route.params.idEtp,
                    idProduit:route.params.idProduit
                })}>
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
    },
    loader: {
        alignSelf: 'center',
        justifyContent: 'center',
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

export default LogIn;