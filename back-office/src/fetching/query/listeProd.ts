import { gql } from '@apollo/client'


export type produits = {
    id: string
    titre: string
    resume: string
    qt: number
    prix: number
    livraison: string
    place_dispo: number
    entreprise: string
    image: string
    status:number
}

type GetAllProd = {
    nbr_page: number;
    produits: Array<produits>
}

export type GetAllProduitsResponse = {
    getAllProduit: GetAllProd
}

export const LISTE_PROD = gql`
    query GetAllProd ($page: Int! $id_etp: String){
        getAllProduit(
            page:$page 
            id_etp: $id_etp
        ){
            nbr_page
            produits {
                id
                titre
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
    }
`