import React, { useState } from "react"
import { Modal, Button, Form, InputGroup, Spinner } from "react-bootstrap"
import { UPDATE_ETP, UpdateEtpData, UpdateEtpVar } from '../../fetching/mutation/updateEtp'
import { useMutation, useQuery } from "@apollo/client";
import { GetAllEntrepriseResponse, GET_ALL_ENTREPRISE_QUERY, GetOneEtp } from '../../fetching/query/listeEtp'
import { regexNum } from '../../assets/regex/regex'

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
    showToast: boolean,
    onHide: any,
    onHideToast: any,
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
            return observableQuery.refetch();
        }
    }
    )
    const [validated, setValidated] = useState(false)
    const [showToast, setShowToast] = useState<boolean>(false)
    let form: any = ''
    const modifValide = async (event: any) => {
        await (form = event.currentTarget)
        if (form.checkValidity() === false) {
            console.log("test1");
            await event.preventDefault();
            await event.stopPropagation();
            setValidated(true)
            return
        }
        if (props.logo=='') {
            updateEtp({
                variables: { id: props.id, nom: props.nom, adr_fb:props.nom_fb, adresse: props.adresse, tel: props.numero_telephone, type_service: props.type_service, slogan: props.slogan, description: props.description, date_abonnement: new Date(), type_abonnement: props.type_abonnement, mode_payement: "test", date_payement: new Date() }
            })
        } 
        else{
            updateEtp({
                variables: { id: props.id, nom: props.nom, adr_fb:props.nom_fb, logo: props.image, adresse: props.adresse, tel: props.numero_telephone, type_service: props.type_service, slogan: props.slogan, description: props.description, date_abonnement: new Date(), type_abonnement: props.type_abonnement, mode_payement: "test", date_payement: new Date() }
            })
        }
        setShowToast(true);
    }
    if (loading) { return (<div style={{position:'absolute',top:'50%',left:'50%', color:'white'}}>
        <Spinner variant="light" animation="border" role="status" className='text-center'>
    <span className="visually-hidden">Loading...</span>
  </Spinner>
    </div>) }
    if (error) { return <p>{error.message}</p> }
    return (
        <div style={{ fontFamily: "roboto" }}>
            <Modal
                show={props.show}
                onHide={props.onHide}
                backdrop="static"
                keyboard={false}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" className="tx-primary">
                        Modification de "{props.nom}"
                    </Modal.Title>
                </Modal.Header>
                <Form noValidate validated={validated} onSubmit={modifValide}>
                    <Modal.Body>
                        <Form.Group className='mb-3'>
                            <Form.Label>
                                <b>
                                    Nom
                                </b>
                            </Form.Label>
                            <Form.Control required value={props.nom} type="text" placeholder="Entrer le nom de l‘entreprise" onChange={props.onChangeNom} />
                            <Form.Control.Feedback type="invalid">Nom entreprise obligatoire</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label><b>Logo</b></Form.Label>
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
                            <Form.Control required value={props.adresse} type="text" onChange={props.onChangeAdresse} placeholder="Entrer l‘adresse de l‘entreprise" />
                            <Form.Control.Feedback type="invalid">Adresse entreprise obligatoire</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                        <Form.Label htmlFor='numEtp'><b>Numéro téléphone</b></Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>+261</InputGroup.Text>
                            <Form.Control pattern="^[0-9]+$" id='numEtp' required type="text" aria-label="Num tel" placeholder='Numéro de téléphone' value={props.numero_telephone} onChange={props.onChangeNum} />
                        </InputGroup>
                        <Form.Control.Feedback type="invalid">Téléphone entreprise obligatoire</Form.Control.Feedback>
                    </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>
                                <b>Nom sur facebook</b>
                            </Form.Label>
                            <Form.Control required type="text" value={props.nom_fb} onChange={props.onChangeNomfb} placeholder="Entrer le nom sur facebook de l‘entreprise" />
                            <Form.Control.Feedback type="invalid">Nom facebook entreprise obligatoire</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                        <Form.Label htmlFor='serEtp'>
                            <b>Type de service</b>
                        </Form.Label>
                        <Form.Select id='serEtp' aria-label="Default select example" onChange={props.onChangeService} defaultValue={props.type_service}>
                            <option value="valeur 1">Valeur 1</option>
                            <option value="valeur 2">Valeur 2</option>
                            <option value="valeur 3">Valeur 3</option>
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
                            <Form.Select onChange={props.onChangeAbonnement} aria-label="Default select example" defaultValue={props.type_abonnement}>
                            <option value="valeur 1">Valeur 1</option>
                            <option value="valeur 2">Valeur 2</option>
                            <option value="valeur 3">Valeur 3</option>
                            </Form.Select>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={props.onHide}>Annuler</Button>
                        <Button variant="success" type="submit" onClick={props.onHide}>Valider</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <Modal
                show={showToast}
                onHide={()=>{setShowToast(false)}}
                size="sm"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Modification
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ fontSize: "medium" }}>
                    Modification réussie <i style={{ color: '#44751e' }} className="bi bi-check-lg"></i>
                </Modal.Body>
            </Modal>
        </div>
    )
}