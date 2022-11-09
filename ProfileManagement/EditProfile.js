import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Image, StyleSheet, Text, View, Button, TouchableOpacity, TextInput, ScrollView} from 'react-native';


const ProfilEdit = () => {

    const [username, setUsername] = useState("Vina")
    const [userFirstName, setUserFirstName] = useState("Master")
    const [userLocation, setUserLocation] = useState("IVD Saovimbahoaka")
    const [userEmail, setUserEmail] = useState("vina@vinamaster.com")
    const [userPhone, setuserPhone] = useState("+26134855656")
    const [userPassword, setUserPassword] = useState("")
    const [userNewPassword, setUserNewPassword] = useState("")

    const navigation = useNavigation();

    const modifier = () => {
        navigation.navigate('AffichageProfile', {
            nom: username,
            prenom: userFirstName,
            adresse: userLocation,
            email: userEmail,
            phone: userPhone,
            password: userNewPassword,
        })
    }

    return (
        <ScrollView>
        <View style={styles.mainContainer}>
            <Text style={styles.headerText}> Profil </Text> 
            
            <Image source={require('../assets/MyImages/profil.jpg')}
        style={styles.image}
        /> 

        <View>
            <TextInput 
            value={username}
            style={styles.textInput}
            onChangeText={(text) => setUsername(text)}/>

            <TextInput 
            value={userFirstName}
            style={styles.textInput}
            onChangeText={(text) => setUserFirstName(text)}/>

            <TextInput 
            value={userLocation}
            style={styles.textInput}
            onChangeText={(text) => setUserLocation(text)}/>

            <TextInput 
            value={userEmail}
            style={styles.textInput}
            onChangeText={(text) => setUserEmail(text)}
            type="email"/>

            <TextInput 
            value={userPhone}
            style={styles.textInput}
            onChangeText={(text) => setuserPhone(text)}/>

            <TextInput 
            value={userPassword}
            style={styles.textInput}
            placeholder='saisir ancien mot de passe'
            onChangeText={(text) => setUserPassword(text)}
            secureTextEntry/>

            <TextInput 
            value={userNewPassword}
            style={styles.textInput}
            placeholder='saisir nouveau mot de passe'
            onChangeText={(text) => setUserNewPassword(text)}
            secureTextEntry/>

            <View style={styles.buttonModifier}>
                <Button title='Modifier' onPress={modifier}/> 
            </View>               
        </View>  
        </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    headerText: {
        marginTop: 20,
        marginLeft: 185,
    },

    image: {
        width: 150,
        height: 150,
        alignSelf:'center',
        borderRadius: 35,
        marginBottom: 10
      },

    textInput: {
        borderWidth: 1,
        width: '75%',
        marginBottom: 15,
        marginLeft: 55
    },
    buttonModifier : {
        marginLeft: 108,
        width: '50%'
    },

    editingIcon: {
        height: 25,
        width:25,
        marginTop: -55,
        marginBottom: 50,
        marginLeft: 290
    }
});

export default ProfilEdit;