import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

import styles from './styles';

export default Hotel = ({navigation}) => {

    const hotel = {
        commande: 'chambre double',
        entreprise: 'Carlton',
        nombre_prs: 2,
        prix: 180000
    }

    return (
        <ScrollView>

        <View style={styles.container}>
            
            <Text style={styles.text}>Votre commande</Text>

            <Text style={styles.field_command}><Text style={styles.label}>Nom</Text>: RAIVO </Text>
            <Text style={styles.field_command}><Text style={styles.label}>Téléphone</Text>: 0336298214</Text>
            <Text style={styles.field_command}><Text style={styles.label}>Commande</Text>: {hotel.commande} places </Text>
            <Text style={styles.field_command}><Text style={styles.label}>Entreprise</Text>: {hotel.entreprise} </Text>
            <Text style={styles.field_command}><Text style={styles.label}>Nombre de personne</Text>: {hotel.nombre_prs} </Text>
            <Text style={styles.field_command}><Text style={styles.label}>Prix</Text>: {hotel.prix} ariary</Text>
            
            <View style={styles.button}>
                <Button title='Valider ma commande' onPress={
                () => navigation.navigate('PaymentCommand')}/>
            </View>
        </View>
        </ScrollView>
    )
}