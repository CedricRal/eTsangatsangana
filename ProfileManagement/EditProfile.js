import React, { useState, useLayoutEffect, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import design from '../src/views/Composant/couleur';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../src/hooks/mutation';
import { useProfil } from '../src/hooks/query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import AppStyles from '../styles/App_style';

const ProfilEdit = ({navigation}) => {

    const { t } = useTranslation();

    const [userId, setUserId] = React.useState();
    const loadId = async() => {
        try {
            const myId = await AsyncStorage.getItem("myId");    //prendre myId dans AsyncStorage
            if(myId !== null){    //condition si Id existe déjà dans AsyncStorage
                setUserId(myId)
            };
        } catch (error) {
            alert(error);
        }
    }
    useLayoutEffect(() => {     //execute la fonction loadId dès que la page se lance
        loadId();
    },[]);
    const {profilError, profilData, profilLoading} = useProfil(userId);
    useEffect(()=>{
      console.log(profilData);
      if(profilData){setUsername(profilData.profil_user.nom);
      setUserFirstName(profilData.profil_user.prenom);
      setUserLocation(profilData.profil_user.adresse);
      setUserEmail(profilData.profil_user.mail);
      setuserPhone(profilData.profil_user.num_tel);}
    },[profilData])

    const [username, setUsername] = useState()
    const [userFirstName, setUserFirstName] = useState()
    const [userLocation, setUserLocation] = useState()
    const [userEmail, setUserEmail] = useState()
    const [userPhone, setuserPhone] = useState()
    const [userPassword, setUserPassword] = useState()
    const [userNewPassword, setUserNewPassword] = useState()

    const [passwordVisible, setPasswordVisible] = useState(true);
    const [passwordVisibleVerif, setPasswordVisibleVerif] = useState(true);

    const [ update_user, { data, loading, error } ] = useMutation(UPDATE_USER);
    const handleMutation = async () => {
        try {
          const result = await update_user({
            variables: {
              id_user:userId,
              nom:username,
              prenom:userFirstName,
              num_tel:userPhone,
              mail:userEmail,
              adresse:userLocation,
              mdp:userNewPassword,
              photo:''
            }
          });
          if(result){navigation.navigate('AffichageProfile')};
          console.log(result); // Afficher le résultat de la mutation réussie
        } catch (e) {
          console.log(JSON.stringify(e, null, 2)); // Gérer les erreurs éventuelles
        }
    };
    useFocusEffect(
      React.useCallback(() => {
        // code pour exécuter la requête Apollo Client
        console.log('refetch data')
        setUserPassword(null);
        setUserNewPassword(null);
      }, [])
    );
  

    if(loading) return (<ActivityIndicator size={'large'} color={design.Vert} style={AppStyles.loader}/>)

    return (
      <ScrollView>
        <View style={styles.mainContainer}>
            <TextInput 
            value={username}
            activeUnderlineColor='transparent'
            underlineColor='disabled'
            style={styles.textInput}
            onChangeText={(text) => setUsername(text)}/>

            <TextInput 
            value={userFirstName}
            activeUnderlineColor='transparent'
            underlineColor='disabled'
            style={styles.textInput}
            onChangeText={(text) => setUserFirstName(text)}/>

            <TextInput 
            value={userLocation}
            activeUnderlineColor='transparent'
            underlineColor='disabled'
            style={styles.textInput}
            onChangeText={(text) => setUserLocation(text)}/>

            <TextInput 
            value={userEmail}
            style={styles.textInput}
            activeUnderlineColor='transparent'
            underlineColor='disabled'
            onChangeText={(text) => setUserEmail(text)}
            type="email"/>

            <TextInput 
            value={userPhone}
            placeholder={profilData? profilData.profil_user.num_tel : t('langues:phoneNumber')}
            keyboardType = 'numeric' 
            activeUnderlineColor='transparent'
            underlineColor='disabled'
            style={styles.textInput}
            onChangeText={(text) => setuserPhone(text)}/>

          <View style={styles.viewIconPass}>
            <TextInput 
            value={userPassword}
            activeUnderlineColor='transparent'
            underlineColor='disabled'
            style={styles.textInputPwd}
            placeholder={t('langues:password')}
            onChangeText={(text) => setUserPassword(text)}
            secureTextEntry={passwordVisible}
            />
            <Icon name={passwordVisible ? "eye-slash" : "eye"}
             onPress={() => setPasswordVisible(!passwordVisible)} size={20}/>
        </View>

          <View style={styles.viewIconPass}>
            <TextInput 
            value={userNewPassword}
            style={styles.textInputPwd}
            activeUnderlineColor='transparent'
            underlineColor='disabled'
            placeholder={t('langues:newPassword')}
            onChangeText={(text) => setUserNewPassword(text)}
            secureTextEntry={passwordVisibleVerif}
            />
            <Icon name={passwordVisibleVerif ? "eye-slash" : "eye"}
             onPress={() => setPasswordVisibleVerif(!passwordVisibleVerif)} size={20}/>
          </View>

          <Pressable style={styles.button} onPress={handleMutation}>
            <Text style={styles.text}>{t('langues:buttonModify')}</Text>
          </Pressable>               
        </View>
      </ScrollView>
    )
}


const styles = StyleSheet.create({

    mainContainer: {
        paddingVertical: '20%',
        backgroundColor: design.Blanc,
        width: '100%',
        height: '100%',
    },

    textInput: {
        borderWidth: 1,
        width: '80%',
        height: 45,
        marginBottom: '5%',
        paddingHorizontal:30,
        alignSelf: 'center',
        backgroundColor: 'whitesmoke',
        borderColor: design.Marron,
        borderRadius: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },

    textInputPwd : {
        width: '82%',
        height: 45,
        alignSelf: 'center',
        marginLeft: '1%',
        backgroundColor: 'whitesmoke',
        borderRadius: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    viewIconPass: {
      flex:1,
      flexDirection: 'row',
      alignSelf: 'center',
      borderWidth: 1,
      width: '80%',
      marginBottom: '5%',
      justifyContent:'center',
      alignItems:'center',
      backgroundColor: 'whitesmoke',
      borderColor: design.Marron,
      borderRadius: 8,
      borderRadius: 10,
    },  

    button: {
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      borderRadius: 20,
      width: '40%',
      backgroundColor: design.Marron,
    },
    text: {
      fontSize: 18,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: design.Blanc,
    },
});

export default ProfilEdit;