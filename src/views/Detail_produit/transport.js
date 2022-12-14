
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

function Transport({navigation}) {

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
    <ScrollView >
    <View style={styles.container}>
      
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
        <Text style={styles.title_details}>{transport.produit}</Text>
        <Text style={styles.text_title}>{transport.name}</Text>
        <Text style={styles.prix}>{transport.prix}</Text>
        <Text style={styles.texte_center}>{t('langues:line')}: {transport.direction}</Text>
        <Text style={styles.texte_center}>{t('langues:contact')}: +{transport.tel}</Text>
        <Text style={styles.texte_center}>{t('langues:seat')}: {transport.lieu}</Text>
        <Text style={styles.texte_center}>{t('langues:schedule')}: {transport.horaire}</Text>
        <Text style={styles.texte_center}>{t('langues:category')}: {transport.cat_srv}</Text>
        <Text style={styles.texte_center}>{t('langues:offer')}: {transport.promo}</Text>
        <Text style={styles.description}> {t('langues:description')}:    {transport.desc}</Text>
        <Button title={t('langues:reserv')} onPress={() => navigation.navigate('LogIn')}/>
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
};
const images = [
  require('../../assets/images/TanaAmpefy/IMG1.jpg'),
  require('../../assets/images/TanaAmpefy/IMG2.jpg'),
  require('../../assets/images/TanaAmpefy/IMG3.jpg'),
]

export default Transport;

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
  texte_center:{
    textAlign: 'center', 
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
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    marginTop:-60
  }
  });