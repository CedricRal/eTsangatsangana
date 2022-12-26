import { gql } from "@apollo/client";

export const GET_USER = gql`
    query auth_user($mail:String!, $mdp:String!){
        auth_user(mail:$mail, mdp:$mdp){
            id, token
            }
    }
`