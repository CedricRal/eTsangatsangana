import { gql, useQuery } from '@apollo/client'

export type GetOneEtp = {
    id: string;
    nom: string;
    logo: string;
    adresse: string;
    tel: string;
    adr_fb: string;
    type_service: string;
    NIF_STAT: string;
    slogan: string;
    description: string;
    date_abonnement: Date;
    type_abonnement: string;
    mode_payement: string;
    date_payement: Date;
};

type GetAllEtp = {
    nbr_page: number;
    items: Array<GetOneEtp>;
};

export type GetAllEntrepriseResponse = {
    getAllEntreprise: GetAllEtp;
};


export const GET_ALL_ENTREPRISE_QUERY = gql`
    query GetAllEntreprise($page: Int!) {
      getAllEntreprise(page: $page) {
        nbr_page
        items {
          id
          nom
          logo
          adresse
          tel
          adr_fb
          type_service
          NIF_STAT
          slogan
          description
          date_abonnement
          type_abonnement
          mode_payement
          date_payement
        }
      }
    }
  `;