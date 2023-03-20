import {gql} from '@apollo/client'

export const DETAIL_PROD = gql`
    query GetOneProduit($id: String!){
        getOneProduit(id: $id){
            id
            titre
            description
            resume
            qt
            prix
            livraison
            place_dispo
            entreprise
            image
            status
        }
    }
`
type produits = {
    id: string;
    titre: string;
    resume: string;
    description: string;
    qt: number;
    prix: number;
    livraison: string | null;
    place_dispo: number | null;
    id_etp: string;
    status: number | null;
}

type GetOneProd = Partial<produits>;

export type detailProdResponse = {
    getOneProduit: GetOneProd;
}
