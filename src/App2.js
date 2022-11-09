
import React from 'react';

import Hotel from './views/Detail_produit/hotel';
import Transport from './views/Detail_produit/transport';
import Restaurant from './views/Detail_produit/restauration';
import LogIn from './views/LogSign_in/LogIn';
import SingIn from './views/LogSign_in/SingIn';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Home from './Acceuil';
import Profil from '../ProfileManagement/Profil';
import Recup from './views/Mdp_oublie/Recuperation';
import CodeRecup from './views/Mdp_oublie/CodeRecup';
import NewPass from './views/Mdp_oublie/NewPassword';
import Offre from './views/Produits/Offre';
import Commandes from './views/Produits/Commandes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

const HomeStack = createNativeStackNavigator();
const OffreStack = createNativeStackNavigator();
const CommandesStack = createNativeStackNavigator();
const ProfilStack = createNativeStackNavigator();

function HomeStackScreen(){             
  return(
    <>
      <HomeStack.Navigator screenOptions={{}}>
        <HomeStack.Screen name='Home' component={Home}/>
        <HomeStack.Screen name='Hotel' component={Hotel}/>
        <HomeStack.Screen name='LogIn' component={LogIn}/>
        <HomeStack.Screen name='SingIn' component={SingIn}/>
      </HomeStack.Navigator>
    </>
  )
}
function OffreStackScreen(){
  return(
    <>
      <OffreStack.Navigator>
        <OffreStack.Screen name='Les Offres' component={Offre}/>
      </OffreStack.Navigator>
    </>
  )
}
function CommandesStackScreen(){
  return(
    <>
      <CommandesStack.Navigator>
        <CommandesStack.Screen name='Mes commandes' component={Commandes}/>
      </CommandesStack.Navigator>
    </>
  )
}
function ProfilStackScreen(){
  return(
    <>
      <ProfilStack.Navigator>
        <ProfilStack.Screen name='Mon profile' component={Profil}/>
      </ProfilStack.Navigator>
    </>
  )
}

/*const Screen = () => {
    return (
      <>
      <NavigationContainer>
      <Stack.Navigator screenOptions={{}}>
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='Profil' component={Profil}/>
        <Stack.Screen name='Hotel' component={Hotel}/>
        <Stack.Screen name='Restaurant' component={Restaurant}/>
        <Stack.Screen name='Transport' component={Transport}/>
        <Stack.Screen name='SingIn' component={SingIn}/>
        <Stack.Screen name='LogIn' component={LogIn}/>
        <Stack.Screen name='Recup' component={Recup}/>
        <Stack.Screen name='CodeRecup' component={CodeRecup}/>
        <Stack.Screen name='NewPass' component={NewPass}/>
        <Stack.Screen name='Offre' component={Offre}/>
        <Stack.Screen name='Commandes' component={Commandes}/>
      </Stack.Navigator>
      </NavigationContainer>
      </>
    )
  }*/

  const Tab = createBottomTabNavigator();
  export default function App() {
    return (
      <NavigationContainer>
        <Tab.Navigator screenOptions={({route}) => ({
        tabBarIcon : ({focused, color, size}) => {
            let iconName;

            if (route.name == 'Acceuil') {
                iconName = require('./assets/icon/home.png')
            }else if (route.name == 'Profile'){
                iconName = require('./assets/icon/profile.png')
            }else if (route.name == 'Offres'){
              iconName = require('./assets/icon/offre.png')
            }else if (route.name == 'Commandes'){
              iconName = require('./assets/icon/reserve.png')
          }
        return <Image source={iconName} style={{width: 20, height: 20}} />
        },
        tabBarStyle: {backgroundColor:'lightsteelblue'},
        tabBarLabelStyle: {color:'black', fontWeight:'bold'},
        tabBarActiveBackgroundColor: "lightskyblue",
        headerShown : false,
       })}>
          <Tab.Screen name="Acceuil" component={HomeStackScreen} />
          <Tab.Screen name="Profile" component={ProfilStackScreen} />
          <Tab.Screen name="Offres" component={OffreStackScreen} />
          <Tab.Screen name="Commandes" component={CommandesStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
//      {variable[param]}

