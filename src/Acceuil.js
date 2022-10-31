import { StyleSheet, Text, View, FlatList, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';

const MyData = [
  { 
    "id": "1",
    "name": "Nom du produit",
    "title": "produit 1",
    "image": require('../assets/MyImages/img2.jpg'),
    "resume": "résumé du produit",
  },
  { 
    "id": "2",
    "name": "Nom du produit",
    "title": "produit 2",
    "image": require('../assets/MyImages/img2.jpg'),
    "resume": "résumé du produit",
  },
  { 
    "id": "3",
    "name": "Nom du produit",
    "title": "produit 3",
    "image": require('../assets/MyImages/img2.jpg'),
    "resume": "résumé du produit",
  },
  { 
    "id": "4",
    "name": "Nom du produit",
    "title": "produit 4",
    "image": require('../assets/MyImages/img2.jpg'),
    "resume": "résumé du produit",
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
     "image": require('../assets/MyImages/img2.jpg'),
     "resume": "résumé du produit",
  },
];    

  export default function Home({navigation}) {

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
        const itemData = itemTofilter.title ? itemTofilter.title.toUpperCase() : ''.toUpperCase();
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
    
    const renderHeader = () => { // Barre de recherche 
      
        return (
            <View
        style={styles.headView}
      >
        <TextInput
          value={query}
          onChangeText={handleSearch}
          placeholder="Search"
          style={styles.inputTextView}
        />
      </View>
        )
    }

    const renderItem = ({ item }) => (
      <View style={styles.listItem}>
        <TouchableOpacity onPress={() => navigation.navigate('Hotel')}>
          <Image
            source={ item.image }
            style={styles.coverImage}
          />
        </TouchableOpacity>
        <View style={styles.textImage}>
          <Text style={styles.listItemText}>{item.title}</Text>
        </View>
      </View>
    ) 

    return (
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={renderHeader}
          data={dataS}
          keyExtractor={item => item.id}
          numColumns={numColumn}
          renderItem={renderItem}
        />
      </View>
    );
  }

  const styles = StyleSheet.create({
    
    inputTextView: { 
        backgroundColor: '#fff',
        paddingHorizontal: 20 
      },

    headView: {
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 10,
        borderRadius: 20
      },

    container: {
      flex: 1,
      backgroundColor: '#f8f8f8',
      alignItems: 'center'
    },
    text: {
      fontSize: 20,
      color: '#101010',
      marginTop: 60,
      fontWeight: '700'
    },
    listItem: {
      marginTop: 10,
      padding: 20,
      alignItems: 'center',
      backgroundColor: '#fff',
      width: '50%'
    },
    coverImage: {
        width: 150,
        height: 250,
        borderRadius: 8,
        opacity: 0.8,
      },
      textImage: {
        paddingTop: 135,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
      },
  });