import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

import styles from './styles';
import { useTranslation } from 'react-i18next';

export default Food = ({navigation}) => {
    const {t} = useTranslation();

    const food = {
        commande: 'Nugget',
        entreprise: 'Chicky',
        nombre: 2,
        prix: 2000
    }

    return (
        <ScrollView>
        <View style={styles.container}>
            
            <Text style={styles.text}>{t('langues:yourOrder')}</Text>
            
            <Text style={styles.field_command}><Text style={styles.label}>{t('langues:name')}</Text>: RAIVO </Text>
            <Text style={styles.field_command}><Text style={styles.label}>{t('langues:phone')}</Text>: 0336298214</Text>
            <Text style={styles.field_command}><Text style={styles.label}>{t('langues:order')}</Text>: {food.commande}</Text>
            <Text style={styles.field_command}><Text style={styles.label}>{t('langues:company')}</Text>: {food.entreprise} </Text>
            <Text style={styles.field_command}><Text style={styles.label}>{t('langues:nb')}</Text>: {food.nombre} </Text>
            <Text style={styles.field_command}><Text style={styles.label}>{t('langues:price')}</Text>: {food.prix} ariary </Text>

        </View>
        </ScrollView>

    )
}