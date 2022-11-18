
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
} from 'react-native'; 
import Button from '../Composant/bouton';
import design from './../Composant/couleur';

function Hotel({navigation}) {

  return (  
    <>
    <ScrollView>
    <View >
      
      <ScrollView horizontal>
        <View style={styles.img_container}>
        <Image source={hotel.img1} style={styles.images}/>
        </View>
        <View style={styles.img_container}>
        <Image source={hotel.img2} style={styles.images}/>
        </View>
        <View style={styles.img_container}>
        <Image source={hotel.img3} style={styles.images}/>
        </View>
      </ScrollView>
      <View style={styles.body_container}>
        <Text style={styles.title_details}>{hotel.produit}</Text>
        <Text style={styles.text_title}>{hotel.name}</Text>
        <Text style={styles.prix}>{hotel.prix}</Text>
        <Text style={styles.texte_center}>Contact: +{hotel.tel}</Text>
        <Text style={styles.texte_center}>Siège: {hotel.lieu}</Text>
        <Text style={styles.texte_center}>Horaire: {hotel.horaire}</Text>
        <Text style={styles.texte_center}>Catégorie de service: {hotel.cat_srv}</Text>
        <Text style={styles.texte_center}>Offre: {hotel.promo}</Text>
        <Text style={styles.description}> Description:    {hotel.desc}</Text>
        <Button title={hotel.boutton} onPress={() => navigation.navigate('LogIn')}/>
      </View>
    </View>
    </ScrollView>
    </>
  ); 
}

const hotel = {
  name : 'Carlton',
  prix : '150 000 Ar',
  produit: 'Nom du produit',
  tel : 261367364744,
  desc : 'Nostrud enim dolor minim eu mollit cillum commodo magna. Lorem commodo culpa ullamco incididunt minim fugiat velit pariatur officia. Enim esse occaecat nisi fugiat est quis duis consequat officia.',
  lieu : 'II J htg Anosy',
  horaire : 'Lundi au Vendredi',
  promo : 'Chambre classique à 280 000ar',
  cat_srv : 'hdtd',
  img : require('../../assets/images/Carlton.jpg'),
  img1: require('../../assets/images/Chambre_Hôtel/IMG_5783.jpg'),
  img2: require('../../assets/images/Chambre_Hôtel/IMG_5784.jpg'),
  img3: require('../../assets/images/Chambre_Hôtel/IMG_5785.jpg'),
  boutton : 'Faire une réservation'
}

export default Hotel;


const styles = StyleSheet.create({
  images:{width:'100%', height:200},
  title_details:{color:design.Marron ,fontSize:28, fontWeight:'bold', textAlign:'center', marginVertical: '4%', fontFamily:design.police},
  texte_center:{textAlign: 'center', marginVertical: '2%', fontFamily:design.police},
  
  text_title : {
    fontSize:28,
    color:design.Marron,
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
    color:design.Vert,
    textAlign:'center',
    textAlignVertical:'center',
    fontFamily:design.police
  }
  });