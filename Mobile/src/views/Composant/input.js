import React from 'react';
import {View, StyleSheet, Text, TextInput, Image, TouchableOpacity} from 'react-native';
import design from './couleur';
import Icon from 'react-native-vector-icons/FontAwesome5';

function Input ({label, error, password, onFocus = () => {}, ...props}) {
    const [isFocused, setIsFocused] = React.useState(false);
    const [hidePassword, setHidePassword] = React.useState(password); //check si c'est un password(ici 'true')

    return(
        <View style={styles.inputView}>
            <View style={[styles.inputContainer, {borderColor: error? 'red': isFocused? design.Vert : design.Marron}]}>
                <TextInput 
                secureTextEntry={hidePassword}  //cache le mot de passe
                style={{flex:1}}
                scrollEnabled={(false)}
                {...props} 
                onFocus={()=>{
                    onFocus();
                    setIsFocused(true);
                    }}
                    onBlur={()=>{
                    setIsFocused(false);
                }}/>
                {password && (
                    <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                    <Icon 
                    name={hidePassword? 'eye-slash' : 'eye'} size={20} color={design.Marron}/>
                    </TouchableOpacity>
                )}
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
        height: 45,
        backgroundColor: 'whitesmoke',
        flexDirection: 'row',
        paddingHorizontal: 15,
        borderWidth: 1,
        alignItems: 'center',
        borderRadius: 10
    },
    errorText : {
        color:'red',
        fontSize:12,
        marginTop:7
    }
}
)

export default Input;