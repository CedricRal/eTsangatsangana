import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import design from '../src/views/Composant/couleur';
import { useTranslation } from 'react-i18next';

const ProfilEdit = () => {

    const { t } = useTranslation();
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
          <ScrollView>
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

          <Pressable style={styles.button} onPress={modifier}>
            <Text style={styles.text}>{t('langues:buttonModify')}</Text>
          </Pressable> 
          </ScrollView>              
        </View>
    )
}


const styles = StyleSheet.create({

    mainContainer: {
        paddingTop: '20%',
        backgroundColor: design.Blanc,
        width: '100%',
        height: '100%',
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