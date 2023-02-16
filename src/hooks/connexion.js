import { useQuery, gql } from "@apollo/client";
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQyMjc5OThkLTU1NGQtNDI5Mi05NjRlLWJkN2RkOTNkZmM0ZSIsImlhdCI6MTY3NTk1OTYwMH0.mFqN32SeHzvfp2K3EGBTl2NojiOD0uymJEW2Qm53Xzs'

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
            prix
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