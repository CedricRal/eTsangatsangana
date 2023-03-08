import { Image, Text, View , StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import design from '../src/views/Composant/couleur';
import { useTranslation } from 'react-i18next';


export default UserProfile = ({navigation}) => {

    const { t } = useTranslation();
    const route = useRoute();

    const [value, setValue] = useState('');
    

    return (
    
    <View style={styles.distance}> 
        <TextInput editable={false} activeUnderlineColor='transparent'
            underlineColor='disabled' style={styles.textInput}>     <Icon name={'user'} size={22} color={design.Marron} />    {route.params? route.params.nom : t('langues:lastname')}</TextInput>
        <TextInput editable={false} activeUnderlineColor='transparent'
            underlineColor='disabled' style={styles.textInput}>     <Icon name={'user'} size={22} color={design.Marron} />    {route.params? route.params.prenom : t('langues:firstname')}</TextInput>
        <TextInput editable={false} activeUnderlineColor='transparent'
            underlineColor='disabled' style={styles.textInput}>     <Icon name={'map-marker-alt'} size={22} color={design.Marron} />    {route.params? route.params.adresse : t('langues:adress')}</TextInput>
        <TextInput editable={false} activeUnderlineColor='transparent'
            underlineColor='disabled' style={styles.textInput}>     <Icon name={'envelope'} size={22} color={design.Marron} />    {route.params? route.params.email : t('langues:email')}</TextInput>
        <TextInput editable={false} activeUnderlineColor='transparent'
            underlineColor='disabled' style={styles.textInput}>     <Icon name={'phone-alt'} size={22} color={design.Marron} style={{ transform: [{ rotate: '90deg' }] }}/>    {route.params? route.params.phone : t('langues:phoneNumber')}</TextInput>
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

/* <Image source={route.params.photo ? route.params.photo : require('../assets/MyImages/profil.jpg')}
        style={styles.image}
        />  */