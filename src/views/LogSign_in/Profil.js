import React, {useState, useEffect} from 'react';
import { Image, StyleSheet,Alert, Text, View, Button, TouchableOpacity, ScrollView} from 'react-native';

export default function Profil({navigation}) {

    const [edit, setEdit] = useState(false);


    return (
    <ScrollView> 
    <View style={styles.container}>
        <Image
          style={styles.profileImage}
          resizeMode="cover"
          source={require('../../../assets/MyImages/img2.jpg')}
        />
        
        <TouchableOpacity><Image style={styles.editingIcon}
            source={require('../../../assets/MyImages/EditIcon.jpg')}
            />
        </TouchableOpacity>
        <View style={styles.container1}>
            <Text>Vina</Text>
        </View>
        <View style={styles.container2}>
            <Text>Master</Text>
        </View>
        <View style={styles.container3}>
            <Text>IVD Soavimbaoka</Text>
        </View>
        <View style={styles.container4}>
            <Text>Vina@vinamaster.com</Text>
        </View>
        <View style={styles.container5}>
            <Text>+261348563212</Text>
        </View>
        <View style={styles.container6}>
            <Text>*******</Text>
        </View>
        
        <Button title='Edit'
            onPress={() => {
                Alert.alert('Modifier le profil')
            }}/>
        
        </View>
        </ScrollView>

 );
  
};



const styles = StyleSheet.create({
    pressButton: {
        fontSize: 1000
    },
    container: {
        flex:1,
        margin: 100,
    },
    
    profileImage: {
        height: 150,
        width: 150,
        marginBottom: 5,
        alignItems: 'center',
        borderRadius: 100
      },

      editingIcon: {
        height: 20,
        width: 20,
        marginTop: -25,
        marginBottom: 25,
        marginLeft: 120,

      },

    container1: {
        padding: 5,
        margin: 2,
        marginBottom:5,
        borderWidth:1
    },
    container2: {
        padding: 5,
        borderWidth:1,
        margin: 2,
        marginBottom:5,
    },
    container3: {
        padding: 5,
        margin: 2,
        borderWidth:1,
        marginBottom:5,
    },
    container4: {
        padding: 5,
        margin: 2,
        borderWidth:1,
        marginBottom:5,
    },
    container5: {
        padding: 5,
        margin: 2,
        borderWidth:1,
        marginBottom:5,
    },
    container6: {
        padding: 5,
        margin: 2,
        borderWidth:1,
        marginBottom:5,
    },
});