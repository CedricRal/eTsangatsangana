
import React, {useEffect} from 'react';

import Hotel from './views/Detail_produit/hotel';
import Transport from './views/Detail_produit/transport';
import Restaurant from './views/Detail_produit/restauration';
import LogIn from './views/LogSign_in/LogIn';
import SingIn from './views/LogSign_in/SingIn';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Home from './Acceuil';
import ProfilEdit from '../ProfileManagement/EditProfile';
import Recup from './views/Mdp_oublie/Recuperation';
import CodeRecup from './views/Mdp_oublie/CodeRecup';
import NewPass from './views/Mdp_oublie/NewPassword';
import Offre from './views/Produits/Offre';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import UserProfile from './../ProfileManagement/Profil';
import CommandDetails from '../details_des_commandes/transport';
import PayementDeLaCommande from '../ProfileManagement/PayementDeLaCommande';
import CommandList from '../liste_des_commandes/CommandList';
import hotel from '../details_des_commandes/hotel';
import transport from '../details_des_commandes/transport';
import food from '../details_des_commandes/food';
import Carte from '../paiement/Paiement_carte';
import Mobile from '../paiement/Paiement_mobile';
import SplashScreen from 'react-native-splash-screen';

const HomeStack = createNativeStackNavigator();
const OffreStack = createNativeStackNavigator();
const CommandesStack = createNativeStackNavigator();
const ProfilStack = createNativeStackNavigator();

function HomeStackScreen(){
  return(
    <>
      <HomeStack.Navigator initialRouteName='Accueil'>
        <HomeStack.Screen name='Accueil ' component={Home}/>
        <HomeStack.Screen name='Hotel' component={Hotel}/>
        <HomeStack.Screen name='Restaurant' component={Restaurant}/>
        <HomeStack.Screen name='Transport' component={Transport}/>
        <HomeStack.Screen name='LogIn' component={LogIn} options={{title: 'Se connecter'}}/>
        <HomeStack.Screen name='SingIn' component={SingIn} options={{title: 'S\'inscrire'}}/>
        <HomeStack.Screen name='Recup' component={Recup} options={{title: 'Récupération'}}/>
        <HomeStack.Screen name='CodeRecup' component={CodeRecup} options={{title: 'Code de récupération'}}/>
        <HomeStack.Screen name='NewPass' component={NewPass} options={{title: 'Nouveau mot de passe'}}/>
        <HomeStack.Screen name='PaymentCommand'  component={ PayementDeLaCommande }  options={{title: 'Mode de paiement'}}/>
        <HomeStack.Screen name='MobilePayement'  component={ Mobile }  options={{title: 'Paiement par mobile'}}/>
        <HomeStack.Screen name='CardPayement'  component={ Carte }  options={{title: 'paiement par carte'}}/>
      </HomeStack.Navigator>
    </>
  )
}
function OffreStackScreen(){
  return(
    <>
      <OffreStack.Navigator initialRouteName='Offre'>
        <OffreStack.Screen name='Les Offres' component={Offre}/>
      </OffreStack.Navigator>
    </>
  )
}
function CommandesStackScreen(){
  return(
    <>
      <CommandesStack.Navigator initialRouteName='Liste_commande'>
      <CommandesStack.Screen name='Liste_commande'  component={ CommandList }  options={{title: 'La liste des commande'}}/> 
      <CommandesStack.Screen name='DetailsCommand' component={ CommandDetails }  options={{title: 'Details de la commande'}}/>
      <CommandesStack.Screen name='hotel' component={ hotel }  options={{title: 'Hotel'}}/>
      <CommandesStack.Screen name='transport'  component={ transport }  options={{title: 'Transport'}}/>
      <CommandesStack.Screen name='restaurant'  component={ food }  options={{title: 'Restaurant'}}/>
      </CommandesStack.Navigator>
    </>
  )
}
function ProfilStackScreen(){
  return(
    <> 
      <ProfilStack.Navigator initialRouteName='ModificationProfile'>
        <ProfilStack.Screen name='ModificationProfile' component={ ProfilEdit } options={{title: 'Modifier profile'}}/>
        <ProfilStack.Screen name='AffichageProfile' component={ UserProfile } options={{title: 'Profile'}}/>
      </ProfilStack.Navigator>
    </>
  )
}


  const Tab = createBottomTabNavigator();
  export default function App() {

  useEffect(() => {
      SplashScreen.hide();
    }, [])

    return (
      <NavigationContainer>
        <Tab.Navigator screenOptions={({route}) => ({
        tabBarIcon : ({focused, color, size}) => {
            let iconName;

            if (route.name == 'Accueil') {
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
        tabBarHideOnKeyboard: true,
       })}>
          <Tab.Screen name="Accueil" component={HomeStackScreen} />
          <Tab.Screen name="Profile" component={ProfilStackScreen} />
          <Tab.Screen name="Offres" component={OffreStackScreen} />
          <Tab.Screen name="Commandes" component={CommandesStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
//      {variable[param]}

