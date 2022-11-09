import React from 'react';
import {View, StyleSheet, Text, TextInput, Image, TouchableOpacity} from 'react-native';

function Input ({label, error, password, onFocus = () => {}, ...props}) {
    const [isFocused, setIsFocused] = React.useState(false);
    const [hidePassword, setHidePassword] = React.useState(password); //check si c'est un password(ici 'true')

    return(
        <View style={styles.inputView}>
            <View style={[styles.inputContainer, {borderColor: error? 'red': isFocused? 'blue': 'black'}]}>
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
                    <Image 
                    source={hidePassword? require('../../assets/icon/hide.png') : require('../../assets/icon/open.png')}
                    style={{width:20, height:20}}/>
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
    },
    errorText : {
        color:'red',
        fontSize:12,
        marginTop:7
    }
}
)

export default Input;