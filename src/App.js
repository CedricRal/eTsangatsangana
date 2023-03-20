
import React, {useEffect, useLayoutEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import Hotel from './views/Detail_produit/hotel';
import Transport from './views/Detail_produit/transport';
import Restaurant from './views/Detail_produit/restauration';
import LogIn from './views/LogSign_in/LogIn';
import SingIn from './views/LogSign_in/SingIn';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './Acceuil';
import ProfilEdit from '../ProfileManagement/EditProfile';
import Recup from './views/Mdp_oublie/Recuperation';
import CodeRecup from './views/Mdp_oublie/CodeRecup';
import NewPass from './views/Mdp_oublie/NewPassword';
import Offre from './views/Produits/Offre';
import UserProfile from './../ProfileManagement/Profil';
import CommandDetails from '../details_des_commandes/transport';
import DetailCmd from '../resume_de_la_commande/detailCmd';
import PayementDeLaCommande from '../ProfileManagement/PayementDeLaCommande';
import CommandList from '../liste_des_commandes/CommandList';
import hotel from '../details_des_commandes/hotel';
import transport from '../details_des_commandes/transport';
import food from '../details_des_commandes/food';
import Carte from '../paiement/Paiement_carte';
import Mobile from '../paiement/Paiement_mobile';
import ResumeCommande from '../resume_de_la_commande/resume_commande';
import Languages from './views/Composant/Menu';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import design from './views/Composant/couleur';
import './constants/DCSlocalize';
import { useTranslation } from 'react-i18next';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SV_ENDPOINT } from "@env";


const HomeStack = createNativeStackNavigator();
const OffreStack = createNativeStackNavigator();
const CommandesStack = createNativeStackNavigator();
const ProfilStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const myHeader = {
  headerStyle:{backgroundColor:design.Marron},
  headerTintColor:design.Blanc,
  headerTitleStyle:{fontWeight:'bold'},
  headerTitleAlign:'center'
}
const tabBarStyles = {
  backgroundColor:design.Marron,
  paddingVertical: 5,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  marginTop:-20
}
const firstScreen = {
  headerTitleAlign:'left',
  headerTitleStyle:{fontSize:26}
}

function HomeStackScreen(){
  const {t} = useTranslation();
  return(
    <>
      <HomeStack.Navigator initialRouteName='Accueil'  screenOptions={myHeader}>
        <HomeStack.Screen name='Accueil ' component={Home} options={{title: t('langues:home'), headerTitleAlign:firstScreen.headerTitleAlign, headerTitleStyle:firstScreen.headerTitleStyle}}/>
        <HomeStack.Screen name='Hotel' component={Hotel} options={{title: t('langues:hotel')}}/>
        <HomeStack.Screen name='Restaurant' component={Restaurant} options={{title: t('langues:restaurant')}}/>
        <HomeStack.Screen name='Transport' component={Transport} options={{title: t('langues:transport')}}/>
        <HomeStack.Screen name='LogIn' component={LogIn} options={{title: t('langues:authentication')}}/>
        <HomeStack.Screen name='SingIn' component={SingIn} options={{title: t('langues:registration')}}/>
        <HomeStack.Screen name='Recup' component={Recup} options={{title: t('langues:recovery')}}/>
        <HomeStack.Screen name='CodeRecup' component={CodeRecup} options={{title: t('langues:recoveryCode')}}/>
        <HomeStack.Screen name='NewPass' component={NewPass} options={{title: t('langues:newPwd')}}/>
        <HomeStack.Screen name='PaymentCommand'  component={ PayementDeLaCommande }  options={{title: t('langues:modePayement')}}/>
        <HomeStack.Screen name='MobilePayement'  component={ Mobile }  options={{title: t('langues:mobileMoney')}}/>
        <HomeStack.Screen name='CardPayement'  component={ Carte }  options={{title: t('langues:card')}}/>
        <HomeStack.Screen name='resum_commande'  component={ ResumeCommande }  options={{title: t('langues:theOrder')}}/>
        <HomeStack.Screen name='detailCmd'  component={ DetailCmd }  options={{title: t('langues:detailsCmd')}}/>
      </HomeStack.Navigator>
    </>
  )
}
function OffreStackScreen(){
  const {t} = useTranslation();
  return(
    <>
      <OffreStack.Navigator initialRouteName='Offre' screenOptions={myHeader}>
        <OffreStack.Screen name='Les Offres' component={Offre} options={{title: t('langues:theOffers'), headerTitleAlign:firstScreen.headerTitleAlign, headerTitleStyle:firstScreen.headerTitleStyle}}/>
      </OffreStack.Navigator>
    </>
  )
}
function CommandesStackScreen(){
  const {t} = useTranslation();
  return(
    <>
      <CommandesStack.Navigator initialRouteName='Liste_commande' screenOptions={myHeader}>
      <CommandesStack.Screen name='Liste_commande'  component={ CommandList }  options={{title: t('langues:odrerList'), headerTitleAlign:firstScreen.headerTitleAlign, headerTitleStyle:firstScreen.headerTitleStyle}}/> 
      <CommandesStack.Screen name='DetailsCommand' component={ CommandDetails }  options={{title: t('langues:orderDetails')}}/>
      <CommandesStack.Screen name='hotel' component={ hotel }  options={{title: t('langues:myOrder')}}/>
      <CommandesStack.Screen name='transport'  component={ transport }  options={{title: t('langues:myOrder')}}/>
      <CommandesStack.Screen name='restaurant'  component={ food }  options={{title: t('langues:myOrder')}}/>
      <CommandesStack.Screen name='resum_commande'  component={ ResumeCommande }  options={{title: t('langues:theOrder')}}/>
      </CommandesStack.Navigator>
    </>
  )
}

function EditIconHeader() {
  const {t} = useTranslation();
  const navigation = useNavigation();
  return(
    <View style={styles.EditIcon}>
      <Text style={styles.profilTitle}>{t('langues:profile')}</Text>
      <TouchableOpacity style={styles.icon} onPress={() => { navigation.navigate('ModificationProfile') }}>
        <Icon name='user-edit' color={design.Blanc} size={24}/>
      </TouchableOpacity>
    </View>
  );
}

function DrawerStackScreen(){
  const {t} = useTranslation();
  return(
    <>
      <Drawer.Navigator initialRouteName='AffichageProfile' screenOptions={myHeader} >
        <Drawer.Screen name='AffichageProfile' component={ UserProfile } options={{headerTitle: (tabBarButtonProps) => <EditIconHeader {...tabBarButtonProps} />, title: t('langues:profile'), headerTitleAlign:firstScreen.headerTitleAlign, headerTitleStyle:firstScreen.headerTitleStyle}}/>
        <Drawer.Screen name='ModificationProfile' component={ ProfilEdit } options={{title: t('langues:modifProfile')}}/>
        <Drawer.Screen name='Languages' component={ Languages } options={{title:t('langues:languages'), headerTitle:t('langues:chooseLanguage')}}/>
      </Drawer.Navigator>
    </>
  )
}

  const Tab = createBottomTabNavigator();

  export default function App({navigation}) {
    const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(false);
  
    const loadToken = async() => {
      console.log('execution de loadToken')
    try {
        const token = await AsyncStorage.getItem("myToken");    //prendre myToken dans AsyncStorage
        if(token !== null){    //condition si token existe déjà dans AsyncStorage
          setIsUserLoggedIn(true);
        };
    } catch (error) {
        alert(error);
    }
    };
  useEffect(() => {     //execute la fonction loadToken dès que la page LogIn se lance
      console.log('Screen refreshed')
      loadToken();
  },[]);

  const {t} = useTranslation();
  const httpLink = new HttpLink({
    uri: 'http://192.168.1.122:4000' //url endpoint graphql ici
  });
  console.log(SV_ENDPOINT);

  // Create an auth link
  const authLink = setContext(async (_, { headers }) => {
    // Get the authentication token from AsyncStorage if it exists
    const token = await AsyncStorage.getItem('myToken');
    // Return the headers to the context so HTTP link can read them
    return {
      headers: {
        ...headers,
        authorization: token ? token : ''
      }
    };
  });

  // Combine the auth link and the HTTP link
  const link = authLink.concat(httpLink);

  // Create an ApolloClient instance
  const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
  });

    useEffect(() => {
      setTimeout(() => {
        SplashScreen.hide();
      }, 500);
      }, [])

    return (
      <NavigationContainer>
        <ApolloProvider client={client}>
        <Tab.Navigator screenOptions={({route}) => ({
        tabBarIcon : ({focused, color, size}) => {
            let iconName;

            if (route.name == 'Accueil') {
                iconName = 'home'
            }else if (route.name == 'Profil'){
                iconName = 'user-circle'
            }else if (route.name == 'Offres'){
              iconName = 'gift'
            }else if (route.name == 'Commandes'){
              iconName = 'scroll'
          }
        return <Icon name={iconName} size={25} color={focused? design.Vert : design.Blanc} />
        },
        tabBarButton: (tabBarButtonProps) => {
          if ((route.name === 'Profil') && !isUserLoggedIn) {
            return (
              <TouchableOpacity
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                onPress={() => {loadToken()}}
              >
                <Icon name="user-circle" size={25} color={'grey'} />
                <Text style={{fontSize:11, color:'grey'}}>{t('langues:profile')}</Text>
              </TouchableOpacity>
            );
          } else if ((route.name === 'Commandes') && !isUserLoggedIn) {
            return (
              <TouchableOpacity
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                onPress={() => {loadToken()}}
              >
                <Icon name="scroll" size={25} color={'grey'} />
                <Text style={{fontSize:8, color:'grey'}}>{t('langues:orders')}</Text>
              </TouchableOpacity>
            );
          } else {
            return (
              <TouchableWithoutFeedback onPress={() => {}}>
                <TouchableOpacity {...tabBarButtonProps} />
              </TouchableWithoutFeedback>
            );
          }
        },
        tabBarStyle: tabBarStyles,
        tabBarActiveTintColor : design.Vert,
        tabBarInactiveTintColor : design.Blanc,
        headerShown : false,
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: { fontSize: 8 },
        tabPress: loadToken(),
       })}>
          <Tab.Screen name="Accueil" component={HomeStackScreen} options={{title: t('langues:home')}}/>
          <Tab.Screen name="Profil" component={DrawerStackScreen} options={{title: t('langues:profile')}}/>
          <Tab.Screen name="Offres" component={OffreStackScreen} options={{title: t('langues:offers')}}/>
          <Tab.Screen name="Commandes" component={CommandesStackScreen} options={{title: t('langues:orders')}}/>
        </Tab.Navigator>
        </ApolloProvider>
      </NavigationContainer>
    );
  }
  const styles = StyleSheet.create({
    EditIcon: {
      flex:1,
      flexDirection:'row',
    },
    profilTitle: {
      color:design.Blanc,
      textAlignVertical:'center',
      fontSize:24,
      fontWeight:'bold',
    },
    icon: {
      justifyContent:'center',
      marginLeft:'65%',
    },
  });