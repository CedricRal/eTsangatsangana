import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserProfile from './Profil';
import ProfilEdit from './EditProfile';
import CommandDetails from '../details_des_commandes/transport';
import PayementDeLaCommande from './PayementDeLaCommande';
import CommandList from '../liste_des_commandes/CommandList';
import hotel from '../details_des_commandes/hotel';
import transport from '../details_des_commandes/transport';
import food from '../details_des_commandes/food';
import Carte from '../paiement/Paiement_carte';
import Mobile from '../paiement/Paiement_mobile';

const stack = createNativeStackNavigator();

export default function NavigateProfile() {

    return (
        <NavigationContainer>
            <stack.Navigator initialRouteName='DetailsCommand'>
                <stack.Screen name='AffichageProfile' component={ UserProfile } options={{title: 'Profile'}}/>
                <stack.Screen name='ModificationProfile' component={ ProfilEdit } options={{title: 'Modifier profile'}}/>
                <stack.Screen name='DetailsCommand' component={ CommandDetails }  options={{title: 'Details de la commande'}}/>
                <stack.Screen name='PaymentCommand'  component={ PayementDeLaCommande }  options={{title: 'Mode de paiement'}}/>
                <stack.Screen name='MobilePayement'  component={ Mobile }  options={{title: 'Paiement par mobile'}}/>
                <stack.Screen name='CardPayement'  component={ Carte }  options={{title: 'paiement par carte'}}/>
                <stack.Screen name='Liste_commande'  component={ CommandList }  options={{title: 'La liste des commande'}}/>
                <stack.Screen name='hotel' component={ hotel }  options={{title: 'Hotel'}}/>
                <stack.Screen name='transport'  component={ transport }  options={{title: 'Transport'}}/>
                <stack.Screen name='restaurant'  component={ food }  options={{title: 'Restaurant'}}/>
            </stack.Navigator>
        </NavigationContainer>
 );
  
};