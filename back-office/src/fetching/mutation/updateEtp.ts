import { gql } from '@apollo/client'

export const UPDATE_ETP = gql`
    mutation UpdateEtp(
        $id: String!
        $nom: String!
        $logo: String
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
    ){
        updateEtp(
            id: $id
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
        ){
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

export type UpdateEtpData = {
    updateEtp: {
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

export interface UpdateEtpVar {
    id: string
    nom: string;
    logo?: string | null;
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
}