import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, Image, View, ScrollView } from "react-native";
import {SelectList} from 'react-native-dropdown-select-list';
import DatePicker from 'react-native-date-picker';
import { RadioButton } from 'react-native-paper';


export default FiltrePub = () => {
  const [type, setType] = React.useState('');
  const [checked, setChecked] = React.useState('');

  const [date1, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [date2, setDate2] = useState(new Date());
  const [open2, setOpen2] = useState(false);
  const [debut, setDebut] = useState('dd/mm/yy');
  const [fin, setFin] = useState('dd/mm/yy');

  const types = [
    {key:'hotel', value:'Hotelerie'},
    {key:'restaurant', value:'Restauration'},
    {key:'transport', value:'Transport'}
  ];
  const voyage = [
    {key:'classic', value:'Classic'},
    {key:'economic', value:'Economic'},
    {key:'premium', value:'premium'}
  ];
  const depart = [
    {key:'fianarantsoa', value:'Fianarantsoa'},
    {key:'majunga', value:'Majunga'},
    {key:'tamatave', value:'Tamatave'}
  ];
  const arrivee = [
    {key:'tana', value:'Tana'},
    {key:'majunga', value:'Majunga'},
    {key:'tamatave', value:'Tamatave'}
  ];
  const produits = [
    {key:'1', value:'Produit1'},
    {key:'2', value:'Produit2'},
    {key:'3', value:'Produit3'}
  ];
  const chambre = [
    {key:'2etoiles', value:'2 étoiles'},
    {key:'3etoiles', value:'3 étoiles'},
    {key:'5etoiles', value:'5 étoiles'}
  ];
  const prixChambre = [
    {key:'1p', value:'< Ar 100 000'},
    {key:'2p', value:'Ar 150 000 - Ar 250 000'},
    {key:'3p', value:'> 250 000'}
  ];


  const hotel = JSON.stringify(type)==JSON.stringify('Hotelerie')
  const transport = JSON.stringify(type)==JSON.stringify('Transport')
  const restaurant = JSON.stringify(type)==JSON.stringify('Restauration')
  console.log(hotel, transport, restaurant)

  return (
    <ScrollView>
    <View style={{marginTop:50, marginHorizontal:20}}>
      <SelectList
      save='value'
      setSelected={(val) => setType(val)}
      data={types}
      placeholder={'filtrer les publicité'}
      />
    </View>



    <View style={styles.dateContainer}>
            <View style={styles.dateInput}>
                <Text style={styles.DebutFin}>Date de début</Text>
                <TouchableOpacity onPress={() => setOpen(true)}>
                <Text style={styles.textDateInput}>
                  {debut}
                </Text>
                </TouchableOpacity>
                <Image source={require('../../assets/icon/calendar.png')}
                style={styles.img}/>
            </View>
            <View style={styles.dateInput}>
                <Text style={styles.DebutFin}>Date de fin</Text>
                <TouchableOpacity onPress={() => setOpen2(true)}>
                <Text style={styles.textDateInput}>
                  {fin}
                </Text>
                </TouchableOpacity>
                <Image source={require('../../assets/icon/calendar.png')}
                style={styles.img}/>
            </View>
            <DatePicker //Prend la date entrée par l'utilisateur
              mode='date'
              modal
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
    </View>



    <View style={[{display: hotel? 'flex': 'none'}]}>
    <View >
      <Text style={styles.headerText}>Type d'hotel</Text>
      
      <View style={styles.centerRadio}>
      <TouchableOpacity
        style={styles.radioView}
        onPress={() => setChecked(2)}
      >
      <RadioButton
        value="2 étoiles" 
        status={ checked === 2 ? 'checked' : 'unchecked' }
        onPress={() => setChecked(2)}
      />
      <Text style={styles.labelStyle}> Hotel à 2 étoiles </Text>
      <Image source={require('../../assets/icon/star.png')} style={styles.star}/>
      <Image source={require('../../assets/icon/star.png')} style={styles.star}/>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.radioView}
        onPress={() => setChecked(3)}
      >
      <RadioButton
        value="3 étoiles"
        status={ checked === 3 ? 'checked' : 'unchecked' }
        onPress={() => setChecked(3)}
      />
      <Text style={styles.labelStyle}> Hotel à 3 étoiles </Text>
      <Image source={require('../../assets/icon/star.png')} style={styles.star}/>
      <Image source={require('../../assets/icon/star.png')} style={styles.star}/>
      <Image source={require('../../assets/icon/star.png')} style={styles.star}/>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.radioView}
        onPress={() => setChecked(4)}
      >
      <RadioButton
        value="4 étoiles"
        status={ checked === 4 ? 'checked' : 'unchecked' }
        onPress={() => setChecked(4)}
      />
      <Text style={styles.labelStyle}> Hotel à 4 étoiles </Text>
      <Image source={require('../../assets/icon/star.png')} style={styles.star}/>
      <Image source={require('../../assets/icon/star.png')} style={styles.star}/>
      <Image source={require('../../assets/icon/star.png')} style={styles.star}/>
      <Image source={require('../../assets/icon/star.png')} style={styles.star}/>
      </TouchableOpacity>
      </View>
    </View>
    <View style={styles.voyage}>
      <SelectList
      save='value'
      setSelected={()=>{}}
      data={prixChambre}
      placeholder={'Prix'}
      />
    </View>
    </View>



    <View style={[{display: restaurant? 'flex': 'none'}]}>
    <View style={styles.voyage}>
      <SelectList
      save='value'
      setSelected={()=>{}}
      data={produits}
      placeholder={'Restauration'}
      />
    </View>
    <View style={styles.departArrivee}>
    <SelectList
      save='value'
      setSelected={()=>{}}
      data={produits}
      placeholder={'Autre'}
      boxStyles={{marginHorizontal:20}}
      />
      <SelectList
      save='value'
      setSelected={()=>{}}
      data={produits}
      placeholder={'Autre'}
      boxStyles={{marginHorizontal:20}}
      />
    </View>
    </View>



    <View style={[{display: transport? 'flex': 'none'}]}>
    <View style={styles.voyage}>
      <SelectList
      save='value'
      setSelected={()=>{}}
      data={voyage}
      placeholder={'Type de voyage'}
      />
    </View>
    <View style={styles.departArrivee}>
    <SelectList
      save='value'
      setSelected={()=>{}}
      data={depart}
      placeholder={'Départ'}
      boxStyles={{marginHorizontal:20}}
      />
      <SelectList
      save='value'
      setSelected={()=>{}}
      data={arrivee}
      placeholder={'Arrivée'}
      boxStyles={{marginHorizontal:20}}
      />
    </View>
    </View>
    </ ScrollView>
  )
}


const styles = StyleSheet.create({
  dateContainer : {
    marginVertical : 20
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
  },
  departArrivee : {
    flexDirection : 'row',
    alignSelf : 'center',
    marginVertical:20
  },
  voyage : {
    marginTop:50,
    marginHorizontal:20
  },
  radioView: {
    width: '100%',
    flexDirection:'row',
    alignItems: 'center',
    marginVertical: 2
  },
  centerRadio: {
    alignSelf: 'center'
  },

  headerText: {
    fontSize: 28,
    textAlign: 'center',
    marginTop: '10%',
    marginBottom: '10%',
  },

  labelStyle: {
    fontSize: 18
  },
  star: {
    width:20,
    height:20,
    borderRadius:20
  }
})