import React from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';

function Input ({label, error, password, onFocus = () => {}, ...props}) {
    const [isFocused, setIsFocused] = React.useState(false);
    const [hidePassword, setHidePassword] = React.useState(password); //check si c'est un password(ici 'true')

    return(
        <View style={styles.inputView}>
            <View style={[styles.inputContainer, {borderColor: error? 'red': isFocused? 'blue': 'grey'}]}>
                <TextInput 
                secureTextEntry={hidePassword}  //cache le mot de passe
                style={{flex:1}} 
                {...props} 
                onFocus={()=>{
                    onFocus();
                    setIsFocused(true);
                    }}
                    onBlur={()=>{
                    setIsFocused(false);
                }}/>
            </View>
            {error && (
                <Text style={styles.errorText}>{error}</Text>//affiche l'erreur s'il y en a
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    inputView : {
        marginBottom: 20
    },
    inputContainer: {
        height: 40,
        backgroundColor: 'whitesmoke',
        flexDirection: 'row',
        paddingHorizontal: 15,
        borderWidth: 0.5,
        alignItems: 'center'
    },
    errorText : {
        color:'red',
        fontSize:12,
        marginTop:7
    }
}
)

export default Input;