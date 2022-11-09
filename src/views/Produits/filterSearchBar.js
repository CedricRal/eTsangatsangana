import React from 'react';
import { View, TextInput, Text, StyleSheet, Image } from 'react-native';
import { useState } from 'react';
import Button from '../Composant/bouton';
import { useRoute } from '@react-navigation/native';

export default Searchbar = ({navigation}) => {

const route = useRoute();
const [query, setQuery] = useState('');
const handleSearch = () => {}

    return(
        <View>
            <Text style={styles.description}>Mes Commandes</Text>

            <View style={styles.inputContainer}>
            <Image 
            source={require('../../assets/icon/search.png')}
            style={{height:20, width:20}}/>
            <TextInput
            onChangeText={handleSearch}
            placeholder="Rechercher une commande"
            style={styles.placeholders}
            />
            </View>
            <Text style={styles.other}>
                Filtrer
            </Text>
            <View style={styles.dateInput}>
                <Text style={{width:90}}>Date de début</Text>
                <View >
                <TextInput 
                placeholder='12/04/22'
                style={styles.textDateInput}/>
                </View>
                <Image source={require('../../assets/icon/calendar.png')}
                style={styles.img}/>
            </View>
            <View style={styles.dateInput}>
                <Text style={{width:90}}>Date de fin</Text>
                <View >
                <TextInput 
                placeholder='12/04/22'
                style={styles.textDateInput}/>
                </View>
                <Image source={require('../../assets/icon/calendar.png')}
                style={styles.img}/>
            </View>
            <Button title='Appliquer'/>
        </View>
    )
}

const styles = StyleSheet.create({
    description : {
        color:'black',
        fontSize: 38,
        marginTop:50,
        marginBottom:20,
        textAlign:'center'
    },
    inputContainer: {
        height: 45,
        backgroundColor: 'whitesmoke',
        flexDirection: 'row',
        paddingHorizontal: 15,
        borderWidth: 0.5,
        borderColor:'grey',
        alignItems: 'center',
        width:'95%',
        alignSelf:'center'
    },
    placeholders: {
        marginLeft:18,
        fontSize:16,
    },
    other: {
        marginTop:30,
        marginBottom:10,
        textAlign:'center',
        fontSize: 24
    },
    dateInput : {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical:10,
        width:230,
    },
    textDateInput: {
        borderWidth:1, 
        marginHorizontal:20, 
        borderColor:'grey', 
        width:80
    },
    img : {
        height:30, 
        width:30
    }
})

/*  return (
    <TextInputMask
      refInput={(ref) => this.myDateText = ref;}
      type={'datetime'}
      options={{
        format: 'DD-MM-YYYY HH:mm:ss'
      }}
    />
  ) */