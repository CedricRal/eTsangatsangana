
import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';



export default class Header extends React.Component {


  render() {
  }
}

const styles = StyleSheet.create({
    header : {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText : {
        fontWeight: 'bold',
        fontSize: 20,
        letterSpacing: 1,
    }
})


/*export default function Hotel() {
  const name = 'Carlton';
  const tel = 13245;
  const lieu = 'II J htg Arttjf';
  const horaire = 'Lundi au Vendredi'
  const cat_srv = 'hdtd'
    return (
        <>
        <View >
          <Text>{name}</Text>
          <Text>Contact: {tel}</Text>
          <Text>Siège: {lieu}</Text>
          <Text>Horaire: {horaire}</Text>
          <Text>Catégorie de service: {cat_srv}</Text>
          <Button title='Reserver'/>
        </View>
        </>  
    ); 
} */