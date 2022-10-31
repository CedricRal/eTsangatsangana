import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const tab = createBottomTabNavigator();

function AcceuilScreen() {
    return (
        <View style={styles.container}>
            <Text>Ecran d'acceuil</Text>
        </View>
    )
}

export default function Test() {
    return (
        <NavigationContainer>
            <tab.Screen name='Acceuil' component={AcceuilScreen}/>
        </NavigationContainer>
    )
}
