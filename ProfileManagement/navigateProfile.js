import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserProfile from './Profil';
import ProfilEdit from './EditProfile';
import CommandDetails from './CommandDetails';
import PayementDeLaCommande from './PayementDeLaCommande';

const stack = createNativeStackNavigator();

export default function NavigateProfile() {

    return (
        <NavigationContainer>
            <stack.Navigator initialRouteName='DetailsCommand'>
                <stack.Screen name='AffichageProfile' component={ UserProfile } options={{title: 'Profile'}}/>
                <stack.Screen name='ModificationProfile' component={ ProfilEdit } options={{title: 'Modifier profile'}}/>
                <stack.Screen name='DetailsCommand' component={ CommandDetails } />
                <stack.Screen name='PaymentCommand'  component={ PayementDeLaCommande } />
            </stack.Navigator>
        </NavigationContainer>
 );
  
};