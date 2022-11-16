
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

function Restaurant({navigation}) {

  return (  
    <>
    <ScrollView>
    <View>
      
      <ScrollView horizontal>
        <View style={styles.img_container}>
        <Image source={restaurant.img1} style={styles.images}/>
        </View>
        <View style={styles.img_container}>
        <Image source={restaurant.img2} style={styles.images}/>
        </View>
        <View style={styles.img_container}>
        <Image source={restaurant.img3} style={styles.images}/>
        </View>
      </ScrollView>
      <View style={styles.body_container}>
      <Text style={styles.title_details}>{restaurant.produit}</Text>
        <Text style={styles.text_title}>{restaurant.name}</Text>
        <Text style={styles.prix}>{restaurant.prix}</Text>
        <Text style={styles.texte_center}>{restaurant.def}</Text>
        <Text style={styles.texte_center}>Contact: +{restaurant.tel}</Text>
        <Text style={styles.texte_center}>Siège: {restaurant.lieu}</Text>
        <Text style={styles.texte_center}>Horaire: {restaurant.horaire}</Text>
        <Text style={styles.texte_center}>Catégorie de service: {restaurant.cat_srv}</Text>
        <Text style={styles.texte_center}>Offre: {restaurant.promo}</Text>
        <Text style={styles.description}> Description:    {restaurant.desc}</Text>
        <Button title={restaurant.boutton} onPress={() => navigation.navigate('LogIn')}/>
      </View>
    </View>
    </ScrollView>
    </>
  ); 
}

const restaurant = {
  name : 'KFC Madagascar',
  produit: 'Nom du produit',
  prix: '21 000 Ar',
  def : 'restaurantt spécialiste en poulet',
  tel : 261367364744,
  desc : 'Lorem commodo culpa ullamco incididunt minim fugiat velit pariatur officia. Do ut amet sit mollit commodo elit.',
  lieu : 'II J htg Ankorondrano',
  horaire : 'Lundi au Vendredi',
  promo : 'Nuggets  -15% soit 21 000ar',
  cat_srv : 'hdtd',
  img : require('../../assets/images/KFC.jpg'),
  img1: require('../../assets/images/Burger/IMG_5765.jpg'),
  img2: require('../../assets/images/Burger/IMG_5781.jpg'),
  img3: require('../../assets/images/Burger/IMG_5782.jpg'),
  boutton : 'Passer une commande' 
} 
export default Restaurant;


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