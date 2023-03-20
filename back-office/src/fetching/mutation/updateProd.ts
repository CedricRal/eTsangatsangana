import {gql} from '@apollo/client'

  export type UpdateProduitVar = {
    id: string;
    image?: string;
    titre: string;
    resume: string;
    description?: string | null;
    qt: number;
    prix: number;
    livraison?: string | null;
    place_dispo?: number | null;
    status: number;
    id_etp: string;
  };

export type UpdateProduitData = {
    updateProduit : {
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
    }
}

export const UPDATE_PROD = gql`
    mutation UpdateProduit(
        $id: String!
        $image: String
        $titre: String!
        $resume: String!
        $description: String
        $qt: Int!
        $prix: Int!
        $livraison: String
        $place_dispo: Int
        $status: Int
        $id_etp: String!
    ){
        updateProduit(
            id: $id
            image: $image
            titre: $titre
            resume: $resume
            description: $description
            qt: $qt
            prix: $prix
            livraison: $livraison
            place_dispo: $place_dispo
            status: $status
            id_etp: $id_etp
        ){
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