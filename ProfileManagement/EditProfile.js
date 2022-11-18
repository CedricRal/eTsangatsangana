import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView} from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import design from '../src/views/Composant/couleur';

const ProfilEdit = () => {

    const [fileData, setFileData] = useState(null);

    const [username, setUsername] = useState("Vina")
    const [userFirstName, setUserFirstName] = useState("Master")
    const [userLocation, setUserLocation] = useState("IVD Saovimbahoaka")
    const [userEmail, setUserEmail] = useState("vina@vinamaster.com")
    const [userPhone, setuserPhone] = useState("+26134855656")
    const [userPassword, setUserPassword] = useState("")
    const [userNewPassword, setUserNewPassword] = useState("")

    const [passwordVisible, setPasswordVisible] = useState(true);
    const [passwordVisibleVerif, setPasswordVisibleVerif] = useState(true);

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
            placeholder='saisir ancien mot de passe'
            onChangeText={(text) => setUserPassword(text)}
            secureTextEntry={passwordVisible}
            />
            <Icon name={passwordVisible ? "eye-slash" : "eye"}
             onPress={() => setPasswordVisible(!passwordVisible)} size={20} style={styles.eyeIconStyle}/>
        </View>

          <View style={styles.viewIconPass}>
            <TextInput 
            value={userNewPassword}
            style={styles.textInputPwd}
            activeUnderlineColor='transparent'
            underlineColor='disabled'
            placeholder='saisir nouveau mot de passe'
            onChangeText={(text) => setUserNewPassword(text)}
            secureTextEntry={passwordVisibleVerif}
            />
            <Icon name={passwordVisibleVerif ? "eye-slash" : "eye"}
             onPress={() => setPasswordVisibleVerif(!passwordVisibleVerif)} size={20} style={styles.eyeIconStyle}/>
          </View>

            <View style={styles.buttonModifier}>
                <Button title='Modifier' onPress={modifier}/> 
            </View>                 
        </View>
    )
}


const styles = StyleSheet.create({

    mainContainer: {

    },

    textInput: {
        borderWidth: 1,
        width: '75%',
        marginBottom: '2%',
        alignSelf: 'center',
        backgroundColor: 'whitesmoke',
        borderColor: design.Marron,
        borderRadius: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },

    textInputPwd : {
        width: '80%',      
        alignSelf: 'center',
        marginLeft: '1%',
        backgroundColor: 'whitesmoke',
        borderRadius: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },

    eyeIconStyle: {
    marginLeft: '5%',
    height: '80%', 
    paddingTop: '7%'
    },

    viewIconPass: {
      flexDirection: 'row',
      alignSelf: 'center',
      borderWidth: 1,
      width: '75%',
      marginBottom: '2%',
      alignSelf: 'center',
      backgroundColor: 'whitesmoke',
      borderColor: 'gray',
      borderRadius: 8,
      borderRadius: 10,
    },  

    buttonModifier : {
        alignSelf: 'center',
        width: '40%',
        marginBottom: '10%',
        borderWidth: .2,
    },
});

export default ProfilEdit;