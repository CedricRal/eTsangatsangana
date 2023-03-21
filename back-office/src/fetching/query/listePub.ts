import {gql} from '@apollo/client'

export const LISTE_PUB = gql`
    query GetAllPublicites($page: Int!){
        getAllPublicites(page: $page){
            nbr_page
            items{
                id
                titre
                resume
                description
                date_debut
                date_fin
                prix
                lieu
                image
                entreprise
                produits
            }
        }
    }
`

type GetOnePub = {
    id: string;
    titre: string;
    resume: string;
    description: string;
    date_debut: Date;
    date_fin: Date;
    prix: number;
    lieu: string;
    image: string;
    entreprise: string;
    produits: string;
}

type getAllPub = {
    nbr_page: number;
    items: Array<GetOnePub>;
}

export type ListePubResponse = {
    getAllPublicites: getAllPub;
}

