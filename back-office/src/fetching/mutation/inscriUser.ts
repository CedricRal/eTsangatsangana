import { gql, useMutation } from '@apollo/client'

export const INSCRI_USER = gql`
    mutation Inscri_User(
        $nom: String!
        $prenom: String!
        $num_tel: String!
        $mail: String!
        $adresse: String!
        $photo: String
        $mdp: String!
        $adr_fb: String
        $adr_gmail: String
        $id_apple: String
        $id_etp: String
    ){
        inscri_user(
            nom: $nom
            prenom: $prenom
            num_tel: $num_tel
            mail: $mail
            adresse: $adresse
            photo: $photo
            mdp: $mdp
            adr_fb: $adr_fb
            adr_gmail: $adr_gmail
            id_apple: $id_apple
            id_etp: $id_etp
        ){
            id
            nom
            prenom
            num_tel
            mail
            adresse
            photo
            mdp
            adr_fb
            adr_gmail
            id_apple
            id_etp
        }
    }
`

type users = {
    id: string;
    nom: string;
    prenom: string;
    num_tel: string;
    mail: string;
    adresse: string;
    photo: string;
    mdp: string;
    adr_fb: string;
    adr_gmail: string;
    id_apple: string;
    id_etp: string
}

export type InscriUsersData = {
    inscri_users: users
}

export type InscriUsersVar = {
    nom: string;
    prenom: string;
    num_tel: string;
    mail: string;
    adresse: string;
    photo?: string | null;
    mdp: string;
    adr_fb?: string | null;
    adr_gmail?: string | null;
    id_apple?: string | null;
    id_etp?: string | null;
}