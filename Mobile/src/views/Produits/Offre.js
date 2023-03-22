import React from 'react';
import {View, Text, ScrollView, } from 'react-native'

export default function Offre({navigation}){
    return(
        <>
        <ScrollView>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{fontSize: 60, color:'darkgrey', fontWeight:'bold'}}>Details des offres disonibles!</Text>
            <Text style={{color:'black'}}>Aliqua ullamco exercitation nisi proident dolore fugiat excepteur. In in tempor est officia consequat amet duis voluptate voluptate qui. Commodo anim reprehenderit est Lorem adipisicing. Occaecat ex dolore ut sunt anim adipisicing exercitation consectetur.</Text>
        </View>
        </ScrollView>
        </>
    )
}