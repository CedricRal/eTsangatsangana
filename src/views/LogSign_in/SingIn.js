import React, { useState } from 'react';
import {Text, View, StyleSheet, ScrollView, SafeAreaView, Image, Keyboard, TouchableOpacity, Modal, ActivityIndicator} from 'react-native';
import Input from '../Composant/input';
import Button from '../Composant/bouton';
import ModifierImage from './../../../ProfileManagement/ProfileImg';
import { launchImageLibrary } from 'react-native-image-picker';
import design from './../Composant/couleur';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useTranslation } from 'react-i18next';
import { useRoute } from '@react-navigation/native';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../../hooks/mutation';

function SingIn({navigation}) {

    const {t} = useTranslation();
    const route = useRoute();
    const [inputs, setInputs] = React.useState({  //etat pour la validation
        email: '',
        nom:'',
        prenom:'',
        phone:'',
        password:'',
        confirm:'',
        adresse:''
    });
    const [ inscri_user, {data, loading, error} ] = useMutation(CREATE_USER, {
        variables: {
            nom:inputs.nom,
            prenom:inputs.prenom,
            adresse:inputs.adresse,
            mail:inputs.email,
            num_tel:inputs.phone,
            mdp:inputs.password,
            photo:'source/photo/img'
        }
    });
    const spiner = () => {
        if(loading){
            return <ActivityIndicator size={'large'} color={design.Vert} style={styles.loader}/>
        }
    };

    const [modalVisible, setModalVisible] = useState(false)
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
    if (!inputs.nom){
        handleError(t('langues:noName'), 'nom')
        valid = false
    };
    if (!inputs.prenom){
        handleError(t('langues:noFirstname'), 'prenom')
        valid = false
    };
    if (!inputs.phone){
        handleError(t('langues:noPhone'), 'phone')
        valid = false
    };
    if (!inputs.adresse){
        handleError(t('langues:noAdress'), 'adresse')
        valid = false
    };
    if (!inputs.password){
        handleError(t('langues:noPassword'), 'password')
        valid = false
    } else if (strongRegex.test(inputs.password)===false){
        valid = false
        handleError(t('langues:neededPassword'), 'password')
    };
    if (!inputs.password){
        valid = false
        handleError(t('langues:noPassword'), 'password')
    } else if (inputs.confirm != inputs.password){
        handleError(t('langues:matchingPassword'), 'confirm')
        valid = false
    };
    if (valid == true) {
        setModalVisible(!modalVisible);
    }
};

const handleOnChange = (text, input) => {       //prend les valeurs saisi aux input
    setInputs(prevState => ({...prevState, [input]: text}));
}
const handleError = (errorMessage, input) => {       //prend les etat de l'erreur
    setErrors(prevState => ({...prevState, [input]: errorMessage}));
}
const renderFileData = () => {
    if (fileData) {
      return <Image source={fileData}
      style={styles.image}
      />
    } else {
      return <Image source={require('../../../assets/MyImages/profil.jpg')}
      style={styles.image}
      />
    }
  }

  const launchNativeImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, (response) => {
      console.log('HERE IS THE RESPONSE = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ERROR !!!!!!!: ', response.error);
      } else {
        const source = { uri: response.assets.uri };
        console.log('SUCCESS !!!!!', JSON.stringify(response));
        setFileData(response.assets[0]);
      }
    })}

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
                        <Text style={styles.modalText}>{t('langues:succesSignUp')}</Text>
                        <TouchableOpacity
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                            inscri_user();
                            navigation.navigate('LogIn', {type:type})}}
                        >
                        <Text style={styles.textStyle}>Ok</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </Modal>

            <ScrollView style={styles.scroll_view}>
                <Text style={styles.title}>{t('langues:titleSignIn')}</Text>
                
                <View style={styles.viewContain}>
                <Input 
                    placeholder={t('langues:lastname')} 
                    error={errors.nom} 
                    onChangeText={text => handleOnChange(text, 'nom')}
                    onFocus={() => {
                        handleError(null, 'nom')
                    }}/>
                <Input 
                    placeholder={t('langues:firstname')} 
                    error={errors.prenom}
                    onChangeText={text => handleOnChange(text, 'prenom')}
                    onFocus={() => {
                        handleError(null, 'prenom')
                    }}/>
                <Input 
                    placeholder={t('langues:phoneNumber')}
                    error={errors.phone}
                    keyboardType = 'numeric' 
                    onChangeText={text => handleOnChange(text, 'phone')}
                    onFocus={() => {
                        handleError(null, 'phone')
                    }}/>
                <Input 
                    placeholder={t('langues:adress')} 
                    error={errors.adresse}
                    onChangeText={text => handleOnChange(text, 'adresse')}
                    onFocus={() => {
                        handleError(null, 'adresse')
                    }}/>
                <Input 
                    placeholder={t('langues:enterEmail')}
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
                <Input 
                    placeholder={t('langues:confirmation')}
                    error={errors.confirm}
                    password 
                    onChangeText={text => handleOnChange(text, 'confirm')}
                    onFocus={() => {
                        handleError(null, 'confirm')
                    }}/>
                <Button title={t('langues:signIn')} onPress={validate}/>
                <Text style={styles.other} onPress={() => navigation.navigate('LogIn',{
                    type:route.params.type,
                    produit:route.params.produit,
                    entreprise:route.params.entreprise,
                    prix:route.params.prix,
                    idPub:route.params.idPub,
                    idEtp:route.params.idEtp,
                    idProduit:route.params.idProduit
                })}>
                    {t('langues:already')}
                </Text>
                </View>
            </ScrollView>
            {spiner()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container : {
        backgroundColor:'white',
        flex:1,
    },
    scroll_view : {
        paddingTop: 50,
        paddingHorizontal: 20,
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
        fontSize: 16,
        fontWeight:'bold',
        textAlign:'center',
        marginTop: '10%',
        marginBottom:100,
        color : design.Marron,
        textDecorationLine:'underline',
        fontFamily: design.police
    },
    image: {
        width: 150,
        height: 150, 
        alignSelf: 'center',
        borderRadius: 90,
        marginBottom: 10
      },
    plusIcon: {
      width: 30,
      height: 30,
      marginLeft: '60%',
      marginTop: '-12%',
      marginBottom: '10%',
      borderRadius: 30
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
    loader: {
        position:'absolute',
        alignSelf:'center',
        marginVertical:'40%'
    }
})

export default SingIn;
