
import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  TouchableOpacity
} from 'react-native'; 
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Button from '../Composant/bouton';
import design from './../Composant/couleur';
import Icon from 'react-native-vector-icons/FontAwesome5';

function Hotel({navigation}) {

  const [index, setIndex] = React.useState(0)

  renderItem = ({item,index}) => {
    return (
      <View style={styles.img_container}>
      <Image source={item} style={styles.images}/>
      </View>
    )
  };

  return (  
    <>
    <ScrollView>
    <View >
      <Carousel
      layout={"default"}
      ref={ref => carousel = ref}
      data={images}
      sliderWidth={Width}
      itemWidth={Width}
      onSnapToItem={(index) => setIndex(index)}
      renderItem={renderItem}
      />
      <View style={styles.Nextprev_container}>
        <TouchableOpacity onPress={() => { carousel.snapToPrev(); }}>
        <Icon name='chevron-left' size={50} color='rgba(0, 0, 0, 0.75)'/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { carousel.snapToNext(); }} style={styles.nextIcon}>
        <Icon name='chevron-right' size={50} color='rgba(0, 0, 0, 0.75)'/>
        </TouchableOpacity>
      </View>
      <Pagination
          dotsLength={images.length}
          activeDotIndex={index}
          containerStyle={styles.pagination}
          dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 20,
              backgroundColor: 'rgba(255, 255, 255, 0.92)'
          }}
          inactiveDotStyle={{
              // Define styles for inactive dots here
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      
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
  boutton : 'Faire une réservation'
}
const images = [
  require('../../assets/images/Chambre_Hôtel/IMG_5783.jpg'),
  require('../../assets/images/Chambre_Hôtel/IMG_5784.jpg'),
  require('../../assets/images/Chambre_Hôtel/IMG_5785.jpg'),
]

export default Hotel;

const Width = Dimensions.get('screen').width;
const Height = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  images:{
    width:Width,
    height:Height * 0.30,
    resizeMode:'cover',
  },
  title_details:{color:design.Marron ,
    fontSize:28, 
    fontWeight:'bold', 
    textAlign:'center', 
    marginVertical: '4%', 
    fontFamily:design.police},
  texte_center:{textAlign: 'center', 
    marginVertical: '2%', 
    fontFamily:design.police},
  
  text_title : {
    fontSize:28,
    color:design.Marron,
    textAlign:'center',
    textAlignVertical:'center',
    fontFamily:design.police
  },
  img_container : {
    width:Width,
    height: Height * 0.30
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
  },
  Nextprev_container : {
    flexDirection:'row',
    position:'absolute',
    marginVertical:Height * 0.12,
    marginHorizontal:Width*0.1
  },
  nextIcon : {marginLeft:Width*0.62},
  pagination : {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    marginTop:-60
  }
  });