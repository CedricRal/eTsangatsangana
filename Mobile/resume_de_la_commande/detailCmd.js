import React, {useLayoutEffect} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Button from '../src/views/Composant/bouton';
import design from '../src/views/Composant/couleur';
import { SelectList } from 'react-native-dropdown-select-list';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useProfil } from '../src/hooks/query';
import { formatPhoneNumber } from '../src/views/Composant/Format';

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
    const [selected, setSelected] = React.useState(0);
  
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
            <View style={styles.aligner}><Text style={styles.field_command}>{t('langues:phone')}: </Text><Text style={styles.label}>{formatPhoneNumber(cmd.tel)}</Text></View>
            <View style={styles.aligner}><Text style={styles.field_command}>{t('langues:order')}: </Text><Text style={styles.label}>{cmd.commande}</Text></View>
            <View style={styles.aligner}><Text style={styles.field_command}>{t('langues:company')}: </Text><Text style={styles.label}>{cmd.entreprise}</Text></View>
            <View style={styles.aligner}>
            <Text style={styles.field_command}>{(route.params.type=='hotel')? t('langues:nb') : (route.params.type=='restaurant')? t('langues:nbOrder') : t('langues:nbPlace')}: </Text>
            <View style={styles.selectContainer}>
            <SelectList 
                setSelected={(val) => {setSelected(val); setTotal(val*cmd.prix)}}
                boxStyles={styles.rightDropdown}
                dropdownStyles={{width:80, position:'absolute', backgroundColor:'white', zIndex:200, marginTop:40 }}
                dropdownTextStyles={{alignSelf:'center'}}
                placeholder='0'
                maxHeight={145}
                search={false}
                data={nbr} 
                save="value"
            />
            </View>
            </View>
            <View style={[styles.aligner, {marginTop:-126}]}><Text style={styles.field_command}>{t('langues:unitPrice')}:</Text><Text style={styles.label}>{cmd.prix.toLocaleString('fr-FR')} ariary</Text></View> 
            <View style={styles.aligner}><Text style={styles.field_command}>Total: </Text><Text style={styles.label}>{total.toLocaleString('fr-FR')} ariary</Text></View>
            
            <View style={styles.button}>
                <Button title='Valider ma commande' onPress={validate}/>
            </View>
        </View>
        </ScrollView>

    )
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: design.Blanc,
        position:'relative',
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
        marginRight: '8%',
        textAlign:'right',
        flex: 1,
        color:'black',
    },

    text: {
        marginTop: '15%',
        textAlign: 'center',
        fontSize: 26,
        marginBottom: '10%',
        color:design.Marron,
    },
    rightDropdown: {
        width:80,
        height:42,
        marginRight:'8%',
        alignItems:'center',
        borderWidth:1,
        borderColor:'black',
        zIndex:150
    },
    button: {
        marginTop: '5%',
        marginBottom: '10%',
        alignSelf: 'center',
    },

    field_command : {
        marginLeft: '8%',
        marginBottom: '8%',
        fontSize: 16,
        flex: 1,
        color:'black',
        height:30,
        zIndex:50
    },
    justifySpaceBetween: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    fieldOther : {
        marginTop: 5,
        fontSize: 16,
        flex:1,
        color:'black',
    },
    aligner: {
        flexDirection:'row',
        flex: 1,
    },
    selectContainer: {
        position: 'relative',
        flex: 0,
        height:190,
        zIndex:200
    },
})