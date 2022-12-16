import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import styles from '../details_des_commandes/styles';
import { useTranslation } from 'react-i18next';

export default ResumeCommande = ({navigation}) => {
    const {t} = useTranslation();

    const route = useRoute();

    const cmd = {
        nom_: route.params.nom,
        commande: 'Nugget',
        entreprise: 'Chicky',
        nombre: 2,
        prix: 2000,
        mode_paiement: route.params.carte
    }

    return (
        <ScrollView>
        <View style={styles.container}>
            
            <Text style={styles.text}>{t('langues:yourOrder')}</Text>
            
            <Text style={styles.field_command}><Text style={styles.label}>{t('langues:name')}</Text>: RAIVO </Text>
            <Text style={styles.field_command}><Text style={styles.label}>{t('langues:phone')}</Text>: 0336298214</Text>
            <Text style={styles.field_command}><Text style={styles.label}>{t('langues:order')}</Text>: {cmd.commande}</Text>
            <Text style={styles.field_command}><Text style={styles.label}>{t('langues:company')}</Text>: {cmd.entreprise} </Text>
            <Text style={styles.field_command}><Text style={styles.label}>{t('langues:nb')}</Text>: {cmd.nombre} </Text>
            <Text style={styles.field_command}><Text style={styles.label}>{t('langues:price')}</Text>: {cmd.prix} ariary </Text>
            <Text style={styles.field_command}><Text style={styles.label}>{t('langues:mod')}</Text>: {cmd.mode_paiement} </Text>

            <View style={styles.button}>
                <Button title='Valider ma commande' onPress={() => Alert.alert('Félicitation!! Vôtre commande a été effectué avec succès')}/>
            </View>
        </View>
        </ScrollView>

    )
}