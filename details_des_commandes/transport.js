import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import styles from './styles';
import { useTranslation } from 'react-i18next';

export default Transport = ({navigation}) => {
    const {t} = useTranslation();

    const transport = {
        commande: 2,
        entreprise: 'Sanatra Trans',
        direction: 'Antsirabe',
        nombre_prs: 2,
        prix: 30000
    }

    return (
        <ScrollView>
        <View style={styles.container}>
            
            <Text style={styles.text}>{t('langues:yourOrder')}</Text>
            
                
            <Text style={styles.field_command}><Text style={styles.label}>{t('langues:name')}</Text>: RAIVO </Text>
            <Text style={styles.field_command}><Text style={styles.label}>{t('langues:phone')}</Text>: 0336298214</Text>
            <Text style={styles.field_command}><Text style={styles.label}>{t('langues:order')}</Text>: {transport.commande} places </Text>
            <Text style={styles.field_command}><Text style={styles.label}>{t('langues:company')}</Text>: {transport.entreprise} </Text>
            <Text style={styles.field_command}><Text style={styles.label}>{t('langues:nb')}</Text>: {transport.nombre_prs} </Text>
            <Text style={styles.field_command}><Text style={styles.label}>Direction</Text>: {transport.direction} </Text>
            <Text style={styles.field_command}><Text style={styles.label}>{t('langues:price')}</Text>: {transport.prix} ariary</Text>
            
            
            <View style={styles.button}>
                <Button title={t('langues:validate')} onPress={
                () => navigation.navigate('PaymentCommand')}/>
            </View>
        </View>
        </ScrollView>
    )
}