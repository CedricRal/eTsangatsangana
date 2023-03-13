import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, TextInput, Modal, Dimensions, ActivityIndicator } from 'react-native';
import React, { useState, useLayoutEffect } from 'react';
import MyData from './data';
import DatePicker from 'react-native-date-picker';
import Button from '../src/views/Composant/bouton';
import design from '../src/views/Composant/couleur';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useTranslation } from 'react-i18next';
import { useCommandeList } from '../src/hooks/query';
import AsyncStorage from '@react-native-async-storage/async-storage';

 export default CommandList = ({navigation}) => { 
  const {t} = useTranslation();
  const [userId, setUserId] = React.useState();
  const loadId = async() => {
      try {
          const myId = await AsyncStorage.getItem("myId");    //prendre myId dans AsyncStorage
          if(myId !== null){    //condition si Id existe déjà dans AsyncStorage
              setUserId(myId)
          };
      } catch (error) {
          alert(error);
      }
  }
  const {commandeListData, commandeListLoading, commandeListError} = useCommandeList(userId);
  useLayoutEffect(() => {
    loadId();//execute la fonction loadId dès que la page liste des commandes se lance
    if(commandeListData){
      setDataS(commandeListData.listeCommandeUsers);
      setFullData(commandeListData.listeCommandeUsers);}
  }, [commandeListData]);


  const [showFilter, setShowFilter] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const [dataS, setDataS] = useState(commandeListData? commandeListData.listeCommandeUsers : []); // tableau vide anasiana an'ny MyData ef vo-filter @ recherche Utilisateur
  
  const [query, setQuery] = useState(''); // ilay frappern user @ barre de recherche (String)
  
  const [fullData, setFullData] = useState(commandeListData? commandeListData.listeCommandeUsers : []); // tableau vide ametrahana ny donnée rehetra (MyData)
  const datePicker = {
    mode:'date',
    locale:'fr',
    title:t('langues:selectDate'),
    confirmText:t('langues:confirmText'),
    cancelText:t('langues:cancelText')
  }

  const [date1, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [date2, setDate2] = useState(new Date());
  const [open2, setOpen2] = useState(false);
  const [debut, setDebut] = useState(t('langues:startDate'));
  const [fin, setFin] = useState(t('langues:endDate'));
  
  const [modalVisible, setModalVisible] = useState(false);

  const empty_list = () => {
      return (<Text style={{textAlign:'center'}}> {t('langues:notFound')} <Text style={{fontWeight: 'bold'}}>{query}</Text></Text>)
    }
  
  

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

  const renderItem = ({item}) => {
    const dateObj = (new Date(item.date)).toLocaleDateString();
    console.log('date =>' ,dateObj)
    return (
    <View style={styles.bodyContainer}>
     <TouchableOpacity onPress={() => 
      {
      if(item.entreprise.type_service == 'Restauration') {
        navigation.navigate('restaurant')}
      else if(item.entreprise.type_service == 'Transport') {
        navigation.navigate('transport')}
      else if(item.entreprise.type_service == 'Hotellerie') {
        navigation.navigate('hotel')
      } 
    }}
     style={styles.commande} 
      >
      <Image 
        source={{uri:item.produit.image[0].titre}}
        style={styles.imageStyle}
     />
     <View style={styles.nameAndDetailStyle}>
      <View style={styles.nameAndPriceStyle}>
        <Text style={styles.fontTextName}>{item.produit.titre}</Text>
        <Text style={styles.fontTextPrice}>{(item.qt*item.produit.prix).toLocaleString('fr-FR')} ar</Text>
      </View>
        <Text style={styles.fontTextDetails}>{dateObj}</Text>
        <Text style={styles.fontTextDetails}>{item.entreprise.nom}</Text>
      </View>
      </TouchableOpacity>
      
    </View>
    )
  }

  if(commandeListLoading) return (<ActivityIndicator size={'large'} color={design.Vert} style={styles.loader}/>)
  if(commandeListError) return(<View><Text>Connexion error when fetching data</Text></View>)
  return (
    <View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.circle}>
                        <Icon name='check' size={35} color={design.Vert} style={styles.check}/>
                        </View>
                        <Text style={styles.modalText}>{t('langues:applyedFilter')}</Text>
                        <TouchableOpacity
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}
                        >
                        <Text style={styles.textStyle}>Ok</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </Modal>

      <FlatList
        ListHeaderComponent={
        <View style={styles.headStyle}>

          <View style={styles.searchView}>
            <View style={[styles.inputContainer, {borderColor : isFocused? design.Vert : design.Marron}]}>
            <Icon 
            name='search'    //tout le composant bar de recherche ici
            size={20} color={design.Marron}/>
            <TextInput
            value={query}
            onChangeText={handleSearch}
            placeholder={t('langues:searchOrder')}
            onFocus={()=>{
              setIsFocused(true);
              }}
              onBlur={()=>{
              setIsFocused(false);
              }}
            style={styles.placeholders}
            />
            </View>
            <TouchableOpacity onPress={() => setShowFilter(!showFilter)}>
                <Icon 
                name='sliders-h'   //touchableOpacity ici cache ou montre l'option de filtre de recherche
                size={30} color={design.Marron} style={{marginVertical:'20%'}}/> 
            </TouchableOpacity>
          </View>

          <View style={[{display: showFilter? 'flex': 'none'}]}>
            <Text style={styles.other}>
                {t('langues:filter')}
            </Text>
              <View style={styles.dateInputContainer}>
                <TouchableOpacity onPress={() => setOpen(true)} style={styles.dateInput}>
                <Icon name='calendar-alt' size={30} color={design.Marron}/>
                <Text style={styles.textDateInput}>
                  {debut}
                </Text>
                <Icon name='chevron-down' size={20} color={design.Marron}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setOpen2(true)} style={styles.dateInput}>
                <Icon name='calendar-alt' size={30} color={design.Marron}/>
                <Text style={styles.textDateInput}>
                  {fin}
                </Text>
                <Icon name='chevron-down' size={20} color={design.Marron}/>
                </TouchableOpacity>
              </View>

            <DatePicker //Prend la date entrée par l'utilisateur
              mode={datePicker.mode}
              modal
              locale={datePicker.locale}
              title={datePicker.title}
              confirmText={datePicker.confirmText}
              cancelText={datePicker.cancelText}
              open={open}   //ouvre fenetre pour choisir la date dans user's phone
              date={date1}   //declare la ppté date comme le state date
              onConfirm={value => {         //quand user confirme 
                setOpen(false);           //ferme la fenetre
                setDate(value);           //stock la valeur entré par user dans le state date
                setDebut(value?.toLocaleDateString());   //stock la valeur de date converti en chaine de caractere dans le state debut
              }}
              onCancel={() => {       //si user appuie sur retour, la fenetre se ferme
                setOpen(false);
              }}
            />
            <DatePicker
              mode={datePicker.mode}
              modal
              locale={datePicker.locale}
              title={datePicker.title}
              confirmText={datePicker.confirmText}
              cancelText={datePicker.cancelText}
              open={open2}
              date={date2}
              onConfirm={value => {
                if(value>date1){ 
                  setOpen2(false);
                  setDate2(value);
                  setFin(value?.toLocaleDateString());
                }
                else{            //condition que si user entre une date inferieur a celle du debut
                  setOpen2(false);
                  setFin(t('langues:endDate'));
              }}}
              onCancel={() => {
                setOpen2(false);
              }}
            /> 
            <Button title={t('langues:buttonApply')} onPress={() => {setModalVisible(!modalVisible); setShowFilter(!showFilter)}}/>
            </View>
        </View>  
        }
        data={dataS}
        renderItem={renderItem}
        ListEmptyComponent={empty_list}
      />
    </View>
    );
  }

  const Width = Dimensions.get('screen').width;
  const Height = Dimensions.get('screen').height;
const styles = StyleSheet.create({
    headStyle: {
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
      marginBottom: 10
    },

    headerText: {
      fontSize: 18,
      marginTop: '8.5%',
      color: 'white',
      textAlign: 'center',
      justifyContent: 'center',
      alignContent: 'center'
    },

    bodyContainer: {
      backgroundColor: '#f8f8f8',
      borderRadius: 20,
      borderColor: 'gray',
      marginBottom: '2%',
      marginLeft: '2%',
      marginRight: '2%',
    }, 

    commande: {
      flexDirection: 'row',
    },
    
    imageStyle: {
      width: '35%',
      height: 150,
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
      opacity: 0.8,
    },

    nameAndPriceStyle: {
      flexDirection: 'row',
      width: '97%'
    },

    nameAndDetailStyle : {
      flexDirection: 'column',
      width: '65%',
      marginLeft: '2%',
    },

    fontTextName: {
      width: '40%',
      fontSize: 18,
      fontWeight: 'bold',
    },

    fontTextPrice: {
      fontSize: 16,
      fontWeight: 'bold',
      width: '60%',
      height: 30,
      paddingLeft: '7%',
      borderTopRightRadius: 18,
      borderBottomLeftRadius: 18,
      backgroundColor: design.Marron,
      color: 'white',
    },

    fontTextDetails: {
      fontSize: 16,

    },
    
    description : {
      color:'black',
      fontSize: 38,
      marginTop:50,
      marginBottom:20,
      textAlign:'center'
  },
  inputContainer: {
      height: 45,
      backgroundColor: 'whitesmoke',
      marginRight:10,
      flexDirection: 'row',
      paddingHorizontal: 15,
      borderWidth: 1,
      borderRadius:10,
      alignItems: 'center',
      width:'87%',
      alignSelf:'center'
  },
  placeholders: {
      marginLeft:18,
      fontSize:16,
  },
  other: {
      marginVertical:Height*0.01,
      fontWeight:'bold',
      textAlign:'center',
      fontSize: 22,
      display:'flex',
      color:'black'
  },
  dateInput : {
      height: 40,
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      marginVertical:10,
      backgroundColor:'whitesmoke',
      borderRadius:5,
      borderWidth:1,
      borderColor: design.Marron,
      textAlignVertical:'center',
      marginHorizontal:Width * 0.02,
      paddingHorizontal:5,
  },
  textDateInput: {
      width: 100,
      height:40,
      fontSize:16,
      textAlignVertical:'center',
      textAlign:'center'
  },
  dateInputContainer : {
      flexDirection:'row',
      alignSelf:'center',
      marginVertical:Height*0.02,
  },
  DebutFin : {
      width:100,
      fontSize:16,
      color:'black'
  },
  searchView : {
    flexDirection:'row',
    marginHorizontal:5,
    marginVertical:20,
  },
    searchIcon : {
      height:20,
      width:20
    },
    filterIcon : {
      width:30,
      height:40,
      marginLeft:1,
      marginVertical:7
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
    modalView: {
      width:Width*0.7,
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      width: 50,
      borderRadius: 10,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: design.Marron,
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      fontFamily:design.police
    },
    modalText: {
      color:'black',
      marginBottom: 15,
      fontSize:16,
      textAlign: "center",
      fontFamily:design.police
    },
    circle: {
      width:52,
      height:52,
      borderWidth:4,
      borderRadius:45,
      borderColor:design.Vert
  },
  check:{
      alignSelf:'center',
      marginTop:'10%'
  },
  loader: {
      alignSelf: 'center',
      justifyContent: 'center',
      marginVertical:'40%'
  },

})