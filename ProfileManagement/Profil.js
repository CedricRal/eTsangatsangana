import { Image, Text, View , StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-paper';

export default UserProfile = ({navigation}) => {

    const route = useRoute();

    const [value, setValue] = useState('');
    const getValue = () => {
        AsyncStorage.getItem('anarana_nomen_cedric').then((value) => {
            setValue(value)
        })
    }
    

    return (
    <ScrollView>
    <View>  
        <Text style={styles.headerText}> Profil </Text>

        <Image source={route.params.photo ? route.params.photo : require('../assets/MyImages/profil.jpg')}
        style={styles.image}
        /> 


        <TouchableOpacity onPress={() => {
            navigation.navigate('ModificationProfile')
                
            }}>
            <Image
            source= {require('../assets/MyImages/EditIcon.jpg')
            }
            style={styles.editingIcon}
          />      
        </TouchableOpacity>
        <View>
            <TextInput editable={false} style={styles.textInput}> {route.params.nom}</TextInput>
            <TextInput editable={false} style={styles.textInput}> {route.params.prenom}</TextInput>
            <TextInput editable={false} style={styles.textInput}> {route.params.adresse}</TextInput>
            <TextInput editable={false} style={styles.textInput}> {route.params.email}</TextInput>
            <TextInput editable={false} style={styles.textInput}> {route.params.phone}</TextInput>
        </View>
    </View>
    </ScrollView>
    )
}


const styles = StyleSheet.create({
   
    headerText: {
        marginTop: '5%',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },

    image: {
        alignSelf: 'center',
        width: 150,
        height: 150, 
        borderRadius: 90,
        marginLeft: '50%',
        marginRight: '50%'
      },
   
      textInput: {
        borderWidth: 1,
        width: '75%',
        marginBottom: '2%',
        alignSelf: 'center',
        backgroundColor: 'whitesmoke',
        borderColor: 'gray',
        borderRadius: 8,
    },
    
    editingIcon: {
        height: 25,
        width:25,
        marginTop: '-10%',
        marginBottom: 50,
        marginLeft: 290
    }
});