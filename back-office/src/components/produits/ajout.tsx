import { Form, InputGroup, Button, Container, Nav } from 'react-bootstrap'
import React, { useState } from 'react'
import {regexNum} from '../../assets/regex/regex'
import { gql, useMutation, useQuery } from '@apollo/client'
import {CREATE_PRODUIT, CreateProduitData, CreateProduitVars} from '../../fetching/mutation/AjoutProd'
import {GetAllProduitsResponse,LISTE_PROD, produits} from '../../fetching/query/listeProd'
import {useNavigate} from 'react-router-dom'

export const AjoutProd = () => {
    const id = localStorage.getItem("idEtp") || ''
    console.log(id)
    const {refetch} = useQuery<GetAllProduitsResponse>(
        LISTE_PROD,
        {
            variables:{
                page:0,
                id_etp:id
            }
        }
    )
    const [createProduit,{loading,error}] = useMutation<CreateProduitData, CreateProduitVars>(
        CREATE_PRODUIT,
        {
            refetchQueries: [{ query: LISTE_PROD, variables: { page: 0, id_etp:id } }],
            onQueryUpdated(observableQuery) {
                return observableQuery.refetch();
            }
        }
        )
    const navigate = useNavigate();
    let form: any = ''
    const Ajout = async (event: any) => {
        console.log('ajout');
        await (form = event.currentTarget)
        if (form.checkValidity() === false) {
            console.log("test1");
            await event.preventDefault();
            await event.stopPropagation();
            setValidated(true)
            return
        }
        await createProduit({
            variables:{image: images, titre:nom, resume:resume, description:description, qt:parseInt(quantite), prix:parseInt(prix), livraison:"test", place_dispo:5, id_etp:id, status:status }
        })
        setNom('')
        setImage('')
        setDescription('')
        setResume('')
        setPrix('')
        setQuantite('')
        setStatus(0)
        setImages('')
        navigate('/produits');
    }
    
    const [nom, setNom] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [resume, setResume] = useState('')
    const [prix, setPrix] = useState('')
    const [quantite, setQuantite] = useState('')
    const [status, setStatus] = useState(0)
    const [images,setImages] = useState('')
    const [validated, setValidated] = useState(false)

    const onChangeNom = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setNom(event.target.value)
    }
    const onChangeImage = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setImage(event.target.value)
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImages(reader.result as string);
                console.log(reader.result)
            };
        }
    }
    const onChangeDescription = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setDescription(event.target.value)
    }
    const onChangeResume = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setResume(event.target.value)
    }
    const onChangePrix = (event: React.ChangeEvent<HTMLInputElement>)=>{
        if (regexNum.test(event.target.value)){
            setPrix(event.target.value)
        }
    }
    const onChangeQuantite = (event: React.ChangeEvent<HTMLInputElement>)=>{
        if (regexNum.test(event.target.value)){
            setQuantite(event.target.value)
        }
    }
    const onChangeStatus = (event: React.ChangeEvent<HTMLInputElement>)=>{
        if (status == 0){
            setStatus(1)
        }
        else{
            setStatus(0)
        }
        console.log(status);
    }
    if (loading) {return (<>Loading...........</>)}
    if (error) {return (<>{error.message}</>)}
    console.log(error)
    return (
        <>
            <div style={{ fontFamily: "Roboto", width: "80vh" }} >
                <Container fluid className="justify-content-center" style={{ width: "100%" }}>
                    <Nav.Link href="/produits" style={{ width: "20px" }}>
                        <p className="fw-bolder tx-tertiary fs-3 fw-bold" >
                            <i className="bi bi-chevron-left"></i>
                        </p>
                    </Nav.Link>
                    <p>
                        <div className='text-center' style={{ fontSize: "27px", fontFamily: "Roboto", color: "#6b3b1e" }}><b>Ajout produit</b></div>
                    </p>
                    <Form noValidate validated={validated} onSubmit={Ajout}>
                        <Form.Group className='mb-3'>
                            <Form.Label htmlFor='nomEtp'>
                                <b>
                                    Nom
                                </b>
                            </Form.Label>
                            <Form.Control value={nom} onChange={onChangeNom} required id="nomEtp" type="text" placeholder="Entrer le nom du produit" />
                            <Form.Control.Feedback type="invalid">Nom du produit obligatoire</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label><b>Image</b></Form.Label>
                            <Form.Control
                                value={image}
                                onChange={onChangeImage}
                                required
                                type="file"
                                placeholder="Url du logo"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2" />
                            <Form.Control.Feedback type="invalid">Image du produit obligatoire</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label htmlFor='descEtp'><b>Description</b></Form.Label>
                            <Form.Control value={description} onChange={onChangeDescription} id='descEtp' required as="textarea" rows={3} />
                            <Form.Control.Feedback type="invalid">Description du produit obligatoire</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label htmlFor='descEtp'><b>Résumé</b></Form.Label>
                            <Form.Control value={resume} onChange={onChangeResume} id='descEtp' required as="textarea" rows={2} />
                            <Form.Control.Feedback type="invalid">Description du produit obligatoire</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label htmlFor='nomEtp'>
                                <b>
                                    Prix
                                </b>
                            </Form.Label>
                            <Form.Control value={prix} onChange={onChangePrix} required id="nomEtp" type="text" placeholder="Entrer le prix du produit" />
                            <Form.Control.Feedback type="invalid">Prix du produit obligatoire</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label htmlFor='nomEtp'>
                                <b>
                                    Quantité de produit disponible
                                </b>
                            </Form.Label>
                            <Form.Control value={quantite} onChange={onChangeQuantite} required id="nomEtp" type="text" placeholder="Entrer le prix du produit"/>
                            <Form.Control.Feedback type="invalid">Quantité du produit obligatoire</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Check
                                label={<b>Publier en tant que publicité</b>}
                                name="group1"
                                type='checkbox'
                                value={status}
                                onChange={onChangeStatus}
                            />
                        </Form.Group>
                        <div>
                            <Nav.Link href="/entreprise" style={{ display: "inline" }}>
                                <Button variant="success" style={{ height: "40px", color: "#ffffff" }} type='submit'>Ajouter</Button>{' '}
                            </Nav.Link>
                            <Nav.Link href="/produits" style={{ display: "inline" }}>
                                <Button variant="success" style={{ height: "40px", color: "#ffffff" }}>Annuler</Button>
                            </Nav.Link>
                        </div>
                    </Form>
                </Container>
            </div>
        </>
    )
}