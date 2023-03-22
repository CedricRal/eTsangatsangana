import {gql} from '@apollo/client'

export const AUTHENTIFICATION = gql`
    mutation Auth_User(
        $mail: String!
        $mdp: String!
    ){
        auth_user(
            mail: $mail
            mdp: $mdp
        ){
            id
            token
        }
    }
`

export type authentificationVar = {
    mail: string
    mdp: string
}

type connexion = {
    id: string
    token: string
}

export type authentificationResponse = {
    auth_user: connexion
}