import React, {useLayoutEffect} from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Modal, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Button from '../src/views/Composant/bouton';
import { useMutation } from '@apollo/client';
import { CREATE_COMMANDE } from '../src/hooks/mutation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import design from '../src/views/Composant/couleur';
import AppStyles from '../styles/App_style';
import { formatPhoneNumber } from '../src/views/Composant/Format';

export default ResumeCommande = ({navigation}) => {
    const {t} = useTranslation();

    const route = useRoute();

    const date = new Date();
    const [modalVisible, setModalVisible] = React.useState(false);
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
    useLayoutEffect(() => {     //execute la fonction loadId dès que la page LogIn se lance
        loadId();
    },[]);

    const cmd = {
        nom: route.params.information.nom,
        tel: route.params.information.tel,
        commande: route.params.information.commande,
        entreprise: route.params.information.entreprise,
        nombre: route.params.information.nombre,
        prix: route.params.information.prix,
        idPub: route.params.information.idPub,
        idEtp:route.params.information.idEtp,
        idProduit:route.params.information.idProduit,
        modePaiement: route.params.information.modePaiement,
        type:route.params.information.type
    };
    const [ create_commande, {data, loading, error } ] = useMutation(CREATE_COMMANDE, {
        onCompleted: () => {
            setModalVisible(!modalVisible);
        },
        variables: {
            qt:cmd.nombre,
            livraison:'',
            date:date,
            type_payement:cmd.modePaiement,
            status:(cmd.modePaiement=== 'Paiement sur place')?'Non payé':'Payé',
            id_users:userId,
            id_etp:cmd.idEtp,
            id_produits:cmd.idProduit,
        }
    });
    
    const nbr = cmd.nombre
    console.log(JSON.stringify(error, null, 2))

    if(loading) return (<ActivityIndicator size={'large'} color={design.Vert} style={AppStyles.loader}/>)

    return (
        <ScrollView style={{backgroundColor:design.Blanc}}>
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
                        <Text style={styles.modalText}>{t('langues:orderSucced')}</Text>
                        <TouchableOpacity
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                            navigation.popToTop();
                        }}
                        >
                        <Text style={styles.textStyle}>Ok</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </Modal>


        <View style={styles.container}>
            
            <Text style={styles.text}>{t('langues:yourOrder')}</Text>
            
            <View style={styles.aligner}><Text style={styles.field_command}>{t('langues:name')}: </Text><Text style={styles.label}>{cmd.nom} </Text></View>
            <View style={styles.aligner}><Text style={styles.field_command}>{t('langues:phone')}: </Text><Text style={styles.label}>{formatPhoneNumber(cmd.tel)}</Text></View>
            <View style={styles.aligner}><Text style={styles.field_command}>{t('langues:order')}: </Text><Text style={styles.label}>{cmd.commande}</Text></View>
            <View style={styles.aligner}><Text style={styles.field_command}>{t('langues:company')}: </Text><Text style={styles.label}>{cmd.entreprise} </Text></View>
            <View style={styles.aligner}><Text style={styles.field_command}>{(cmd.type=='hotel')? t('langues:nb') : (cmd.type=='restaurant')? t('langues:nbOrder') : t('langues:nbPlace')}: </Text><Text style={styles.label}>{cmd.nombre} </Text></View>
            <View style={styles.aligner}><Text style={styles.field_command}>{t('langues:price')}: </Text><Text style={styles.label}>{cmd.prix.toLocaleString('fr-FR')} ariary </Text></View>
            <View style={styles.aligner}><Text style={styles.field_command}>{t('langues:mod')}: </Text><Text style={styles.label}>{cmd.modePaiement} </Text></View>

            <View style={styles.buttonValider}>
            <Button title='Valider ma commande' onPress={() => { create_commande()}}/>
            </View>

        </View>
        </ScrollView>

    )
}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
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
    text: {
        color:design.Marron,
        fontSize: 28,
        fontWeight:'bold',
        textAlign:'center',
        fontFamily: design.police,
        marginVertical:'10%'
    },
    field_command : {
        marginLeft: '3%',
        marginBottom: '5%',
        fontSize: 16,
        flex: 1,
        color:'black',
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
        marginRight: '3%',
        textAlign:'right',
        flex: 1,
        color:'black',
    },
    aligner: {
        flexDirection:'row',
        flex: 1,
        marginVertical:4
    },
    container: {
        flex:1,
        backgroundColor: design.Blanc,
        position:'relative',
    },
    buttonValider: {
        marginTop: '5%',
        marginBottom: '10%',
        alignSelf: 'center',
    },
})