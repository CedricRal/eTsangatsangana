
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Header from './Header';
import Hotel from './views/Detail_produit/hotel';
import Transport from './views/Detail_produit/transport';
import Restaurant from './views/Detail_produit/restauration';
import LogIn from './views/LogSign_in/LogIn';
import SingIn from './views/LogSign_in/SingIn';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Home from './Acceuil';
import Profil from './views/LogSign_in/Profil';
import Recup from './views/Mdp_oublie/Recuperation';
import CodeRecup from './views/Mdp_oublie/CodeRecup';
import NewPass from './views/Mdp_oublie/NewPassword';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
      <>
      <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
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
      </Stack.Navigator>
      </NavigationContainer>
      </>
    )
  }

export default App;

//      {variable[param]}

