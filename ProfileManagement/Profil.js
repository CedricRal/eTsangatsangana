import { Image, Text, View , StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import design from '../src/views/Composant/couleur';


export default UserProfile = ({navigation}) => {

    const route = useRoute();

    const [value, setValue] = useState('');
    

    return (
    
    <View style={styles.distance}> 
        <TextInput editable={false} activeUnderlineColor='transparent'
            underlineColor='disabled' style={styles.textInput}>     <Icon name={'user'} size={25} color={design.Marron} />    {route.params? route.params.nom : 'nom'}</TextInput>
        <TextInput editable={false} activeUnderlineColor='transparent'
            underlineColor='disabled' style={styles.textInput}>     <Icon name={'user'} size={25} color={design.Marron} />    {route.params? route.params.prenom : 'prenom'}</TextInput>
        <TextInput editable={false} activeUnderlineColor='transparent'
            underlineColor='disabled' style={styles.textInput}>     <Icon name={'map-marker-alt'} size={25} color={design.Marron} />    {route.params? route.params.adresse : 'adresse'}</TextInput>
        <TextInput editable={false} activeUnderlineColor='transparent'
            underlineColor='disabled' style={styles.textInput}>     <Icon name={'envelope'} size={25} color={design.Marron} />    {route.params? route.params.email : 'email'}</TextInput>
        <TextInput editable={false} activeUnderlineColor='transparent'
            underlineColor='disabled' style={styles.textInput}>     <Icon name={'phone'} size={25} color={design.Marron} />    {route.params? route.params.phone : 'phone'}</TextInput>
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
        marginBottom: '2%',
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