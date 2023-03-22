import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ActivityIndicator, Modal, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import design from './couleur';
import { RadioButton } from 'react-native-paper';
import AppStyles from '../../../styles/App_style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Button from './bouton';
import { useTranslation } from 'react-i18next';


const Langue = [
    {
        nom: 'English',
        code: 'en',
        drapeau: require('../../assets/drapeau/uk.png')
    },
    {
        nom: 'Français',
        code: 'fr',
        drapeau: require('../../assets/drapeau/fr.png')
    },
    {
        nom: 'Malagasy',
        code: 'mg',
        drapeau: require('../../assets/drapeau/mg.png')
    },
]

const Languages = () => {
    const [checked, setChecked] = useState('');

    const [selected, setSelected] = useState('');

    const [data, setData] = useState([]); // tableau vide anasiana an'ny MyData ef vo-filter @ recherche Utilisateur

    const { t, i18n } = useTranslation();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      setData(Langue);
    }, [])

    const setLanguage = (code) => {
        return i18n.changeLanguage(code)
    }
    function load() {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
          }, 500);
    };

    renderItem = ({item}) => {
            return(
            <TouchableOpacity
                style={styles.radioView}
                onPress={() => {setChecked(item.nom); setSelected(item.code)}} 
                >
                <Image source={item.drapeau} style={styles.img}/>
                <Text style={styles.labelStyle}> {item.nom} </Text>
                <RadioButton
                    value={item.nom}
                    color={design.Vert}
                    status={ checked === item.nom ? 'checked' : 'unchecked' }
                    onPress={() => {setChecked(item.nom); setSelected(item.code)}} 
            />
            </TouchableOpacity>
            )
    }
    Footer = () => {
        return(
            <View style={styles.footer}>
            <Button title={t('langues:buttonApply')} onPress={() => {
                    setLanguage(selected);
                    load();
                }}/>
            </View>
        )
    }

    //if(isLoading) return (<ActivityIndicator size={'large'} color={design.Vert} style={AppStyles.loader}/>)

    return(
        <>
        {isLoading && <ActivityIndicator size={'large'} color={design.Vert} style={AppStyles.loader}/>}
        <FlatList
        data={data}
        renderItem={renderItem}
        ListFooterComponent={Footer}
        style={styles.flatList}
        />
        </>
    )
}

export default Languages;

const styles = StyleSheet.create({
    flatList:{
        marginTop:'20%'
    },
    radioView: {
        flex:1,
        alignSelf:'center',
        height:70,
        flexDirection:'row',
        alignItems: 'center',
        marginVertical: '4%',
        marginHorizontal: '10%',
        paddingHorizontal: '8%',
        borderRadius: 20,
        backgroundColor:'snow',
    },
    labelStyle: {
      fontSize: 20,
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