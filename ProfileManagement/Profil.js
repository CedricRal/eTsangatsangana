import { Image, Text, View , StyleSheet, TouchableOpacity} from 'react-native';
import { useRoute } from '@react-navigation/native';
import React from 'react';
import ModifierImage from './ProfileImg';

export default UserProfile = ({navigation}) => {

    const route = useRoute();


    return (
    <View>  
        <Text style={styles.headerText}> Profil </Text>

        <ModifierImage/> 


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
            <Text style={styles.afficheModif}> {route.params.nom}</Text>
            <Text style={styles.afficheModif}> {route.params.prenom}</Text>
            <Text style={styles.afficheModif}> {route.params.adresse}</Text>
            <Text style={styles.afficheModif}> {route.params.email}</Text>
            <Text style={styles.afficheModif}> {route.params.phone}</Text>
        </View>
    </View>
    )
}


const styles = StyleSheet.create({
   
    headerText: {
        marginTop: 50,
        marginLeft: 180,
        marginBottom: 5,
    },

    image: {
        marginTop: 0,
        width: 150,
        height: 150,
        alignSelf:'center',
        borderRadius: 35
      },
   
    afficheModif: {
        borderWidth: 1,
        marginBottom: 15,
        marginLeft: 55,
        width: '75%',
        padding: 15
    },
    editingIcon: {
        height: 25,
        width:25,
        marginTop: -40,
        marginBottom: 50,
        marginLeft: 290
    }
});