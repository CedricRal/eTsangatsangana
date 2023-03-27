
import { gql } from '@apollo/client';


export const GET_USER = gql`
    mutation auth_user($mail:String!, $mdp:String!){
        auth_user(mail:$mail, mdp:$mdp){
            id, token
        }
    }
`
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

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
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

export const CREATE_COMMANDE = gql`
mutation createCommande($qt:Int!, $livraison:String!, $date:Date!, $type_payement:String!, $status:String!, $id_users:String!, $id_etp:String!, $id_produits:String!){
    createCommande(
        qt:$qt,
        livraison:$livraison,
        date:$date,
        type_payement:$type_payement,
        status:$status,
        id_users:$id_users,
        id_etp:$id_etp,
        id_produits:$id_produits,
    ){qt, livraison, date, type_payement, status, id_users, id_etp, id_produits}
}
`
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

export const UPDATE_USER = gql`
mutation update_user($id_user:String!, $nom:String, $prenom:String, $num_tel:String, $mail:String, $adresse:String, $photo:String, $mdp:String){
    update_user(
        id_user:$id_user,
        nom:$nom,
        prenom:$prenom,
        num_tel:$num_tel,
        mail:$mail,
        adresse:$adresse,
        photo:$photo,
        mdp:$mdp
    ){ nom, prenom, num_tel, mail, photo, adresse, mdp}
}
`
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

export const SEND_MAIL = gql`
mutation send_mail($mail:String!){
    send_mail(
        mail:$mail
    ){ id }
}
`
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

export const VERIFY_CODE = gql`
mutation verification_code($id:String!, $code:String){
    verification_code(
        id:$id, code:$code
    ){ id }
}
`
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

export const UPDATE_MDP = gql`
mutation update_mdp($id:String!, $mdp:String!){
    update_mdp(
        id:$id, mdp:$mdp
    ){nom, prenom, mail, mdp}
}
`