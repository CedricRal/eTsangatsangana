import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


export default Test = () => {


    return(
        <View>
            <Icon name="home" size={30} color="#900" />
            <Text>Hello world</Text>
            <FontAwesome5 name={'home'} />
            <FontAwesome5 name={'google'} />
            <View style={{flexDirection:"row"}}>
<Icon
            name={"cog"}
            color={"black"}
            size={100}
/>
<Icon
            name={"history"}
            color={"black"}
            size={100}
/>
<Icon
            name={"award"}
            color={"black"}
            size={100}
/>
<Icon
            name={"trophy"}
            color={"black"}
            size={100}
/>
</View>
        </View>
    )
}

