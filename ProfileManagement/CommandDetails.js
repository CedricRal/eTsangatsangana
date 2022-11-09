import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';

export default CommandDetails = ({navigation}) => {

    return (
        <ScrollView>
        <View style={styles.container}>
            <Text style={styles.text}>Votre commande</Text>
            
            <Text style={styles.field_command}><Text style={styles.label}>Nom</Text>: RAIVO </Text>
            <Text style={styles.field_command}><Text style={styles.label}>Téléphone</Text>: 0336298214</Text>
            <Text style={styles.field_command}><Text style={styles.label}>Commande</Text>: 2 places </Text>
            <Text style={styles.field_command}><Text style={styles.label}>Entreprise</Text>: Sanatra Trans</Text>
            <Text style={styles.field_command}><Text style={styles.label}>Nombre</Text>: 02 </Text>
            <Text style={styles.field_command}><Text style={styles.label}>Direction</Text>: Antsirabe</Text>
            <Text style={styles.field_command}><Text style={styles.label}>Prix</Text>: 30 000ar</Text>

            <View style={styles.button}>
                <Button title='Valider ma commande' onPress={
                () =>  navigation.navigate('Payment de la commande')}/>
            </View>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    label: {
        fontWeight: 'bold'
    },
    container: {
        flex:1,
        textAlign: 'right'
    },
    text: {
        marginTop: 80,
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 50
    },

    radioButton: {
        alignSelf: 'center',
    },

    button: {
        marginTop: 40,
        alignSelf: 'center',
        width: '45%',
    },

    field_command : {
        marginLeft: 90,
        marginBottom: 40
    },
})