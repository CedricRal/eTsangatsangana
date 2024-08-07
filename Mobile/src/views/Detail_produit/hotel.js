
import React, {useState, useLayoutEffect} from 'react';
import { ScrollView, StyleSheet, Text, Image, View, Dimensions, TouchableOpacity,  ActivityIndicator } from 'react-native'; 
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Button from '../Composant/bouton';
import design from './../Composant/couleur';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { formatPhoneNumber, formatTime } from '../Composant/Format';
import { useOneEtp } from '../../hooks/query';
import AppStyles from '../../../styles/App_style';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Hotel({navigation}) {

  const {t} = useTranslation();
  const [index, setIndex] = React.useState(0);
  const route = useRoute();

  console.log('route =' ,route.params.idEtp);
  const { oneEtpData, oneEtpLoading, oneEtpError } = useOneEtp(route.params.idEtp);

  const hotel = {
    name : route.params.entreprise,
    prix : route.params.prix,
    produit: route.params.produit,
    tel : oneEtpData? oneEtpData.getOneEntreprise.tel : '',
    desc : oneEtpData? oneEtpData.getOneEntreprise.description : '',
    lieu : oneEtpData? oneEtpData.getOneEntreprise.adresse : '',
    horaire : 'De ' + formatTime(oneEtpData? oneEtpData.getOneEntreprise.heure_ouverture : '') + ' à ' + formatTime(oneEtpData? oneEtpData.getOneEntreprise.heure_fermeture : ''),
    promo : 'Chambre classique à 280 000ar',
    cat_srv : oneEtpData? oneEtpData.getOneEntreprise.type_service : '',
  }
  console.log(oneEtpData, oneEtpLoading, JSON.stringify(oneEtpError, null, 2))
  const images = route.params.images;

  renderItem = ({item,index}) => {
    return (
      <View style={styles.img_container}>
      <Image source={{uri:item}} style={styles.images}/>
      </View>
    )
  };

  const [token, setToken] = React.useState(null);

  const loadToken = async() => {
      try {
          const token = await AsyncStorage.getItem("myToken");    //prendre myToken dans AsyncStorage
          if(token !== null){    //condition si token existe déjà dans AsyncStorage
            setToken(token);
          };
      } catch (error) {
          alert(error);
      }
  };
  useLayoutEffect(() => {     //execute la fonction loadToken dès que la page LogIn se lance
      console.log('Screen opened')
      loadToken();
  },[]);

  if(oneEtpLoading) return (<ActivityIndicator size={'large'} color={design.Vert} style={AppStyles.loader}/>)

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
        <Text style={styles.title_details}>{hotel.produit}</Text>
        <Text style={styles.text_title}>{hotel.name}</Text>
        <Text style={styles.prix}>{hotel.prix.toLocaleString('fr-FR')} ar</Text>
        <Text style={styles.texte_center}>{t('langues:contact')}: {formatPhoneNumber(hotel.tel)}</Text>
        <Text style={styles.texte_center}>{t('langues:seat')}: {hotel.lieu}</Text>
        <Text style={styles.texte_center}>{t('langues:schedule')}: {hotel.horaire}</Text>
        <Text style={styles.texte_center}>{t('langues:category')}: {hotel.cat_srv}</Text>
        <Text style={styles.description}> {t('langues:description')}:    {hotel.desc}</Text>
        <Button title={t('langues:reserv')} onPress={() => {
          if(token !== null){
            navigation.navigate('detailCmd',{
              type:'hotel',
              entreprise:hotel.name,
              produit:hotel.produit,
              prix:hotel.prix,
              idPub:route.params.idPub,
              idEtp:route.params.idEtp,
              idProduit:route.params.idProduit
          });
          } else{
            navigation.navigate('LogIn', {
              type:'hotel',
              entreprise:hotel.name,
              produit:hotel.produit,
              prix:hotel.prix,
              idPub:route.params.idPub,
              idEtp:route.params.idEtp,
              idProduit:route.params.idProduit
        });}}}/>
      </View>
    </View>
    </ScrollView>
    </>
  );
}


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
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    marginTop:-60
  }
  });