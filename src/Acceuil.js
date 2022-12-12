import { Text, View, FlatList, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import AppStyles from '../styles/App_style';
import { Modal } from 'react-native';
import FiltrePub from './views/Composant/SearchBar';
import Button from './views/Composant/bouton';
import { ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import design from './views/Composant/couleur';
import { useTranslation } from 'react-i18next';

const MyData = [
  { 
    "id": "1",
    "name": "Nuggets",
    "title": "Chicky",
    "image": require('../assets/MyImages/nuggets.png'),
    "prix": "21 000 Ar",
  },
  { 
    "id": "2",
    "name": "Pizza GM",
    "title": "Gastro Pizza",
    "image": require('../assets/MyImages/pizza.png'),
    "prix": "24 000 Ar",
  },
  { 
    "id": "3",
    "name": "Chambre comfort",
    "title": "Mercury",
    "image": require('../assets/MyImages/hotel.png'),
    "prix": "180 000 Ar",
  },
  { 
    "id": "4",
    "name": "Tana à Antsirabe",
    "title": "Soa Trans",
    "image": require('../assets/MyImages/transport.png'),
    "prix": "10 000 Ar",
  },
  { 
    "id": "5",
    "name": "Nom du produit",
    "title": "Entreprise",
    "image": require('../assets/MyImages/img2.jpg'),
    "prix": "50 000 Ar",
  },
  { 
     "id": "6",
     "name": "Nom du produit",
     "title": "Entreprise",
     "image": require('../assets/MyImages/img1.jpg'),
     "prix": "50 000 Ar",
  },
];    
  export default function App({navigation}) {

    const [dataS, setDataS] = useState([]); // tableau vide anasiana an'ny MyData ef vo-filter @ recherche Utilisateur

    const [query, setQuery] = useState(''); // ilay frappern user @ barre de recherche (String)
    
    const [fullData, setFullData] = useState([]); // tableau vide ametrahana ny donnée rehetra (MyData)

    const {t} = useTranslation();

    useEffect(() => {
      setDataS(MyData);
      setFullData(MyData);
    }, [])
    
    // Mandray ny frappe utilisateur @ barre dia manao filtrage
    const handleSearch = (textTypedByTheUser) => { // textTypedByTheUser dia paramètre mandray ny avy @ <Textinput onChangeText={} />
      
      if (textTypedByTheUser) {
      const filteredData = fullData.filter((itemTofilter) => { // fullData dia mis an'ny Donnée rehetra
        const itemData = itemTofilter.name ? itemTofilter.name.toUpperCase() : ''.toUpperCase();
        const formattedQuery = textTypedByTheUser.toUpperCase(); // Ilay zvtr frappen utilisateur ef vo-formaty(vovadika upperCase)
        return itemData.indexOf(formattedQuery) > -1 // indexOf dia mireturn -1 ra ohtr ts mahita occurence iz 
        // ra mis occurence dia X.indexOf(Y) = 0+ ka mi-return TRUE satria 0+ > -1 
        // ra tsis kosa dia X.indexOf(Y) = -1 dia mi-return FALSE satria -1 > -1 dia DISO
      });
      setDataS(filteredData);
      setQuery(textTypedByTheUser)
    } else {
      setDataS(fullData);
      setQuery(textTypedByTheUser);
    }
  }  
    const numColumn = 2

   
    const renderItem = ({ item }) => { 
      
    return (
        <TouchableOpacity onPress={() => 
          {if(item.id=='3' || item.id=='5') {
            navigation.navigate('Hotel')}
          else if(item.id=='1' || item.id=='2'){
            navigation.navigate('Restaurant')}
          else if(item.id=='4' || item.id=='6'){
            navigation.navigate('Transport')
          }}}
          style={AppStyles.touchableStyle}>
          <View>
          <Image
            source={ item.image }
            resizeMode={'cover'}
            style={AppStyles.coverImage}
          />
          <View style={AppStyles.textImage}>
            <Text style={AppStyles.produit}>{item.name}</Text>
            <Text style={AppStyles.entreprise}>{item.title}</Text>
            <Text style={AppStyles.prix}>{item.prix}</Text>
          </View>
          </View>
          </TouchableOpacity>
    )}

    const empty_list = () => {
      return (<Text style={AppStyles.emptyList}> Nous n'avions trouvé aucun produit correspondant à <Text style={{fontWeight: 'bold'}}>{query}</Text></Text>)
    }
    const [modalVisible, setModalVisible] = useState(false);

    return (
      <View>
        <FlatList
          ListHeaderComponent={
          <>


          <View style={AppStyles.searchView}>
            <View style={AppStyles.inputContainer}>
            <Icon 
            name='search'    //tout le composant bar de recherche ici
            size={20} color={design.Marron}/>
            <TextInput
            value={query}
            onChangeText={handleSearch}
            placeholder={t('home:search')}
            style={AppStyles.placeholders}
            />
            </View>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Icon 
                name='sliders-h'   //touchableOpacity ici cache ou montre l'option de filtre de recherche
                size={30} color={design.Marron} style={{marginVertical:'20%'}}/> 
            </TouchableOpacity>
          </View>

        <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
          <ScrollView style={{backgroundColor:'whitesmoke'}}>
            <FiltrePub/>
            <Button title={t('home:buttonApply')} onPress={() => setModalVisible(!modalVisible)}/>
          </ScrollView>
        </Modal>
        </>
      }
          ListEmptyComponent={empty_list}
          data={dataS}
          numColumns={numColumn}
          renderItem={renderItem}
          style={AppStyles.flatList}
          ListFooterComponent={<Text style={{height:20, backgroundColor:design.Blanc}}/>}
        />
      </View>
    );
  }
