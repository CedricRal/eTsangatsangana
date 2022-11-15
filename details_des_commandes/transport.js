import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import styles from './styles';

export default Transport = ({navigation}) => {

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
            
            <Text style={styles.text}>Votre commande</Text>
            
                
            <Text style={styles.field_command}><Text style={styles.label}>Nom</Text>: RAIVO </Text>
            <Text style={styles.field_command}><Text style={styles.label}>Téléphone</Text>: 0336298214</Text>
            <Text style={styles.field_command}><Text style={styles.label}>Commande</Text>: {transport.commande} places </Text>
            <Text style={styles.field_command}><Text style={styles.label}>Entreprise</Text>: {transport.entreprise} </Text>
            <Text style={styles.field_command}><Text style={styles.label}>Nombre de personne</Text>: {transport.nombre_prs} </Text>
            <Text style={styles.field_command}><Text style={styles.label}>Direction</Text>: {transport.direction} </Text>
            <Text style={styles.field_command}><Text style={styles.label}>Prix</Text>: {transport.prix} ariary</Text>
            
            
            <View style={styles.button}>
                <Button title='Valider ma commande' onPress={
                () => navigation.navigate('PaymentCommand')}/>
            </View>
        </View>
        </ScrollView>
    )
}