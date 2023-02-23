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
        getAllPublicites(page:0){
            items{
            titre,
            entreprise,
            image{titre},
            prix,
            resume
            }
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

const GET_PROFIL = gql`
    query profil_user($id:String!){
        profil_user(id:$id){
            id,nom, prenom, num_tel, mail, adresse, adr_gmail
        }
    }
`
export const useProfil = (id) => {
    const {data, loading, error} = useQuery(GET_PROFIL, {
        variables:{id}
    });
    const profilData = data;
    const profilLoading = loading;
    const profilError = error
    return{
        profilError,
        profilData,
        profilLoading
    }
}