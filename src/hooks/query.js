import { useQuery, gql } from "@apollo/client";

export const GET_USER = gql`
    query auth_user($mail:String!, $mdp:String!){
        auth_user(mail:$mail, mdp:$mdp){
            id, token
        }
    }
`
//-------------------------------------------------------------------------//

const GET_ALL_PUB = gql`
    query{
        getAllPublicites(page:0){
            items{
                id,
                titre,
                entreprise{id, nom},
                image{titre},
                prix,
                resume,
                produits
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
//----------------------------------------------------------------------------//

const GET_PROFIL = gql`
    query profil_user($id:String!){
        profil_user(id:$id){
            id,nom, prenom, num_tel, mail, adresse, adr_gmail
        }
    }
`
export const useProfil = (id) => {
    const {data, loading, error, refetch} = useQuery(GET_PROFIL, {
        variables:{id}
    });
    const profilData = data;
    const profilLoading = loading;
    const profilError = error
    return{
        refetch,
        profilError,
        profilData,
        profilLoading
    }
}
//----------------------------------------------------------------------------//

const GET_COMMANDE_LIST = gql`
    query listeCommandeUsers($id_users:String!){
        listeCommandeUsers(id_users:$id_users){
            id, date, qt, produit{image{titre}, titre, prix}, entreprise{nom, type_service}
        }
    }
`
export const useCommandeList = (id_users) => {
    const {data, loading, error} = useQuery(GET_COMMANDE_LIST, {
        variables:{id_users}
    });
    const commandeListData = data;
    const commandeListLoading = loading;
    const commandeListError = error
    return{
        commandeListData,
        commandeListLoading,
        commandeListError
    }
}
//---------------------------------------------------------------------------------//

const GET_ONE_ETP = gql`
    query getOneEntreprise($id:String!){
        getOneEntreprise(id:$id){
            nom, adresse, tel, type_service, description, heure_ouverture, heure_fermeture
        }
    }
`
export const useOneEtp = (id) => {
    const {data, loading, error} = useQuery(GET_ONE_ETP, {
        variables:{id}
    });
    const oneEtpData = data;
    const oneEtpLoading = loading;
    const oneEtpError = error;
    return{
        oneEtpData,
        oneEtpLoading,
        oneEtpError
    }
}