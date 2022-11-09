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
        height: 45,
        width:'100%',
        backgroundColor:'dodgerblue',
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        width:'90%',
        marginVertical:20
    },
    textBouton : {
        fontWeight:'bold',
        fontSize:20,
        color:'white'
    }
})

export default Button;