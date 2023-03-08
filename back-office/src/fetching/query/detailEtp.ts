import { gql } from '@apollo/client'

type Entreprise = {
    id: string;
    nom: string;
    logo: string;
    adresse: string;
    tel: string;
    adr_fb?: string;
    type_service: string;
    NIF_STAT?: string;
    slogan: string;
    description: string;
    date_abonnement: Date;
    type_abonnement: string;
    mode_payement: string;
    date_payement: Date;
    status: number;
    users: string;
}

type GetOneEtp = Partial<Entreprise>;

export type GetOneEntrepriseResponse = {
    getOneEntreprise: GetOneEtp;
}

export const GET_ONE_ENTREPRISE = gql`
  query GetOneEntreprise($id: String!) {
    getOneEntreprise(id: $id) {
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
      status
      users
    }
  }
`;