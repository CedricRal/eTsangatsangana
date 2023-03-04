import React, {useLayoutEffect} from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Modal, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import styles from '../details_des_commandes/styles';
import { useTranslation } from 'react-i18next';
import Button from '../src/views/Composant/bouton';
import { useMutation } from '@apollo/client';
import { CREATE_COMMANDE } from '../src/hooks/mutation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import design from '../src/views/Composant/couleur'

export default ResumeCommande = ({navigation}) => {
    const {t} = useTranslation();

    const route = useRoute();

    const date = new Date().toLocaleDateString();
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
    })
    
    const nbr = cmd.nombre
    console.log(JSON.stringify(error, null, 2))

    return (
        <ScrollView>
            <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style={style.centeredView}>
                    <View style={style.modalView}>
                        <View style={style.circle}>
                        <Icon name='check' size={35} color={design.Vert} style={style.check}/>
                        </View>
                        <Text style={style.modalText}>{t('langues:orderSucced')}</Text>
                        <TouchableOpacity
                        style={[style.button, style.buttonClose]}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                            if(!loading)navigation.popToTop()
                        }}
                        >
                        <Text style={style.textStyle}>Ok</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </Modal>


        <View style={styles.container}>
            
            <Text style={styles.text}>{t('langues:yourOrder')}</Text>
            
            <Text style={styles.field_command}><Text style={styles.label}>{t('langues:name')}</Text>: {cmd.nom} </Text>
            <Text style={styles.field_command}><Text style={styles.label}>{t('langues:phone')}</Text>: {cmd.tel}</Text>
            <Text style={styles.field_command}><Text style={styles.label}>{t('langues:order')}</Text>: {cmd.commande}</Text>
            <Text style={styles.field_command}><Text style={styles.label}>{t('langues:company')}</Text>: {cmd.entreprise} </Text>
            <Text style={styles.field_command}><Text style={styles.label}>{(cmd.type=='hotel')? t('langues:nb') : (cmd.type=='restaurant')? t('langues:nbOrder') : t('langues:nbPlace')}</Text>: {cmd.nombre} </Text>
            <Text style={styles.field_command}><Text style={styles.label}>{t('langues:price')}</Text>: {cmd.prix} ariary </Text>
            <Text style={styles.field_command}><Text style={styles.label}>{t('langues:mod')}</Text>: {cmd.modePaiement} </Text>

            
            <Button title='Valider ma commande' onPress={() => {setModalVisible(!modalVisible); create_commande()}}/>
            
        </View>
        </ScrollView>

    )
}
const style = StyleSheet.create({
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
    }
})