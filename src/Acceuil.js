import { Text, View, FlatList, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import AppStyles from '../styles/App_style';
import { Modal } from 'react-native';
import FiltrePub from './views/Composant/SearchBar';
import Button from './views/Composant/bouton';

const MyData = [
  { 
    "id": "1",
    "name": "Nuggets",
    "title": "Promo 10%",
    "image": require('../assets/MyImages/nuggets.png'),
    "resume": "03256452",
  },
  { 
    "id": "2",
    "name": "Pizza GM",
    "title": "acheté = 1 PM offert",
    "image": require('../assets/MyImages/pizza.png'),
    "resume": "032564684",
  },
  { 
    "id": "3",
    "name": "chez hotel Mercury",
    "title": "chambre à 280 000 ariary",
    "image": require('../assets/MyImages/hotel.png'),
    "resume": "Hotelerie",
  },
  { 
    "id": "4",
    "name": "Tana à Antsirabe à 10 000 ariary",
    "title": "transporteur",
    "image": require('../assets/MyImages/transport.png'),
    "resume": "0345579879",
  },
  { 
    "id": "5",
    "name": "Nom du produit",
    "title": "produit 5",
    "image": require('../assets/MyImages/img2.jpg'),
    "resume": "résumé du produit",
  },
  { 
     "id": "6",
     "name": "Nom du produit",
     "title": "produit 6",
     "image": require('../assets/MyImages/img1.jpg'),
     "resume": "résumé du produit",
  },
];    
  export default function App({navigation}) {

    const [dataS, setDataS] = useState([]); // tableau vide anasiana an'ny MyData ef vo-filter @ recherche Utilisateur

    const [query, setQuery] = useState(''); // ilay frappern user @ barre de recherche (String)
    
    const [fullData, setFullData] = useState([]); // tableau vide ametrahana ny donnée rehetra (MyData)

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
      <View style={AppStyles.listItem}>
        <TouchableOpacity onPress={() => 
          {if(item.id=='3' || item.id=='5') {
            navigation.navigate('Hotel')}
          else if(item.id=='1' || item.id=='2'){
            navigation.navigate('Restaurant')}
          else if(item.id=='4' || item.id=='6'){
            navigation.navigate('Transport')
          }}}
          style={AppStyles.touchableStyle}>
        
          <Image
            source={ item.image }
            style={AppStyles.coverImage}
          />
          <View style={AppStyles.textImage}>
            <Text style={AppStyles.listItemText}>{item.name}</Text>
            <Text style={AppStyles.listItemText}>{item.title}</Text>
            <Text style={AppStyles.listItemText}>{item.resume}</Text>
          </View>
          </TouchableOpacity>
        </View>
    )}

    const empty_list = () => {
      return (<Text style={{textAlign:'center'}}> Nous n'avions trouvé aucun produit correspondant à <Text style={{fontWeight: 'bold'}}>{query}</Text></Text>)
    }
    const [modalVisible, setModalVisible] = useState(false);

    return (
      <View style={AppStyles.container}>
        <FlatList
          ListHeaderComponent={
          <>
          <View style={AppStyles.searchImageAndTextinput}>

            <Image source={require('./assets/icon/search.png')}
              style={AppStyles.searchImageStyle}
              />
            <TextInput
              value={query}
              onChangeText={handleSearch}
              placeholder="Rechercher un produit"
              style={AppStyles.inputTextView}
            />
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Image 
                source={require('./assets/icon/filter-icon.png')}   //touchableOpacity ici cache ou montre l'option de filtre de recherche
                style={{width:30, height:30, marginLeft:1, marginVertical:7}}/> 
            </TouchableOpacity>

        </View>
        <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
          <View style={{backgroundColor:'whitesmoke'}}>
            <FiltrePub/>
            <Button title='Appliquer' onPress={() => setModalVisible(!modalVisible)}/>
          </View>
        </Modal>
        </>
      }
          ListEmptyComponent={empty_list}
          data={dataS}
          numColumns={numColumn}
          renderItem={renderItem}
        />
      </View>
    );
  }
