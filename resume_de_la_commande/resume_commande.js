import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import styles from '../details_des_commandes/styles';

export default ResumeCommande = ({navigation}) => {

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
            
            <Text style={styles.text}>Votre commande</Text>
            
            <Text style={styles.field_command}><Text style={styles.label}>Nom</Text>: RAIVO </Text>
            <Text style={styles.field_command}><Text style={styles.label}>Téléphone</Text>: 0336298214</Text>
            <Text style={styles.field_command}><Text style={styles.label}>Commande</Text>: {cmd.commande}</Text>
            <Text style={styles.field_command}><Text style={styles.label}>Entreprise</Text>: {cmd.entreprise} </Text>
            <Text style={styles.field_command}><Text style={styles.label}>Nombre de personne</Text>: {cmd.nombre} </Text>
            <Text style={styles.field_command}><Text style={styles.label}>Prix</Text>: {cmd.prix} ariary </Text>
            <Text style={styles.field_command}><Text style={styles.label}>Mode de paiement</Text>: {cmd.mode_paiement} </Text>

            <View style={styles.button}>
                <Button title='Valider ma commande' onPress={() => Alert.alert('Félicitation!! Vôtre commande a été effectué avec succès')}/>
            </View>
        </View>
        </ScrollView>

    )
}