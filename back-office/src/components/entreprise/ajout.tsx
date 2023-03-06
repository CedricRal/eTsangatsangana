import { Form, InputGroup, Button, Container } from 'react-bootstrap'
import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { regexNum } from '../../assets/regex/regex'
import {INSCRI_USER, InscriUsersData, InscriUsersVar} from '../../fetching/mutation/inscriUser'
import {createEtpData,CREATE_ENTREPRISE,CreateEntrepriseVariables} from '../../fetching/mutation/AjoutEtp'

export const AjoutEtp = () => {
    const [create_entreprise, { data, loading, error }] = useMutation<createEtpData, CreateEntrepriseVariables>(CREATE_ENTREPRISE)
    const [inscri_user] = useMutation<InscriUsersData, InscriUsersVar>(INSCRI_USER)
    const entreprise = data?.create_entreprise

    const Ajout = (event: any) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true)
        create_entreprise({
            variables: { nom: nom, logo: image, adresse: adresse, tel: num, adr_fb: nom_fb, type_service: "test", NIF_STAT: nif, slogan: slogan, description: description, date_abonnement: new Date(), type_abonnement: "test", mode_payement: "test", date_payement: new Date() }
        })
        inscri_user({
            variables: { nom: nomAdmin, prenom: prenomAdmin, num_tel: numAdmin, mail: mailAdmin, adresse: adresseAdmin, mdp: mdpAdmin, id_etp: entreprise?.id }
        })
        setNom("")
        setNum("")
        setLogo("")
        setAdresse("")
        setNom_fb("")
        setNif("")
        setSlogan("")
        setDescription("")
        setNomAdmin('')
        setPrenomAdmin('')
        setNumAdmin('')
        setMailAdmin('')
        setAdresseAdmin('')
        setMdpAdmin('')
        setConfMdp('')  
    }

    const [validated,setValidated] = useState(false)
    const [image, setImage] = useState('')
    const [id, setId] = useState('')
    const [num, setNum] = useState('')
    const [nom, setNom] = useState('')
    const [logo, setLogo] = useState('')
    const [adresse, setAdresse] = useState('')
    const [nom_fb, setNom_fb] = useState('')
    const [service, setService] = useState('')
    const [nif, setNif] = useState('')
    const [slogan, setSlogan] = useState('')
    const [description, setDescription] = useState('')
    const [abonnement, setAbonnement] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [showToast, setShowToast] = useState(false)
    const [showModif, setShowModif] = useState(false)

    const [nomAdmin, setNomAdmin] = useState('')
    const [prenomAdmin, setPrenomAdmin] = useState('')
    const [numAdmin, setNumAdmin] = useState('')
    const [mailAdmin, setMailAdmin] = useState('')
    const [adresseAdmin, setAdresseAdmin] = useState('')
    const [mdpAdmin, setMdpAdmin] = useState('')
    const [idEtp, setIdEtp] = useState('')
    const [confMdp, setConfMdp] = useState('')

    const onChangeNom = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNom(event.target.value)
    }

    const onChangeNum = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (regexNum.test(event.target.value)) {
            setNum(event.target.value);
        }
    }

    const onChangeLogo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLogo(event.target.value)
        console.log(logo)
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImage(reader.result as string);
                console.log(reader.result)
            };
        }
    };

    const onChangeAdresse = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAdresse(event.target.value)
    }

    const onChangeNomfb = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNom_fb(event.target.value)
    }

    const onChangeNif = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNif(event.target.value)
    }

    const onChangeSlogan = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSlogan(event.target.value)
    }

    const onChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value)
    }

    const onChangeService = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setService(event.target.value)
    }

    const onChangeAbonnement = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setAbonnement(event.target.value)
    }
    const onChangeNomAdmin = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNomAdmin(event.target.value)
    }
    const onChangePrenomAdmin = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrenomAdmin(event.target.value)
    }
    const onChangeNumAdmin = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNumAdmin(event.target.value)
    }
    const onChangeMailAdmin = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMailAdmin(event.target.value)
    }
    const onChangeAdresseAdmin = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAdresseAdmin(event.target.value)
    }
    const onChangeMdpAdmin = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMdpAdmin(event.target.value)
    }
    const onChangeConfMdpAdmin = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfMdp(event.target.value)
    }
    if (error) { return <p>{error.message}</p> }
    if (loading) { return <p>Load</p> }
    return (
        <div style={{ fontFamily: "Roboto", width: "80vh" }} >
            <Container fluid className="justify-content-center" style={{ width: "100%" }}>
                <p>
                    <div style={{ fontSize: "27px", fontFamily: "Roboto", color: "#6b3b1e" }}><b>Ajout entreprise</b></div>
                </p>
                <Form noValidate validated={validated} onSubmit={Ajout}>
                    <Form.Group className='mb-3'>
                        <Form.Label>
                            <b>
                                Nom
                            </b>
                        </Form.Label>
                        <Form.Control value={nom} type="text" placeholder="Entrer le nom de l‘entreprise" onChange={onChangeNom} />
                        <Form.Control.Feedback type="invalid">Nom entreprise obligatoire</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Logo</Form.Label>
                        <Form.Control
                            required
                            type="file"
                            placeholder="Url du logo"
                            value={logo}
                            onChange={onChangeLogo}
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2" />
                        <Form.Control.Feedback type="invalid">Logo entreprise obligatoire</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>
                            <b>Adresse</b>
                        </Form.Label>
                        <Form.Control required value={adresse} type="text" onChange={onChangeAdresse} placeholder="Entrer l‘adresse de l‘entreprise" />
                        <Form.Control.Feedback type="invalid">Adresse entreprise obligatoire</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                    <Form.Label><b>Numéro téléphone</b></Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>+261</InputGroup.Text>
                            <Form.Control required type="text" aria-label="Num tel" placeholder='Numéro de téléphone' value={num} onChange={onChangeNum} />
                        </InputGroup>
                        <Form.Control.Feedback type="invalid">Téléphone entreprise obligatoire</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>
                            <b>Nom sur facebook</b>
                        </Form.Label>
                        <Form.Control required type="text" value={nom_fb} onChange={onChangeNomfb} placeholder="Entrer le nom sur facebook de l‘entreprise" />
                        <Form.Control.Feedback type="invalid">Nom facebook entreprise obligatoire</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>
                            <b>Type de service</b>
                        </Form.Label>
                        <Form.Select aria-label="Default select example" onChange={onChangeService}>
                            <option>Choisissez...</option>
                            <option value="valeur 1">Valeur 1</option>
                            <option value="valeur 2">Valeur 2</option>
                            <option value="valeur 3">Valeur 3</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>
                            <b>Slogan</b>
                        </Form.Label>
                        <Form.Control required type="text" placeholder="Slogan de l‘entreprise" value={slogan} onChange={onChangeSlogan} />
                        <Form.Control.Feedback type="invalid">Slogan entreprise obligatoire</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label><b>Description</b></Form.Label>
                        <Form.Control required as="textarea" rows={3} value={description} onChange={onChangeDescription} />
                        <Form.Control.Feedback type="invalid">Description entreprise obligatoire</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>
                            <b>Type d’abonnement</b>
                        </Form.Label>
                        <Form.Select aria-label="Default select example" onChange={onChangeAbonnement}>
                            <option>Choisissez...</option>
                            <option value="valeur 1">Valeur 1</option>
                            <option value="valeur 2">Valeur 2</option>
                            <option value="valeur 3">Valeur 3</option>
                        </Form.Select>
                    </Form.Group>
                    <div style={{ fontSize: "20px", fontFamily: "Roboto", color: "#6b3b1e" }}><b>Admin de l‘entreprise</b></div>
                    <Form.Group className='mb-3'>
                        <Form.Label>
                            <b>Nom</b>
                        </Form.Label>
                        <Form.Control required type="text" placeholder="Nom de l‘admin" value={nomAdmin} onChange={onChangeNomAdmin} />
                        <Form.Control.Feedback type="invalid">Nom admin obligatoire</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>
                            <b>Prénom</b>
                        </Form.Label>
                        <Form.Control required type="text" placeholder="Prénom de l‘admin" value={prenomAdmin} onChange={onChangePrenomAdmin} />
                        <Form.Control.Feedback type="invalid">Prenom admin obligatoire</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>
                            <b>Numéro téléphone</b>
                        </Form.Label>
                        <Form.Control required type="text" placeholder="Numéro téléphone de l‘admin" value={numAdmin} onChange={onChangeNumAdmin} />
                        <Form.Control.Feedback type="invalid">Prenom admin obligatoire</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>
                            <b>Mail</b>
                        </Form.Label>
                        <Form.Control required type="mail" placeholder="Mail de l‘admin" value={mailAdmin} onChange={onChangeMailAdmin} />
                        <Form.Control.Feedback type="invalid">Mail admin obligatoire</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>
                            <b>Adresse</b>
                        </Form.Label>
                        <Form.Control required type="mail" placeholder="Adresse de l‘admin" value={adresseAdmin} onChange={onChangeAdresseAdmin} />
                        <Form.Control.Feedback type="invalid">Adresse admin obligatoire</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>
                            <b>Mot de passe</b>
                        </Form.Label>
                        <Form.Control type="password" placeholder="Mot de passe de l‘admin" value={mdpAdmin} onChange={onChangeMdpAdmin} />
                        <Form.Control.Feedback type="invalid">Mot de passe admin obligatoire</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>
                            <b>Confirmation mot de passe</b>
                        </Form.Label>
                        <Form.Control type="password" placeholder="Mot de passe de l‘admin" value={confMdp} onChange={onChangeConfMdpAdmin} />
                    </Form.Group>
                    <div>
                        <Button variant="success" className='text-center' style={{ height: "40px", color: "#ffffff" }} type="submit">Ajouter</Button>{' '}
                        <Button variant="success" style={{ height: "40px", color: "#ffffff" }}>Annuler</Button>
                    </div>
                </Form>
            </Container>
        </div>
    )
}