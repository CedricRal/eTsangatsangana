import { gql } from '@apollo/client'

type produits = {
    id: string;
    titre: string;
    resume: string;
    description: string | null;
    qt: number;
    prix: number;
    livraison: string | null;
    place_dispo: number | null;
    id_etp: string;
    status: number | null;
};

export type delProduitsResponse = {
    delProduit: produits
}

export type delProduitVar = {
    id: string
}

export const DEL_PRODUITS = gql`
    mutation DelProduit(
        $id: String!
    ){
        delProduit(id:$id){
            id
            titre
            resume
            description
            qt
            prix
            livraison
            place_dispo
            id_etp
            status
        }
    }
`