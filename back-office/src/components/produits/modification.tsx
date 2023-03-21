import React, { useState } from "react"
import { Modal, Button, Form, InputGroup, Spinner } from "react-bootstrap"
import { UPDATE_ETP, UpdateEtpData, UpdateEtpVar } from '../../fetching/mutation/updateEtp'
import {UPDATE_PROD, UpdateProduitData, UpdateProduitVar} from '../../fetching/mutation/updateProd'
import { useMutation, useQuery } from "@apollo/client";
import {GetAllProduitsResponse, LISTE_PROD, produits} from '../../fetching/query/listeProd'
import { LISTE_PUB, ListePubResponse } from '../../fetching/query/listePub'
import { regexNum } from '../../assets/regex/regex'

type propsEtp = {
    id: string
    images: string
    nom: string
    image: string
    description: string
    resume: string
    prix: string
    quantite: string
    status: number
    show: boolean
    onHide: any
    onChangeResume: any
    onChangeNom: any
    onChangeImage: any
    onChangeDescription: any
    onChangePrix: any
    onChangeQuantite: any
    onChangeStatus: any
}

export const Modif = (props: propsEtp) => {
    const id = localStorage.getItem("idEtp") || ''
    const {refetch} = useQuery<GetAllProduitsResponse>(
        LISTE_PROD,
        {
            variables:{
                page:0,
                id_etp:id
            }
        }
    )
    const {} = useQuery<ListePubResponse>(
        LISTE_PUB,
        {
            variables:{
                page:0,
            }
        }
    )
    const [updateProduit, { data, loading, error }] = useMutation<UpdateProduitData, UpdateProduitVar>(
        UPDATE_PROD, 
        {
            refetchQueries: [{ query: LISTE_PROD, variables: { page: 0, id_etp:id } },{ query: LISTE_PUB, variables: { page: 0} }],
            onQueryUpdated(observableQuery) {
                return observableQuery.refetch();
            }
        }
    )
    const [validated, setValidated] = useState(false)
    const [showToast, setShowToast] = useState<boolean>(false)
    let form: any = ''
    const modifValide = async (event: any) => {
        console.log(props.description)
        console.log(id)
        await (form = event.currentTarget)
        if (form.checkValidity() === false) {
            console.log("test1");
            await event.preventDefault();
            await event.stopPropagation();
            setValidated(true)
            return
        }
        if (props.image=='') {
            updateProduit({
                variables:{id:props.id, titre: props.nom, resume: props.resume, description:props.description , qt: parseInt(props.quantite), prix: parseInt(props.prix), status: props.status, id_etp: id}
            })
        } 
        else{
            updateProduit({
                variables:{id:props.id, image: props.images, titre: props.nom, resume: props.resume, description:props.description, qt: parseInt(props.quantite), prix: parseInt(props.prix), status: props.status, id_etp: id}
            })
        }
        setShowToast(true);
    }
    if (loading) { return (<div style={{position:'absolute',top:'50%',left:'50%', color:'white'}}>
        <Spinner variant="dark" animation="border" role="status" className='text-center'>
    <span className="visually-hidden">Loading...</span>
  </Spinner>
    </div>) }
    if (error) { return <p>{error.message}</p> }
    return (
        <div style={{ fontFamily: "roboto"}}>
            <Modal
            style={{justifyContent:"center"}}
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
                        Modification
                    </Modal.Title>
                </Modal.Header>
                <Form noValidate validated={validated} onSubmit={modifValide} style={{width:"97%",marginLeft:'0.75%'}}>
                <Form.Group className='mb-3'>
                            <Form.Label htmlFor='nomEtp'>
                                <b>
                                    Nom
                                </b>
                            </Form.Label>
                            <Form.Control value={props.nom} onChange={props.onChangeNom} required id="nomEtp" type="text" placeholder="Entrer le nom du produit" />
                            <Form.Control.Feedback type="invalid">Nom du produit obligatoire</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label><b>Image</b></Form.Label>
                            <Form.Control
                                value={props.image}
                                onChange={props.onChangeImage}
                                type="file"
                                placeholder="Url du logo"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label htmlFor='descEtp'><b>Description</b></Form.Label>
                            <Form.Control value={props.description} onChange={props.onChangeDescription} id='descEtp' required as="textarea" rows={3} />
                            <Form.Control.Feedback type="invalid">Description du produit obligatoire</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label htmlFor='descEtp'><b>Résumé</b></Form.Label>
                            <Form.Control value={props.resume} onChange={props.onChangeResume} id='descEtp' required as="textarea" rows={2} />
                            <Form.Control.Feedback type="invalid">Description du produit obligatoire</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label htmlFor='nomEtp'>
                                <b>
                                    Prix
                                </b>
                            </Form.Label>
                            <Form.Control value={props.prix} onChange={props.onChangePrix} required id="nomEtp" type="text" placeholder="Entrer le prix du produit" />
                            <Form.Control.Feedback type="invalid">Prix du produit obligatoire</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label htmlFor='nomEtp'>
                                <b>
                                    Quantité de produit disponible
                                </b>
                            </Form.Label>
                            <Form.Control value={props.quantite} onChange={props.onChangeQuantite} required id="nomEtp" type="text" placeholder="Entrer le prix du produit"/>
                            <Form.Control.Feedback type="invalid">Quantité du produit obligatoire</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Check
                                checked = {(props.status == 1) ? true : false}
                                label={<b>Publier en tant que publicité</b>}
                                name="group1"
                                type='checkbox'
                                value={props.status}
                                onChange={props.onChangeStatus}
                            />
                        </Form.Group>
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