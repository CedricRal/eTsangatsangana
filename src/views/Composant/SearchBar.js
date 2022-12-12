import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, Image, View, ScrollView } from "react-native";
import {SelectList} from 'react-native-dropdown-select-list';
import DatePicker from 'react-native-date-picker';
import { RadioButton } from 'react-native-paper';
import { useTranslation } from "react-i18next";

export default FiltrePub = () => {
  const {t} = useTranslation();
  const [type, setType] = React.useState('');
  const [checked, setChecked] = React.useState('');

  const [date1, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [date2, setDate2] = useState(new Date());
  const [open2, setOpen2] = useState(false);
  const [debut, setDebut] = useState('dd/mm/yy');
  const [fin, setFin] = useState('dd/mm/yy');
  const datePicker = {
    mode:'date',
    locale:'fr',
    title:'Selectionner une date',
    confirmText:'Confirmer',
    cancelText:'Annuler'
  }

  const types = [
    {key:'hotel', value:t('home:hotellerie')},
    {key:'restaurant', value:t('home:restauration')},
    {key:'transport', value:t('home:transport')}
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
  const prixChambre = [
    {key:'1p', value:'< Ar 100 000'},
    {key:'2p', value:'Ar 150 000 - Ar 250 000'},
    {key:'3p', value:'> 250 000'}
  ];


  const hotel = JSON.stringify(type)==JSON.stringify(t('home:hotellerie'))
  const restaurant = JSON.stringify(type)==JSON.stringify(t('home:restauration'))
  const transport = JSON.stringify(type)==JSON.stringify(t('home:transport'))

  return (
    <ScrollView>
    <View style={styles.dropdown}>
      <SelectList
      save='value'
      setSelected={(val) => setType(val)}
      data={types}
      placeholder={t('home:filterPlaceholder')}
      />
    </View>



    <View style={styles.dateContainer}>
            <View style={styles.dateInput}>
                <Text style={styles.DebutFin}>{t('home:startDate')}</Text>
                <TouchableOpacity onPress={() => setOpen(true)}>
                <Text style={styles.textDateInput}>
                  {debut}
                </Text>
                </TouchableOpacity>
                <Image source={require('../../assets/icon/calendar.png')}
                style={styles.img}/>
            </View>
            <View style={styles.dateInput}>
                <Text style={styles.DebutFin}>{t('home:endDate')}</Text>
                <TouchableOpacity onPress={() => setOpen2(true)}>
                <Text style={styles.textDateInput}>
                  {fin}
                </Text>
                </TouchableOpacity>
                <Image source={require('../../assets/icon/calendar.png')}
                style={styles.img}/>
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
                  Alert.alert(t('home:alert'));
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
      <Text style={styles.headerText}>{t('home:hotelType')}</Text>
      
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
      <Text style={styles.labelStyle}> {t('home:twoStar')} </Text>
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
      <Text style={styles.labelStyle}> {t('home:threeStar')} </Text>
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
      <Text style={styles.labelStyle}> {t('home:fourStar')} </Text>
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
      placeholder={t('home:price')}
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
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <TouchableOpacity
        style={[styles.horizontalList, {backgroundColor: checked === 'classique' ? 'lightskyblue' : 'lightsteelblue'}]}
        onPress={() => setChecked('classique')}        
      >
      <RadioButton
        value="Classique" 
        status={ checked === 'classique' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('classique')}
      />
      <Text style={styles.labelStyle}> {t('home:classic')} </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.horizontalList, {backgroundColor: checked === 'premium' ? 'lightskyblue' : 'lightsteelblue'}]}
        onPress={() => setChecked('premium')}        
      >
      <RadioButton
        value="premium" 
        status={ checked === 'premium' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('premium')}
      />
      <Text style={styles.labelStyle}> {t('home:premium')} </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.horizontalList, {backgroundColor: checked === 'economic' ? 'lightskyblue' : 'lightsteelblue'}]}
        onPress={() => setChecked('economic')}        
      >
      <RadioButton
        value="economic" 
        status={ checked === 'economic' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('economic')}
      />
      <Text style={styles.labelStyle}> {t('home:economic')} </Text>
      </TouchableOpacity>
    </ScrollView>
    <View style={styles.dropdown}>
    <SelectList
      save='value'
      setSelected={()=>{}}
      data={depart}
      placeholder={t('home:departure')}
      boxStyles={{marginHorizontal:20}}
      />
      </View>
      <View style={styles.dropdown}>
      <SelectList
      save='value'
      setSelected={()=>{}}
      data={arrivee}
      placeholder={t('home:arrival')}
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
    flexDirection : 'column',
    alignSelf : 'center',
    marginVertical:50
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
  },
  horizontalList: {
    flexDirection: 'row',
    borderWidth:1,
    marginHorizontal:10,
    borderRadius: 40,
    borderColor:'cadetblue',
    paddingRight:20,
    alignItems:'center'
  },
  dropdown: {
    marginTop:50,
    marginHorizontal:20,
    marginBottom: 20
  },
})