import { Text, View, FlatList, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import AppStyles from '../styles/App_style';
import { Modal } from 'react-native';
import FiltrePub from './views/Composant/SearchBar';
import Button from './views/Composant/bouton';
import { ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import design from './views/Composant/couleur';
import { useTranslation } from 'react-i18next';
import { useAllPub } from './hooks/query';

  export default function App({navigation}) {
    const { allPubError, allPubLoading, allPubData, fetchMore } = useAllPub(0);
    console.log(JSON.stringify(allPubError, null, 2))

    const [dataS, setDataS] = useState(allPubData? allPubData.getAllPublicites.items : []); // tableau vide anasiana an'ny MyData ef vo-filter @ recherche Utilisateur

    const [query, setQuery] = useState(''); // ilay frappern user @ barre de recherche (String)
    
    const [fullData, setFullData] = useState(allPubData? allPubData.getAllPublicites.items : []); // tableau vide ametrahana ny donnée rehetra (MyData)

    const {t} = useTranslation();

    useEffect(() => {
      if (allPubData) {
        setDataS(allPubData.getAllPublicites.items);
        setFullData(allPubData.getAllPublicites.items);
      }
    }, [allPubData])
    
    // Mandray ny frappe utilisateur @ barre dia manao filtrage
    const handleSearch = (textTypedByTheUser) => { // textTypedByTheUser dia paramètre mandray ny avy @ <Textinput onChangeText={} />
      if (textTypedByTheUser) {
      const filteredData = fullData.filter((itemTofilter) => { // fullData dia mis an'ny Donnée rehetra
        const itemData = itemTofilter.titre ? itemTofilter.titre.toUpperCase() : ''.toUpperCase();
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
    //console.log('image 4 =',dataS[0].image[3].titre)
    const numColumn = 2
    const renderItem = ({ item }) => {
    return (
        <TouchableOpacity onPress={() => 
          {if(item.resume == 'Hotel') {
            navigation.navigate('Hotel', {
              images:[item.image[1].titre, item.image[2].titre, item.image[3].titre],
              idPub:item.id,
              idEtp:item.entreprise.id,
              produit:item.titre,
              entreprise:item.entreprise.nom,
              idEtp:item.entreprise.id,
              idProduit:item.produits,
              prix:item.prix
            })}
          else if(item.resume == 'Restaurant'){
            navigation.navigate('Restaurant', {
              images:[item.image[1].titre, item.image[2].titre, item.image[3].titre],
              idPub:item.id,
              idEtp:item.entreprise.id,
              produit:item.titre,
              entreprise:item.entreprise.nom,
              idEtp:item.entreprise.id,
              idProduit:item.produits,
              prix:item.prix
            })}
          else if(item.resume == 'Transport'){
            navigation.navigate('Transport', {
              images:[item.image[1].titre, item.image[2].titre, item.image[3].titre],
              idPub:item.id,
              idEtp:item.entreprise.id,
              produit:item.titre,
              entreprise:item.entreprise.nom,
              idEtp:item.entreprise.id,
              idProduit:item.produits,
              prix:item.prix
            })
          }}}
          style={AppStyles.touchableStyle}>
          <View>
          <Image
            source={{uri:item.image[0].titre}}
            resizeMode={'cover'}
            style={AppStyles.coverImage}
          />
          <View style={AppStyles.textImage}>
            <Text style={AppStyles.produit}>{item.titre}</Text>
            <Text style={AppStyles.entreprise}>{item.entreprise.nom}</Text>
            <Text style={AppStyles.prix}>{item.prix.toLocaleString('fr-FR')} Ar</Text>
          </View>
          </View>
        </TouchableOpacity>
    )}

    const empty_list = () => {
      return (<Text style={AppStyles.emptyList}> {t('langues:notFound')} <Text style={{fontWeight: 'bold'}}>{query}</Text></Text>)
    }
    const [modalVisible, setModalVisible] = useState(false);
    const [nbrPage, setNbrPage] = useState(1);

    const fetchMoreData = () => {
      if (allPubData && allPubData.getAllPublicites && nbrPage<=allPubData.getAllPublicites.nbr_page) {  
        fetchMore({
              variables: { page: nbrPage },
              updateQuery: (prev, { fetchMoreResult }) => {
                setNbrPage(nbrPage+1);
                  if (!fetchMoreResult) return prev;
                  return {
                      getAllPublicites: {
                          ...fetchMoreResult.getAllPublicites,
                          items: [...prev.getAllPublicites.items, ...fetchMoreResult.getAllPublicites.items]
                      }
                  }
              }
          })
      }
    }
    console.log(nbrPage)

    if(allPubLoading) return (<ActivityIndicator size={'large'} color={design.Vert} style={AppStyles.loader}/>)
    if(allPubError) return(<View><Text>Connexion error when fetching data</Text></View>)

    if(allPubData)return (
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
            placeholder={t('langues:searchProduct')}
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
            <Button title={t('langues:buttonApply')} onPress={() => setModalVisible(!modalVisible)}/>
          </ScrollView>
        </Modal>
        </>
      }
          ListEmptyComponent={empty_list}
          data={dataS}
          numColumns={numColumn}
          renderItem={renderItem}
          keyExtractor={(item, index) => String(index)}
          style={AppStyles.flatList}
          onEndReached={() =>{
            console.log('should fetch more data');
            fetchMoreData();
          }}
          onEndReachedThreshold={0}
          ListFooterComponent={
            <>
            <Text style={{marginVertical:4, textAlign:'center', display:nbrPage>allPubData.getAllPublicites.nbr_page? 'none' : 'flex'}}>Loading...</Text>
            <Text style={{height:20, backgroundColor:design.Blanc}}/>
            </>
          }
        />
      </View>
    );
  }
