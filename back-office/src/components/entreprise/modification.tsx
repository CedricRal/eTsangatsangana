import React, { useState } from "react"
import { Modal, Button, Form, InputGroup } from "react-bootstrap"
import { UPDATE_ETP, UpdateEtpData, UpdateEtpVar } from '../../fetching/mutation/updateEtp'
import { useMutation,useQuery } from "@apollo/client";
import { Valide } from './pop-up'
import { GetAllEntrepriseResponse, GET_ALL_ENTREPRISE_QUERY, GetOneEtp } from '../../fetching/query/listeEtp'

type propsEtp = {
    id: string
    logoTmp: string
    image: string
    nom: string
    logo: string
    adresse: string
    numero_telephone: string
    nom_fb: string
    type_service: string
    NIF_STAT?: string
    slogan: string
    description: string
    type_abonnement: string,
    show: boolean,
    onHide: any,
    onChangeNum: any
    onChangeNom: any
    onChangeLogo: any
    onChangeAdresse: any
    onChangeNomfb: any
    onChangeService: any
    onChangeNif: any
    onChangeSlogan: any
    onChangeDescription: any
    onChangeAbonnement: any
}

export const Modif = (props: propsEtp) => {
    const { refetch } = useQuery<GetAllEntrepriseResponse>(
        GET_ALL_ENTREPRISE_QUERY,
        {
            variables: { page: 0 },
            pollInterval: 200
        },
    );
    const [updateEtp, { data, loading, error }] = useMutation<UpdateEtpData, UpdateEtpVar>(
        UPDATE_ETP, {
        refetchQueries: [{ query: GET_ALL_ENTREPRISE_QUERY, variables: { page: 0 } }],
        onQueryUpdated(observableQuery) {
            // Define any custom logic for determining whether to refetch
            return observableQuery.refetch();
        }
    }
    )
    const [showModal, setShowModal] = useState<boolean>(false)
    const [showToast, setShowToast] = useState<boolean>(false)
    const modifValide = (event: any) => {
        console.log(props.image);
        console.log(props.logoTmp);
        console.log(props.logo);
        if (props.logo) {
            updateEtp({
                variables: { id: props.id, nom: props.nom, adresse: props.adresse, tel: props.numero_telephone, type_service: "test", slogan: props.slogan, description: props.description, date_abonnement: new Date(), type_abonnement: "test", mode_payement: "test", date_payement: new Date() }
            })
        } {
            updateEtp({
                variables: { id: props.id, nom: props.nom, logo: props.logo, adresse: props.adresse, tel: props.numero_telephone, type_service: "test", slogan: props.slogan, description: props.description, date_abonnement: new Date(), type_abonnement: "test", mode_payement: "test", date_payement: new Date() }
            })
        }



        setShowModal(true)
        setShowToast(true)
    }
    const [num, setNum] = useState('')
    const [nom, setNom] = useState('')
    const [logo, setLogo] = useState('')
    const [adresse, setAdresse] = useState('')
    const [nom_fb, setNom_fb] = useState('')
    const [service, setService] = useState('')
    const [nif, setNif] = useState('')
    const [slogan, setSlogan] = useState('')
    const [descriprion, setDescription] = useState('')
    const [abonnement, setAbonnement] = useState('')
    if (loading) { return <p>loading</p> }
    if (error) { return <p>{error.message}</p> }
    return (
        <div style={{ fontFamily: "roboto" }}>
            <Modal
                show={(showModal == true) ? false : props.show}
                onHide={props.onHide}
                backdrop="static"
                keyboard={false}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Modification de "{props.nom}"
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={modifValide}>
                    <Modal.Body>
                        <Form.Group className='mb-3'>
                            <Form.Label>
                                <b>
                                    Nom
                                </b>
                            </Form.Label>
                            <Form.Control value={props.nom} type="text" placeholder="Entrer le nom de l‘entreprise" onChange={props.onChangeNom} />
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Logo</Form.Label>
                            <Form.Control
                                type="file"
                                placeholder="Url du logo"
                                value={props.logo}
                                onChange={props.onChangeLogo}
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2" />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>
                                <b>Adresse</b>
                            </Form.Label>
                            <Form.Control value={props.adresse} type="text" onChange={props.onChangeAdresse} placeholder="Entrer l‘adresse de l‘entreprise" />
                        </Form.Group>
                        <Form.Label><b>Numéro téléphone</b></Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>+261</InputGroup.Text>
                            <Form.Control type="text" aria-label="Num tel" placeholder='Numéro de téléphone' value={props.numero_telephone} onChange={props.onChangeNum} />
                        </InputGroup>
                        <Form.Group className='mb-3'>
                            <Form.Label>
                                <b>Nom sur facebook</b>
                            </Form.Label>
                            <Form.Control type="text" value={props.nom_fb} onChange={props.onChangeNomfb} placeholder="Entrer le nom sur facebook de l‘entreprise" />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>
                                <b>Type de service</b>
                            </Form.Label>
                            <Form.Select aria-label="Default select example">
                                <option>Choisissez...</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>
                                <b>Slogan</b>
                            </Form.Label>
                            <Form.Control type="text" placeholder="Slogan de l‘entreprise" value={props.slogan} onChange={props.onChangeSlogan} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label><b>Description</b></Form.Label>
                            <Form.Control as="textarea" rows={3} value={props.description} onChange={props.onChangeDescription} />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>
                                <b>Type d’abonnement</b>
                            </Form.Label>
                            <Form.Select aria-label="Default select example">
                                <option>Choisissez...</option>
                            </Form.Select>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={props.onHide}>Annuler</Button>
                        <Button variant="success" type="submit">Valider</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <Valide show={showToast} onClose={() => { setShowToast(false) }} message="Modification" />
        </div>
    )
}