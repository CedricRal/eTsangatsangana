import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import MyData from './data';
import DatePicker from 'react-native-date-picker';
import Button from '../src/views/Composant/bouton';

 export default CommandList = ({navigation}) => { 

  const [showFilter, setShowFilter] = React.useState(false);
  const [dataS, setDataS] = useState([]); // tableau vide anasiana an'ny MyData ef vo-filter @ recherche Utilisateur
  
  const [query, setQuery] = useState(''); // ilay frappern user @ barre de recherche (String)
  
  const [fullData, setFullData] = useState([]); // tableau vide ametrahana ny donnée rehetra (MyData)
  
  const [date1, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [date2, setDate2] = useState(new Date());
  const [open2, setOpen2] = useState(false);
  const [debut, setDebut] = useState('dd/mm/yy');
  const [fin, setFin] = useState('dd/mm/yy');
  
  const empty_list = () => {
      return (<Text style={{textAlign:'center'}}> Nous n'avions trouvé aucun produit correspondant à <Text style={{fontWeight: 'bold'}}>{query}</Text></Text>)
    } 
  
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


  const renderItem = ({item}) => {
    return (
    <View style={styles.bodyContainer}>
     <TouchableOpacity onPress={() => 
      {
      if(item.id == '1') {
        navigation.navigate('restaurant')}
      else if(item.id == '2') {
        navigation.navigate('transport')}
      else if(item.id == '3') {
        navigation.navigate('hotel')
      } 
    }}
     style={styles.commande} 
      >
      <Image 
        source={item.image}
        style={styles.imageStyle}
     />
     <View style={styles.nameAndDetailStyle}>
        <Text style={styles.fontTextName}>{item.name}</Text>
        <Text style={styles.fontTextDetails}>{item.details}</Text>
      </View>
      </TouchableOpacity>
      
    </View>
    )
  }

  return (
    <View>
      <FlatList
        ListHeaderComponent={
        <View style={styles.headStyle}>
          <View style={{flexDirection:'row', marginHorizontal:5}}>
            <View style={styles.inputContainer}>
            <Image 
            source={require('../src/assets/icon/search.png')}    //tout le composant bar de recherche ici
            style={{height:20, width:20}}/>
            <TextInput
            value={query}
            onChangeText={handleSearch}
            placeholder="Rechercher une commande"
            style={styles.placeholders}
            />
            </View>
            <TouchableOpacity onPress={() => {setShowFilter(!showFilter)}}>
                <Image 
                source={require('../src/assets/icon/filter-icon.png')}   //touchableOpacity ici cache ou montre l'option de filtre de recherche
                style={{width:30, height:40, marginLeft:1, marginVertical:7}}/> 
            </TouchableOpacity>
            </View>

            <View style={[{display: showFilter? 'flex': 'none'}]}>
            <Text style={styles.other}>
                Filtrer
            </Text>
            <View style={styles.dateInput}>
                <Text style={styles.DebutFin}>Date de début</Text>
                <TouchableOpacity onPress={() => setOpen(true)}>
                <Text style={styles.textDateInput}>
                  {debut}
                </Text>
                </TouchableOpacity>
                <Image source={require('../src/assets/icon/calendar.png')}
                style={styles.img}/>
            </View>
            <View style={styles.dateInput}>
                <Text style={styles.DebutFin}>Date de fin</Text>
                <TouchableOpacity onPress={() => setOpen2(true)}>
                <Text style={styles.textDateInput}>
                  {fin}
                </Text>
                </TouchableOpacity>
                <Image source={require('../src/assets/icon/calendar.png')}
                style={styles.img}/>
            </View>
            <DatePicker //Prend la date entrée par l'utilisateur
              mode='date'
              modal
              locale="fr"
              title='Selectionner une date'
              confirmText='Confirmer'
              cancelText='Annuler'
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
              mode='date'
              modal
              locale="fr"
              title='Selectionner une date'
              confirmText='Confirmer'
              cancelText='Annuler'
              open={open2}
              date={date2}
              onConfirm={value => {
                if(value>date1){ 
                  setOpen2(false);
                  setDate2(value);
                  setFin(value?.toLocaleDateString());
                }
                else{            //condition que si user entre une date inferieur a celle du debut
                  Alert.alert('entrer une date de fin');
                  setOpen2(false);
                  setFin('dd/mm/yy');
              }}}
              onCancel={() => {
                setOpen2(false);
              }}
            />            
            <Button title='Appliquer' onPress={() => {Alert.alert('Filtre appliqué'); setShowFilter(!showFilter)}}/>
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

const styles = StyleSheet.create({
    headStyle: {
      backgroundColor: 'skyblue',
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
      marginTop: 5,
      borderWidth: 1,
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

    nameAndDetailStyle : {
      flexDirection: 'column',
      width: '65%',
      marginLeft: '2%',
    },

    fontTextName: {
      fontSize: 18,
      fontWeight: 'bold',
    },

    fontTextDetails: {
      fontSize: 16,
    },description : {
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
      borderWidth: 0.5,
      borderColor:'grey',
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
      marginTop:30,
      marginBottom:10,
      textAlign:'center',
      fontSize: 24,
      display:'flex',
      color:'black'
  },
  dateInput : {
      height: 40,
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      marginVertical:10,
      width:260,
  },
  textDateInput: {
      backgroundColor:'whitesmoke',
      borderRadius:5,
      borderWidth:1, 
      marginHorizontal:20, 
      borderColor:'grey', 
      width:90,
      height:30,
      fontSize:16,
      textAlignVertical:'center',
      textAlign:'center'
  },
  img : {
      height:30, 
      width:30
  },
  DebutFin : {
      width:100,
      fontSize:16,
      color:'black'
  }
})