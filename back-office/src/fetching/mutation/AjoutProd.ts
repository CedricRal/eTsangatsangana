import { gql, useMutation } from '@apollo/client'

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
  
  type createProd = {
    image: string;
    items: produits;
  };
  
export type CreateProduitData = {
    createProd: createProd;
  };
  
export type CreateProduitVars = {
    image: string;
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
  
export const CREATE_PRODUIT = gql`
    mutation createProduit(
        $image:String!
        $titre: String!
        $resume: String!
        $description: String
        $qt: Int!
        $prix: Int!
        $livraison: String
        $place_dispo: Int
        $id_etp: String
        $status: Int
    ) {
      createProduit(
        image: $image
        titre: $titre
        resume: $resume
        description: $description
        qt: $qt
        prix: $prix
        livraison: $livraison
        place_dispo: $place_dispo
        id_etp: $id_etp
        status: $status
      ) {
        image
        items {
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
    }
  `