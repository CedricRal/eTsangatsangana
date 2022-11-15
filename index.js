/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import Searchbar from './src/views/Produits/filterSearchBar';
import CommandList from './liste_des_commandes/CommandList';

AppRegistry.registerComponent(appName, () => App);
