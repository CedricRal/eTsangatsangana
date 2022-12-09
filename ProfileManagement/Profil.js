import { Image, Text, View , StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import design from '../src/views/Composant/couleur';


export default UserProfile = ({navigation}) => {

    const route = useRoute();

    const [value, setValue] = useState('');
    

    return (
    
    <View style={styles.fondBlanc}> 
        <TouchableOpacity onPress={() => {
            navigation.navigate('ModificationProfile')
            }}>
            <Image resizeMode='center'
            source= {require('../assets/MyImages/EditIcon.jpg')
            }
            style={styles.editingIcon}
          />      
        </TouchableOpacity>


        <View style={styles.distance}>
            <TextInput editable={false} activeUnderlineColor='transparent'
            underlineColor='disabled' style={styles.textInput}> {route.params? route.params.nom : 'nom'}</TextInput>
            <TextInput editable={false} activeUnderlineColor='transparent'
            underlineColor='disabled' style={styles.textInput}> {route.params? route.params.prenom : 'prenom'}</TextInput>
            <TextInput editable={false} activeUnderlineColor='transparent'
            underlineColor='disabled' style={styles.textInput}> {route.params? route.params.adresse : 'adresse'}</TextInput>
            <TextInput editable={false} activeUnderlineColor='transparent'
            underlineColor='disabled' style={styles.textInput}> {route.params? route.params.email : 'email'}</TextInput>
            <TextInput editable={false} activeUnderlineColor='transparent'
            underlineColor='disabled' style={styles.textInput}> {route.params? route.params.phone : 'phone'}</TextInput>
        </View>
    </View>
    
    )
}


const styles = StyleSheet.create({
   
    fondBlanc: {
        paddingTop: '20%',
        backgroundColor: design.Blanc,
        width: '100%',
        height: '100%',
    },

    distance: {
        marginTop: '-20%'
    },
      textInput: {
        borderWidth: 1,
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
        height: '20%',
        width:'20%',
        marginLeft: '60%'
    }
});

/* <Image source={route.params.photo ? route.params.photo : require('../assets/MyImages/profil.jpg')}
        style={styles.image}
        />  */