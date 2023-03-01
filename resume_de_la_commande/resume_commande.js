import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import styles from '../details_des_commandes/styles';
import { useTranslation } from 'react-i18next';

export default ResumeCommande = ({navigation}) => {
    const {t} = useTranslation();

    const route = useRoute();

    const date = new Date();
    console.log(date.toLocaleDateString())

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
    }

    return (
        <ScrollView>
        <View style={styles.container}>
            
            <Text style={styles.text}>{t('langues:yourOrder')}</Text>
            
            <Text style={styles.field_command}><Text style={styles.label}>{t('langues:name')}</Text>: {cmd.nom} </Text>
            <Text style={styles.field_command}><Text style={styles.label}>{t('langues:phone')}</Text>: {cmd.tel}</Text>
            <Text style={styles.field_command}><Text style={styles.label}>{t('langues:order')}</Text>: {cmd.commande}</Text>
            <Text style={styles.field_command}><Text style={styles.label}>{t('langues:company')}</Text>: {cmd.entreprise} </Text>
            <Text style={styles.field_command}><Text style={styles.label}>{(cmd.type=='hotel')? t('langues:nb') : (cmd.type=='restaurant')? t('langues:nbOrder') : t('langues:nbPlace')}</Text>: {cmd.nombre} </Text>
            <Text style={styles.field_command}><Text style={styles.label}>{t('langues:price')}</Text>: {cmd.prix} ariary </Text>
            <Text style={styles.field_command}><Text style={styles.label}>{t('langues:mod')}</Text>: {cmd.modePaiement} </Text>

            <View style={styles.button}>
                <Button title='Valider ma commande' onPress={() => Alert.alert('Félicitation!! Vôtre commande a été effectué avec succès')}/>
            </View>
        </View>
        </ScrollView>

    )
}