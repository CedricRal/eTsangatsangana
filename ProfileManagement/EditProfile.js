import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, Button, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';


const ProfilEdit = () => {

    const [fileData, setFileData] = useState(null);

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
            photo: fileData,
            nom: username,
            prenom: userFirstName,
            adresse: userLocation,
            email: userEmail,
            phone: userPhone,
            password: userNewPassword,
        })
    }

    const renderFileData = () => {
        if (fileData) {
          return <Image source={fileData}
          style={styles.image}
          />
        } else {
          return <Image source={require('../assets/MyImages/profil.jpg')}
          style={styles.image}
          />
        }
      }

      const launchNativeImageLibrary = () => {
        let options = {
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        launchImageLibrary(options, (response) => {
          console.log('HERE IS THE RESPONSE = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.errorCode) {
            console.log('ERROR !!!!!!!: ', response.error);
          } else {
            const source = { uri: response.assets.uri };
            console.log('SUCCESS !!!!!', JSON.stringify(response));
            setFileData(response.assets[0]);
          }
        });
    
      }

    return (
        <ScrollView>
        <View style={styles.mainContainer}>
            <Text style={styles.headerText}> Profil </Text> 
            
            {renderFileData()}
            <View>
            <TouchableOpacity onPress={() => {
              launchNativeImageLibrary()}} >
                <Image style={styles.plusIcon}
                  source={require('../assets/MyImages/plus.jpg')}
                />
            </TouchableOpacity>
            </View>

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
        marginTop: '5%',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },

    textInput: {
        borderWidth: 1,
        width: '75%',
        marginBottom: '2%',
        alignSelf: 'center',
        padding: '4%',
        backgroundColor: 'whitesmoke',
        borderColor: 'gray',
        borderRadius: 8,
    },

    buttonModifier : {
        alignSelf: 'center',
        width: '40%',
        marginBottom: '10%',
        borderWidth: .2,
    },

    image: {
        width: 150,
        height: 150, 
        alignSelf: 'center',
        borderRadius: 90,
        marginBottom: 10
      },
      plusIcon: {
        width: 30,
        height: 30,
        marginLeft: '60%',
        marginTop: '-12%',
        marginBottom: '10%',
        borderRadius: 30
      }
});

export default ProfilEdit;