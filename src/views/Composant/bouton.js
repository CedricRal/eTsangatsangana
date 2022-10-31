import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

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
        height:55,
        width:'100%',
        backgroundColor:'dodgerblue',
        justifyContent:'center',
        alignItems:'center',
        marginVertical:20
    },
    textBouton : {
        fontWeight:'bold',
        fontSize:18,
        color:'white'
    }
})

export default Button;