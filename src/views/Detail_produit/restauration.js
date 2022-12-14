
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  View,
  TouchableOpacity
} from 'react-native'; 
import Button from '../Composant/bouton';
import design from './../Composant/couleur';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import { useTranslation } from 'react-i18next';

function Restaurant({navigation}) {

  const {t} = useTranslation();
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
    <View>
      
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
        <Icon name='chevron-left' size={50} color='rgba(255, 255, 255, 0.75)'/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { carousel.snapToNext(); }} style={styles.nextIcon}>
        <Icon name='chevron-right' size={50} color='rgba(255, 255, 255, 0.75)'/>
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
      <Text style={styles.title_details}>{restaurant.produit}</Text>
        <Text style={styles.text_title}>{restaurant.name}</Text>
        <Text style={styles.prix}>{restaurant.prix}</Text>
        <Text style={styles.texte_center}>{restaurant.def}</Text>
        <Text style={styles.texte_center}>{t('langues:contact')}: +{restaurant.tel}</Text>
        <Text style={styles.texte_center}>{t('langues:seat')}: {restaurant.lieu}</Text>
        <Text style={styles.texte_center}>{t('langues:schedule')}: {restaurant.horaire}</Text>
        <Text style={styles.texte_center}>{t('langues:category')}: {restaurant.cat_srv}</Text>
        <Text style={styles.texte_center}>{t('langues:offer')}: {restaurant.promo}</Text>
        <Text style={styles.description}> {t('langues:description')}:    {restaurant.desc}</Text>
        <Button title={t('langues:passCommand')} onPress={() => navigation.navigate('LogIn')}/>
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
  def : 'restaurant spécialiste en poulet',
  tel : 261367364744,
  desc : 'Lorem commodo culpa ullamco incididunt minim fugiat velit pariatur officia. Do ut amet sit mollit commodo elit.',
  lieu : 'II J htg Ankorondrano',
  horaire : 'Lundi au Vendredi',
  promo : 'Nuggets  -15% soit 21 000ar',
  cat_srv : 'hdtd',
  boutton : 'Passer une commande' 
} 

const images = [
  require('../../assets/images/Burger/IMG_5765.jpg'),
  require('../../assets/images/Burger/IMG_5781.jpg'),
  require('../../assets/images/Burger/IMG_5782.jpg'),
]

export default Restaurant;

const Width = Dimensions.get('screen').width;
const Height = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  images:{
    width:Width,
    height:Height * 0.30,
    resizeMode:'cover',
  },
  title_details:{color:design.Marron ,
    fontSize:28, fontWeight:'bold', 
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