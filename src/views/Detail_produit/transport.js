
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  Image,
  View,
  TouchableOpacity
} from 'react-native'; 
import Button from '../Composant/bouton';
import design from './../Composant/couleur';

function Transport({navigation}) {

  return (  
    <>
    <ScrollView >
    <View style={styles.container}>
      
    <ScrollView horizontal>
        <View style={styles.img_container}>
        <Image source={transport.img1} style={styles.images}/>
        </View>
        <View style={styles.img_container}>
        <Image source={transport.img2} style={styles.images}/>
        </View>
        <View style={styles.img_container}>
        <Image source={transport.img3} style={styles.images}/>
        </View>
      </ScrollView>
      <View style={styles.body_container}>
        <Text style={styles.title_details}>{transport.produit}</Text>
        <Text style={styles.text_title}>{transport.name}</Text>
        <Text style={styles.prix}>{transport.prix}</Text>
        <Text style={styles.texte_center}>Ligne: {transport.direction}</Text>
        <Text style={styles.texte_center}>Contact: +{transport.tel}</Text>
        <Text style={styles.texte_center}>Siège: {transport.lieu}</Text>
        <Text style={styles.texte_center}>Horaire: {transport.horaire}</Text>
        <Text style={styles.texte_center}>Catégorie de service: {transport.cat_srv}</Text>
        <Text style={styles.texte_center}>Offre: {transport.promo}</Text>
        <Text style={styles.description}> Description:    {transport.desc}</Text>
        <Button title={transport.boutton} onPress={() => navigation.navigate('LogIn')}/>
      </View>
    </View>
    </ScrollView>
    </>
  ); 
}
const transport = {
  name : 'Sonatra',
  produit: 'Nom du produit',
  prix: '10 000 Ar',
  tel : 261367364744,
  direction : 'Tana - Antsirabe - Fianarantsoa',
  desc : 'Nostrud enim dolor minim eu mollit cillum commodo magna. Sit pariatur anim in ex officia Lorem veniam non fugiat dolor. Quis in sit id mollit tempor ipsum.',
  lieu : 'II J htg Ambodivona',
  horaire : 'Lundi au Vendredi',
  promo : 'Tanà Antsirabe à 10 000ar',
  cat_srv : 'hdtd',
  img : require('../../assets/images/Sonatra.jpg'),
  img1: require('../../assets/images/TanaAmpefy/IMG1.jpg'),
  img2: require('../../assets/images/TanaAmpefy/IMG2.jpg'),
  img3: require('../../assets/images/TanaAmpefy/IMG3.jpg'),
  boutton : 'Faire une réservation'
};

export default Transport;

const styles = StyleSheet.create({
  images:{width:'100%', height:200},
  title_details:{color:design.Marron ,fontSize:28, fontWeight:'bold', textAlign:'center', marginVertical: '4%', fontFamily:design.police},
  texte_center:{textAlign: 'center', marginVertical: '2%', fontFamily:design.police},
  
  text_title : {
    fontSize:28,
    color:'black',
    textAlign:'center',
    textAlignVertical:'center',
    fontFamily:design.police
  },
  img_container : {
    width:340,
    height:'100%'
  },
  body_container : {
    backgroundColor : 'white',
    textAlign : 'center',
    marginTop :-20,
    borderRadius: 20
  },
  text_body : {
    fontSize: 15,
    color:'black',
    margin:5,
    fontFamily:design.police
  },
  description : {
  
    borderColor: design.Marron,
    borderWidth: 1,
    marginVertical: 12,
    marginHorizontal: 30,
    paddingVertical: 6,
    paddingHorizontal: 12,
    fontSize: 16
  },
  prix : {
    fontSize:28,
    fontWeight:'bold',
    color:design.Marron,
    textAlign:'center',
    textAlignVertical:'center',
    fontFamily:design.police
  }
  });