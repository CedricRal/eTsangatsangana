import { gql, useMutation } from '@apollo/client'

export const DEL_ETP = gql`
    mutation DelEtp($id: String!){
        delEtp(id:$id){
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
type etp = {
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

export type DelEtpData = {
    delEtp: etp
}

export interface DelEtpVar {
    id: string
}