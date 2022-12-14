import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import styles from './styles';
import { useTranslation } from 'react-i18next';

export default Hotel = ({navigation}) => {
    const {t} = useTranslation();

    const hotel = {
        commande: 'chambre double',
        entreprise: 'Carlton',
        nombre_prs: 2,
        prix: 180000
    }

    return (
        <ScrollView>

        <View style={styles.container}>
            
            <Text style={styles.text}>{t('langues:yourOrder')}</Text>

            <Text style={styles.field_command}><Text style={styles.label}>{t('langues:name')}</Text>: RAIVO </Text>
            <Text style={styles.field_command}><Text style={styles.label}>{t('langues:phone')}</Text>: 0336298214</Text>
            <Text style={styles.field_command}><Text style={styles.label}>{t('langues:order')}</Text>: {hotel.commande} places </Text>
            <Text style={styles.field_command}><Text style={styles.label}>{t('langues:company')}</Text>: {hotel.entreprise} </Text>
            <Text style={styles.field_command}><Text style={styles.label}>{t('langues:nb')}</Text>: {hotel.nombre_prs} </Text>
            <Text style={styles.field_command}><Text style={styles.label}>{t('langues:price')}</Text>: {hotel.prix} ariary</Text>

        </View>
        </ScrollView>
    )
}