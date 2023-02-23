
import { gql } from '@apollo/client';

export const CREATE_USER = gql`
mutation inscri_user($nom:String!, $prenom:String!, $adresse:String!, $num_tel:String!, $mail:String!, $mdp:String!, $photo:String!){
    inscri_user(
        nom:$nom,
        prenom:$prenom,
        adresse:$adresse,
        num_tel:$num_tel,
        mail:$mail,
        mdp:$mdp,
        photo:$photo
    ){nom, prenom, adresse, num_tel, mail, mdp, photo, adr_fb, adr_gmail, id_apple}
}
`