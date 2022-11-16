import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import design from './couleur';

const Button = ({title, onPress = () => {}}) => {
    return(
        <TouchableOpacity 
        onPress={onPress} 
        style={styles.champBouton}>
            <Text style={styles.textBouton}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    champBouton :{
        height: 45,
        backgroundColor:design.Marron,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        width:'90%',
        marginBottom:'10%',
        borderRadius: 20
    },
    textBouton : {
        fontWeight:'bold',
        fontSize:18,
        color:design.Blanc
    }
})

export default Button;