import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

import styles from './styles';

export default Food = ({navigation}) => {

    const food = {
        commande: 'Nugget',
        entreprise: 'Chicky',
        nombre: 2,
        prix: 2000
    }

    return (
        <ScrollView>
        <View style={styles.container}>
            
            <Text style={styles.text}>Votre commande</Text>
            
            <Text style={styles.field_command}><Text style={styles.label}>Nom</Text>: RAIVO </Text>
            <Text style={styles.field_command}><Text style={styles.label}>Téléphone</Text>: 0336298214</Text>
            <Text style={styles.field_command}><Text style={styles.label}>Commande</Text>: {food.commande}</Text>
            <Text style={styles.field_command}><Text style={styles.label}>Entreprise</Text>: {food.entreprise} </Text>
            <Text style={styles.field_command}><Text style={styles.label}>Nombre de personne</Text>: {food.nombre} </Text>
            <Text style={styles.field_command}><Text style={styles.label}>Prix</Text>: {food.prix} ariary </Text>

            <View style={styles.button}>
                <Button title='Valider ma commande' onPress={
                () => navigation.navigate('PaymentCommand')}/>
            </View>
        </View>
        </ScrollView>

    )
}