import React, {useLayoutEffect} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Button from '../src/views/Composant/bouton';
import { SelectList } from 'react-native-dropdown-select-list';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GET_PROFIL, useProfil } from '../src/hooks/query';

export default DetailCmd = ({navigation}) => {
    const {t} = useTranslation();
    const route = useRoute();
    const [userId, setUserId] = React.useState();
    const loadToken = async() => {
        try {
            const myId = await AsyncStorage.getItem("myId");    //prendre myToken dans AsyncStorage
            if(myId !== null){    //condition si token existe déjà dans AsyncStorage
                setUserId(myId)
            };
        } catch (error) {
            alert(error);
        }
    }
    useLayoutEffect(() => {     //execute la fonction loadToken dès que la page LogIn se lance
        loadToken();
    },[]);
    const {profilError, profilData, profilLoading} = useProfil(userId);

    const [total, setTotal] = React.useState(0);
    const cmd = {
        nom: profilData? profilData.profil_user.nom : '',
        commande: route.params.produit,
        entreprise: route.params.entreprise,
        prix: route.params.prix,
        tel: profilData? profilData.profil_user.num_tel : '',
    }
    const [selected, setSelected] = React.useState();
  
    const nbr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32]

    const validate = () => {
        navigation.navigate('PaymentCommand',{
            nom: cmd.nom,
            tel: cmd.tel,
            commande: cmd.commande,
            entreprise: cmd.entreprise,
            nombre: selected,
            prix: total,
            idPub: route.params.idPub,
            idEtp:route.params.idEtp,
            idProduit:route.params.idProduit,
            type:route.params.type
        })
    }

    return (
        <ScrollView>
        <View style={styles.container}>
            
            <Text style={styles.text}>{t('langues:detailsCommand')}</Text>
            
            <View style={styles.aligner}><Text style={styles.field_command}>{t('langues:name')}: </Text><Text style={styles.label}>{cmd.nom} </Text></View>
            <View style={styles.aligner}><Text style={styles.field_command}>{t('langues:phone')}: </Text><Text style={styles.label}>{cmd.tel}</Text></View>
            <View style={styles.aligner}><Text style={styles.field_command}>{t('langues:order')}: </Text><Text style={styles.label}>{cmd.commande}</Text></View>
            <View style={styles.aligner}><Text style={styles.field_command}>{t('langues:company')}: </Text><Text style={styles.label}>{cmd.entreprise}</Text></View>
            <View style={[styles.field_command,{flexDirection:'row', flex:1}]}>
            <Text style={styles.fieldOther}>{(route.params.type=='hotel')? t('langues:nb') : (route.params.type=='restaurant')? t('langues:nbOrder') : t('langues:nbPlace')}: </Text>
            <SelectList 
                setSelected={(val) => {setSelected(val); setTotal(val*cmd.prix)}}
                boxStyles={styles.rightDropdown}
                dropdownStyles={{width:80}}
                dropdownTextStyles={{alignSelf:'center'}}
                placeholder='0'
                search={false}
                data={nbr} 
                save="value"
            /></View>
            <View style={styles.aligner}><Text style={styles.field_command}>{t('langues:unitPrice')}:</Text><Text style={styles.label}>{cmd.prix} ariary</Text></View> 
            <View style={styles.aligner}><Text style={styles.field_command}>Total: </Text><Text style={styles.label}>{total} ariary</Text></View>
            
            <View style={styles.button}>
                <Button title='Valider ma commande' onPress={validate}/>
            </View>
        </View>
        </ScrollView>

    )
}
const styles = StyleSheet.create({
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginRight: '10%',
        textAlign:'right',
        flex: 1,
        color:'black',
    },

    text: {
        marginTop: '15%',
        textAlign: 'center',
        fontSize: 28,
        marginBottom: '10%',
        color:'black',
    },
    rightDropdown: {
        width:80,
        height:42,
        marginRight:'10%',
        alignItems:'flex-end',
        borderWidth:1,
        borderColor:'black',
        flex:1
    },
    button: {
        marginTop: '5%',
        marginBottom: '10%',
        alignSelf: 'center',
    },

    field_command : {
        marginLeft: '10%',
        marginBottom: '8%',
        fontSize: 18,
        flex: 1,
        color:'black',
    },
    justifySpaceBetween: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    fieldOther : {
        marginTop: 5,
        fontSize: 18,
        flex:1,
        color:'black',
    },
    aligner: {
        flexDirection:'row',
        flex: 1,
    }
})