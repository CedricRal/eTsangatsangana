import { useQuery, gql } from "@apollo/client";

export const GET_USER = gql`
    query auth_user($mail:String!, $mdp:String!){
        auth_user(mail:$mail, mdp:$mdp){
            id, token
        }
    }
`

const GET_ALL_PUB = gql`
    query{
        getAllPublicites{
            id
            titre
            resume
            description
            prix
        }
    }
`
export const useAllPub = () => {
    const { error, loading, data } = useQuery(GET_ALL_PUB);

    const allPubError = error;
    const allPubLoading = loading;
    const allPubData = data;
    return{
        allPubError,
        allPubLoading,
        allPubData
    }
}