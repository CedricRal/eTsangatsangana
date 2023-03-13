import { Image, Text, View , StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { useRoute } from '@react-navigation/native';
import React, { useState, useLayoutEffect } from 'react';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import design from '../src/views/Composant/couleur';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useProfil } from '../src/hooks/query';
import { formatPhoneNumber } from '../src/views/Composant/Format';


export default UserProfile = ({navigation}) => {

    const { t } = useTranslation();
    const route = useRoute();
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
    useLayoutEffect(() => {     //execute la fonction loadId dès que la page LogIn se lance
        loadId();
    },[]);
    const {profilError, profilData, profilLoading} = useProfil(userId);
    

    return (
    
    <View style={styles.distance}> 
        <TextInput editable={false} activeUnderlineColor='transparent'
            underlineColor='disabled' style={styles.textInput}>     <Icon name={'user'} size={22} color={design.Marron} />    {profilData? profilData.profil_user.nom : t('langues:lastname')}</TextInput>
        <TextInput editable={false} activeUnderlineColor='transparent'
            underlineColor='disabled' style={styles.textInput}>     <Icon name={'user'} size={22} color={design.Marron} />    {profilData? profilData.profil_user.prenom : t('langues:firstname')}</TextInput>
        <TextInput editable={false} activeUnderlineColor='transparent'
            underlineColor='disabled' style={styles.textInput}>     <Icon name={'map-marker-alt'} size={22} color={design.Marron} />    {profilData? profilData.profil_user.adresse : t('langues:adress')}</TextInput>
        <TextInput editable={false} activeUnderlineColor='transparent'
            underlineColor='disabled' style={styles.textInput}>     <Icon name={'envelope'} size={22} color={design.Marron} />    {profilData? profilData.profil_user.mail : t('langues:email')}</TextInput>
        <TextInput editable={false} activeUnderlineColor='transparent'
            underlineColor='disabled' style={styles.textInput}>     <Icon name={'phone-alt'} size={22} color={design.Marron} />    {profilData? formatPhoneNumber(profilData.profil_user.num_tel) : t('langues:phoneNumber')}</TextInput>
    </View>
    
    )
}


const styles = StyleSheet.create({
    distance: {
        marginTop: '20%'
    },
      textInput: {
        borderWidth: 1,
        height:45,
        width: '75%',
        marginBottom: '5%',
        alignSelf: 'center',
        backgroundColor: 'whitesmoke',
        borderColor: design.Marron,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderRadius: 10,
        fontFamily: "RobotoMedium"
    },
    
    editingIcon: {
        marginVertical: 50,
        borderWidth:1,
        alignSelf:'center',
    }
});

/* <Image source={profilData.photo ? profilData.photo : require('../assets/MyImages/profil.jpg')}
        style={styles.image}
        />  */