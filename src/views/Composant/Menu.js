import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, TextInput, Modal, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import design from './couleur';
import { RadioButton } from 'react-native-paper';
import AppStyles from '../../../styles/App_style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Button from './bouton';


const Langue = [
    {
        nom: 'Anglais',
        drapeau: require('../../assets/drapeau/uk.png')
    },
    {
        nom: 'Français',
        drapeau: require('../../assets/drapeau/fr.png')
    },
]

const Menu = () => {
    const [checked, setChecked] = useState('');

    const [data, setData] = useState([]); // tableau vide anasiana an'ny MyData ef vo-filter @ recherche Utilisateur

    const [query, setQuery] = useState(''); // ilay frappern user @ barre de recherche (String)
    
    const [fullData, setFullData] = useState([]); // tableau vide ametrahana ny donnée rehetra (MyData)

    useEffect(() => {
      setData(Langue);
      setFullData(Langue);
    }, [])
    
    // Mandray ny frappe utilisateur @ barre dia manao filtrage
    const handleSearch = (textTypedByTheUser) => { // textTypedByTheUser dia paramètre mandray ny avy @ <Textinput onChangeText={} />
      
      if (textTypedByTheUser) {
      const filteredData = fullData.filter((itemTofilter) => { // fullData dia mis an'ny Donnée rehetra
        const itemData = itemTofilter.nom ? itemTofilter.nom.toUpperCase() : ''.toUpperCase();
        const formattedQuery = textTypedByTheUser.toUpperCase(); // Ilay zvtr frappen utilisateur ef vo-formaty(vovadika upperCase)
        return itemData.indexOf(formattedQuery) > -1 // indexOf dia mireturn -1 ra ohtr ts mahita occurence iz 
        // ra mis occurence dia X.indexOf(Y) = 0+ ka mi-return TRUE satria 0+ > -1 
        // ra tsis kosa dia X.indexOf(Y) = -1 dia mi-return FALSE satria -1 > -1 dia DISO
      });
      setData(filteredData);
      setQuery(textTypedByTheUser)
    } else {
      setData(fullData);
      setQuery(textTypedByTheUser);
    }
  }

    const empty_list = () => {
        return (<Text style={AppStyles.emptyList}> Nous n'avions trouvé aucune langue correspondante à <Text style={{fontWeight: 'bold'}}>{query}</Text></Text>)
    }

    renderItem = ({item}) => {
            return(
            <TouchableOpacity
                style={styles.radioView}
                onPress={() => setChecked(item.nom)} 
                >
                <Image source={item.drapeau} style={styles.img}/>
                <Text style={styles.labelStyle}> {item.nom} </Text>
                <RadioButton
                    value={item.nom} 
                    status={ checked === item.nom ? 'checked' : 'unchecked' }
                    onPress={() => setChecked(item.nom)}
            />
            </TouchableOpacity>)
    }
    Footer = () => {
        return(
            <View style={styles.footer}>
            <Button title={'Appliquer'}/>
            </View>
        )
    }

    return(
        <>

        <FlatList
        ListHeaderComponent={
            <View style={AppStyles.searchView}>
              <View style={styles.inputContainer}>
              <Icon 
              name='search'    //tout le composant bar de recherche ici
              size={20} color={design.Marron}/>
              <TextInput
              value={query}
              onChangeText={handleSearch}
              placeholder="Rechercher une langue"
              style={AppStyles.placeholders}
              />
              </View>
            </View>
        }
        ListEmptyComponent={empty_list}
        data={data}
        renderItem={renderItem}
        ListFooterComponent={Footer}
        style={styles.flatList}
        />
        </>
    )
}

export default Menu;

const styles = StyleSheet.create({
    radioView: {
        width: '100%',
        flexDirection:'row',
        alignItems: 'center',
        marginVertical: '8%',
        paddingVertical: 2,
        paddingHorizontal: 8,
        borderRadius: 8,
    },
    labelStyle: {
      fontSize: 18,
      marginLeft: '8%',
      width: '73%',
    },
    img:{
        width: 35,
        height: 20,
        borderRadius: 5
    },
    inputContainer: {
        height: 45,
        backgroundColor: 'whitesmoke',
        marginRight:10,
        flexDirection: 'row',
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor:design.Marron,
        borderRadius:10,
        alignItems: 'center',
        width:'100%',
        alignSelf:'center'
    },
    footer: {
        height:'20%',
        marginTop:'10%'
    },
})