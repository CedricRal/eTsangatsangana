
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

function Restaurant({navigation}) {

  return (  
    <>
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.title_container}>
        <Text style={styles.text_title}>
          {restaurant.name}
        </Text>
      </View>
      <View style={styles.img_container}>
      <Image source={restaurant.img} style={styles.images}/>
      </View>
      <View style={styles.body_container}>
        <Text style={styles.title_details}>{restaurant.name}</Text>
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
  def : 'restaurantt spécialiste en poulet',
  tel : 261367364744,
  desc : 'Lorem commodo culpa ullamco incididunt minim fugiat velit pariatur officia. Do ut amet sit mollit commodo elit.',
  lieu : 'II J htg Ankorondrano',
  horaire : 'Lundi au Vendredi',
  promo : 'Nuggets  -15% soit 21 000ar',
  cat_srv : 'hdtd',
  img : require('../../assets/images/KFC.jpg'),
  boutton : 'Passer une commande' 
} 
export default Restaurant;


const styles = StyleSheet.create({
  images:{width:'100%', height:200},
  title_details:{fontSize:30, fontWeight:'bold', textAlign:'center', marginVertical: 10},
  texte_center:{textAlign: 'center', marginVertical: 4},
  container : {
    flex : 1,
    marginHorizontal : 10
  },
  title_container : {
    flex : 0.5,
    backgroundColor : 'skyblue',
  },
  text_title : {
    fontSize:30,
    fontWeight:'bold',
    color:'white',
    textAlign:'center',
    marginTop : 5
  },
  img_container : {
    flex : 3,
  },
  tex_body : {
    fontSize: 15,
    color:'black'
  },
  body_container : {
    flex : 2.5,
    backgroundColor : 'white',
    textAlign : 'center'
  },
  text_body : {
    fontSize: 15,
    color:'black',
    margin:5
  },
  description : {
  
    borderColor: 'black',
    borderWidth: 1,
    marginVertical: 12,
    marginHorizontal: 30,
    paddingVertical: 6,
    paddingHorizontal: 12,
    fontSize: 16
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: 'tomato',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 320,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
  
  });