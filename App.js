import { StyleSheet, Text, View, FlatList, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import AppStyles from './styles/App_style';

const MyData = [
  { 
    "id": "1",
    "name": "Nuggets",
    "title": "Promo 10%",
    "image": require('./assets/MyImages/nuggets.png'),
    "resume": "03256452",
  },
  { 
    "id": "2",
    "name": "Pizza GM",
    "title": "acheté = 1 PM offert",
    "image": require('./assets/MyImages/pizza.png'),
    "resume": "032564684",
  },
  { 
    "id": "3",
    "name": "chez hotel Mercury",
    "title": "chambre à 280 000 ariary",
    "image": require('./assets/MyImages/hotel.png'),
    "resume": "Hotelerie",
  },
  { 
    "id": "4",
    "name": "Tana à Antsirabe à 10 000 ariary",
    "title": "transporteur",
    "image": require('./assets/MyImages/transport.png'),
    "resume": "0345579879",
  },
  { 
    "id": "5",
    "name": "Nom du produit",
    "title": "produit 5",
    "image": require('./assets/MyImages/img2.jpg'),
    "resume": "résumé du produit",
  },
  { 
     "id": "6",
     "name": "Nom du produit",
     "title": "produit 6",
     "image": require('./assets/MyImages/img1.jpg'),
     "resume": "résumé du produit",
  },
];    

  export default function Test() {

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
        // ra tsis occurence dia X.indexOf(Y) = 0+ ka mi-return TRUE satria 0+ > -1 
        // ra tsis kosa dia X.indexOf(Y) = -1 dia mi-return FALSE satria -1 > -1 dia DISO
      });
      setDataS(filteredData);
      setQuery(textTypedByTheUser)
    } else {
      setDataS(fullData);
      setQuery(textTypedByTheUser)
    }
  }  
    const numColumn = 2
    
    const renderItem = ({ item }) => (
      <View style={AppStyles.listItem}>
        <TouchableOpacity onPress={() => Alert.alert('Description')}>
          <Image
            source={ item.image }
            style={AppStyles.coverImage}
          />
        </TouchableOpacity>
        <View style={AppStyles.textImage}>
          <Text style={AppStyles.listItemText}>{item.name}</Text>
          <Text style={AppStyles.listItemText}>{item.title}</Text>
          <Text style={AppStyles.listItemText}>{item.resume}</Text>
        </View>
      </View>
    ) 

    return (
      <View style={AppStyles.container}>
        <FlatList
          ListHeaderComponent={ 
          <TextInput
          value={query}
          onChangeText={handleSearch}
          placeholder="Search"
          style={AppStyles.inputTextView}
        />
      }
          data={dataS}
          numColumns={numColumn}
          renderItem={renderItem}
        />
      </View>
    );
  }