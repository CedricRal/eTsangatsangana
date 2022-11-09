
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
} from 'react-native'; 
import Button from '../Composant/bouton';

function Hotel({navigation}) {

  return (  
    <>
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.title_container}>
        <Text style={styles.text_title}>
          {hotel.name}
        </Text>
      </View>
      <View style={styles.img_container}>
      <Image source={hotel.img} style={styles.images}/>
      </View>
      <View style={styles.body_container}>
        <Text style={styles.title_details}>Hôtel {hotel.name}</Text>
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
  tel : 261367364744,
  desc : 'Nostrud enim dolor minim eu mollit cillum commodo magna. Lorem commodo culpa ullamco incididunt minim fugiat velit pariatur officia. Enim esse occaecat nisi fugiat est quis duis consequat officia.',
  lieu : 'II J htg Anosy',
  horaire : 'Lundi au Vendredi',
  promo : 'Chambre classique à 280 000ar',
  cat_srv : 'hdtd',
  img : require('../../assets/images/Carlton.jpg'),
  boutton : 'Faire une réservation'
}

export default Hotel;


const styles = StyleSheet.create({
  images:{width:'100%', height:200},
  title_details:{fontSize:30, fontWeight:'bold', textAlign:'center', marginVertical: 10},
  texte_center:{textAlign: 'center', marginVertical: 4},
  container : {
    flex : 1,
    marginHorizontal : 10,
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