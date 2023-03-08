import { gql, useMutation } from '@apollo/client'

export type createEtpData = {
    create_entreprise: {
        id: string;
        nom: string;
        logo: string;
        adresse: string;
        tel: string;
        adr_fb: string | null;
        type_service: string;
        NIF_STAT: string | null;
        slogan: string;
        description: string;
        date_abonnement: Date;
        type_abonnement: string;
        mode_payement: string;
        date_payement: Date;
    }
}

export type CreateEntrepriseVariables = {
    nom: string;
    logo: string;
    adresse: string;
    tel: string;
    adr_fb?: string | null;
    type_service: string;
    NIF_STAT?: string | null;
    slogan: string;
    description: string;
    date_abonnement: Date;
    type_abonnement: string;
    mode_payement: string;
    date_payement: Date;
    nomAdmin: string
    prenomAdmin: string
    num_telAdmin: string
    mailAdmin: string
    adresseAdmin: string
    mdpAdmin: string
    adr_fbAdmin?: string | null
    adr_gmailAdmin?: string | null
    id_appleAdmin?: string | null
}

export const CREATE_ENTREPRISE = gql`
  mutation CreateEntreprise(
    $nom: String!
    $logo: String!
    $adresse: String!
    $tel: String!
    $adr_fb: String
    $type_service: String!
    $NIF_STAT: String
    $slogan: String!
    $description: String!
    $date_abonnement: Date!
    $type_abonnement: String!
    $mode_payement: String!
    $date_payement: Date!
    $nomAdmin: String!
    $prenomAdmin: String!
    $num_telAdmin: String!
    $mailAdmin: String!
    $adresseAdmin: String!
    $mdpAdmin: String!
    $adr_fbAdmin: String
    $adr_gmailAdmin: String
    $id_appleAdmin: String
  ) {
    create_entreprise(
      nom: $nom
      logo: $logo
      adresse: $adresse
      tel: $tel
      adr_fb: $adr_fb
      type_service: $type_service
      NIF_STAT: $NIF_STAT
      slogan: $slogan
      description: $description
      date_abonnement: $date_abonnement
      type_abonnement: $type_abonnement
      mode_payement: $mode_payement
      date_payement: $date_payement
      nomAdmin: $nomAdmin
      prenomAdmin: $prenomAdmin
      num_telAdmin: $num_telAdmin
      mailAdmin: $mailAdmin
      adresseAdmin: $adresseAdmin
      mdpAdmin: $mdpAdmin
      adr_fbAdmin: $adr_fbAdmin
      adr_gmailAdmin: $adr_gmailAdmin
      id_appleAdmin: $id_appleAdmin
    ) {
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
`