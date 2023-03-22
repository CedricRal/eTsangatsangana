import React, { useState } from 'react';
import {View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

export default ModifierImage = () => {

    const [fileData, setFileData] = useState(null);
  
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

          <View >
            <View>
              {renderFileData()}
            </View>
          <View>
            <TouchableOpacity onPress={() => {
              launchNativeImageLibrary()}} >
                <Image style={styles.plusIcon}
                  source={require('../assets/MyImages/plus.jpg')}
                />
            </TouchableOpacity>
            </View>
        </View>
            

    )
  };

const styles = StyleSheet.create ( {
 
  image: {
    width: 150,
    height: 150, 
    alignSelf: 'center',
    borderRadius: 35,
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
}  
)