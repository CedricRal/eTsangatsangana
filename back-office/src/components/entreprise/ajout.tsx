import { Form, InputGroup, Button, Container, Nav, Spinner, Modal } from 'react-bootstrap'
import React, { useState } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import { regexNum, regexMail } from '../../assets/regex/regex'
import { createEtpData, CREATE_ENTREPRISE, CreateEntrepriseVariables } from '../../fetching/mutation/AjoutEtp'
import { GetAllEntrepriseResponse, GET_ALL_ENTREPRISE_QUERY, GetOneEtp } from '../../fetching/query/listeEtp'
import { useNavigate } from 'react-router-dom'
import { PopUp } from './pop-up'

export const AjoutEtp = () => {
    const { refetch } = useQuery<GetAllEntrepriseResponse>(
        GET_ALL_ENTREPRISE_QUERY,
        {
            variables: { page: 0 },
            pollInterval: 200
        },
    );
    const [create_entreprise, { loading, error }] = useMutation<createEtpData, CreateEntrepriseVariables>(
        CREATE_ENTREPRISE,
        {
            refetchQueries: [{ query: GET_ALL_ENTREPRISE_QUERY, variables: { page: 0 } }],
            onQueryUpdated(observableQuery) {
                return observableQuery.refetch();
            }
        }
    )
    const navigate = useNavigate();
    let form: any = ''
    const Ajout = async (event: any) => {
        console.log('ajout');
        if (isValidNom || isValidNum || isValidLogo || isValidAdresse || isValidNom_fb || isValidService || isValidSlogan || isValidDescri || isValidAbonnement || isValidNomAdmin || isValidPrenomAdmin || isValidNumAdmin || isValidMdp || isValidMailAdmin || isValidAdresseAdmin || isValidConfMdp){
            await event.preventDefault();
            await event.stopPropagation();
            return
        }
        if (mdpAdmin != confMdp) {
            {
                {
                    console.log("test2");
                    await event.preventDefault();
                    await event.stopPropagation();
                    return
                }
            }
        }
        if (!(regexMail.test(mailAdmin))) {
            console.log("test3");
            await event.preventDefault();
            await event.stopPropagation();
            return
        }
        await create_entreprise({
            variables: { nom: nom, logo: image, adresse: adresse, tel: num, adr_fb: nom_fb, type_service: service, NIF_STAT: nif, slogan: slogan, description: description, date_abonnement: new Date(), type_abonnement: abonnement, mode_payement: "test", date_payement: new Date(), nomAdmin: nomAdmin, prenomAdmin: prenomAdmin, num_telAdmin: numAdmin, mailAdmin: mailAdmin, adresseAdmin: adresseAdmin, mdpAdmin: mdpAdmin }
        });
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
        navigate('/entreprise');
    }

    const [voirMdp, setVoirMdp] = useState(false)
    const [voirError, setVoirError] = useState(true)
    const [messageError, setMessageError] = useState('')
    const [voirConfMdp, setVoirConfMdp] = useState(false)
    const [isValidNom, setIsValidNom] = useState(false);
    const [isValidNum, setIsValidNum] = useState(false);
    const [isValidLogo, setIsValidLogo] = useState(false);
    const [isValidAdresse, setIsValidAdresse] = useState(false);
    const [isValidNom_fb, setIsValidNom_fb] = useState(false);
    const [isValidService, setIsValidService] = useState(false);
    const [isValidSlogan, setIsValidSlogan] = useState(false);
    const [isValidDescri, setIsValidDescri] = useState(false);
    const [isValidAbonnement, setIsValidAbonnement] = useState(false);
    const [isValidNomAdmin, setIsValidNomAdmin] = useState(false);
    const [isValidPrenomAdmin, setIsValidPrenomAdmin] = useState(false);
    const [isValidNumAdmin, setIsValidNumAdmin] = useState(false);
    const [isValidMdp, setIsValidMdp] = useState(false);
    const [isValidMailAdmin, setIsValidMailAdmin] = useState(false);
    const [isValidAdresseAdmin, setIsValidAdresseAdmin] = useState(false);
    const [isValidConfMdp, setIsValidConfMdp] = useState(false);
    const [validated, setValidated] = useState(false)
    const [image, setImage] = useState('')
    const [id, setId] = useState('')
    const [num, setNum] = useState('')
    const [nom, setNom] = useState('')
    const [logo, setLogo] = useState('')
    const [adresse, setAdresse] = useState('')
    const [nom_fb, setNom_fb] = useState('')
    const [service, setService] = useState('value 1')
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
        if (event.target.value == ""){
            setIsValidNom(true)
        }
        else{
            setIsValidNom(false)
        }
        setNom(event.target.value)
    }

    const onChangeNum = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (regexNum.test(event.target.value)) {
            setNum(event.target.value);
        }
        if (event.target.value == ""){
            setIsValidNum(true)
        }
        else{
            setIsValidNum(false)
        }
        
    }

    const onChangeLogo = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.value == ""){
            setIsValidLogo(true)
        }
        else{
            setIsValidLogo(false)
        }
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
        if(event.target.value == ""){
            setIsValidAdresse(true)
        }
        else{
            setIsValidAdresse(false)
        }
        setAdresse(event.target.value)
    }

    const onChangeNomfb = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.value == ""){
            setIsValidNom_fb(true)
        }
        else{
            setIsValidNom_fb(false)
        }
        setNom_fb(event.target.value)
    }

    const onChangeNif = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNif(event.target.value)
    }

    const onChangeSlogan = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.value==""){
            setIsValidSlogan(true)
        }
        else{
            setIsValidSlogan(false)
        }
        setSlogan(event.target.value)
    }

    const onChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.value == ""){
            setIsValidDescri(true)
        }
        else{
            setIsValidDescri(false)
        }
        setDescription(event.target.value)
    }

    const onChangeService = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setService(event.target.value)
    }

    const onChangeAbonnement = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if(event.target.value == ""){
            setIsValidAbonnement(true)
        }
        else{
            setIsValidAbonnement(false)
        }
        setAbonnement(event.target.value)
    }

    const onChangeNomAdmin = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.value == ""){
            setIsValidNomAdmin(true)
        }
        else{
            setIsValidNomAdmin(false)
        }
        setNomAdmin(event.target.value)
    }
    
    const onChangePrenomAdmin = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.value == ""){
            setIsValidPrenomAdmin(true)
        }
        else{
            setIsValidPrenomAdmin(false)
        }
        setPrenomAdmin(event.target.value)
    }

    const onChangeNumAdmin = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.value == ""){
            setIsValidNumAdmin(true)
        }
        else{
            setIsValidNumAdmin(false)
        }
        if (regexNum.test(event.target.value)) {
            setNumAdmin(event.target.value);
        }
    }

    function onChangeMailAdmin(event: React.ChangeEvent<HTMLInputElement>) {
        if(event.target.value == ""){
            setIsValidMailAdmin(true)
        }
        else{
            setIsValidMailAdmin(false)
        }
        const value = event.target.value;
        const isValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
        if(isValid==false){
            setIsValidMailAdmin(true)
        }
        else{
            setIsValidMailAdmin(false)
        }
        setMailAdmin(value);
    }

    const onChangeAdresseAdmin = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.value == ""){
            setIsValidAdresseAdmin(true)
        }
        else{
            setIsValidAdresseAdmin(false)
        }
        setAdresseAdmin(event.target.value)
    }

    const onChangeMdpAdmin = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.value == ""){
            setIsValidMdp(true)
        }
        else{
            setIsValidMdp(false)
        }
        if (event.target.value == confMdp) {
            setIsValidConfMdp(false)
        }
        else {
            setIsValidConfMdp(true)
        }
        setMdpAdmin(event.target.value)
    }

    const onChangeConfMdpAdmin = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.value == ""){
            setIsValidConfMdp(true)
        }
        else{
            setIsValidConfMdp(false)
        }
        if (event.target.value == mdpAdmin) {
            setIsValidConfMdp(false)
        }
        else {
            setIsValidConfMdp(true)
        }
        setConfMdp(event.target.value)
    }

    if (loading) {
        return (<>Loading...</>)
    }
    const onHideError = () => {
        setVoirError(false)
        navigate('/entreprise');
    }
    if (error) {
        return (
            <div style={{ fontFamily: "roboto" }}>
                <Modal
                    show={voirError}
                    onHide={onHideError}
                    size="sm"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Error
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ fontSize: "medium" }}>
                        {error.message} <i style={{ color: '#44751e' }} className="bi bi-check-lg"></i>
                    </Modal.Body>
                </Modal>
            </div>)
    }


    return (
        <div style={{ fontFamily: "Roboto", width: "80vh" }} >
            <Container fluid className="justify-content-center" style={{ width: "100%" }}>
                <Nav.Link href="/entreprise" style={{ width: "20px" }}>
                    <p className="fw-bolder tx-tertiary fs-3 fw-bold" >
                        <i className="bi bi-chevron-left"></i>
                    </p>
                </Nav.Link>
                <p>
                    <div className='text-center' style={{ fontSize: "27px", fontFamily: "Roboto", color: "#6b3b1e" }}><b>Ajout entreprise</b></div>
                </p>
                <Form onSubmit={Ajout}>
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor='nomEtp'>
                            <b>
                                Nom
                            </b>
                        </Form.Label>
                        <Form.Control isInvalid={isValidNom} required id="nomEtp" value={nom} type="text" placeholder="Entrer le nom de l‘entreprise" onChange={onChangeNom} />
                        <Form.Control.Feedback type="invalid">Nom de l'entreprise obligatoire</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label><b>Logo</b></Form.Label>
                        <Form.Control
                            isInvalid={isValidLogo}
                            required
                            type="file"
                            placeholder="Url du logo"
                            value={logo}
                            onChange={onChangeLogo}
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2" />
                        <Form.Control.Feedback type="invalid">Logo de l'entreprise obligatoire</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor='adrEtp'>
                            <b>Adresse</b>
                        </Form.Label>
                        <Form.Control isInvalid={isValidAdresse} id="adrEtp" required value={adresse} type="text" onChange={onChangeAdresse} placeholder="Entrer l‘adresse de l‘entreprise" />
                        <Form.Control.Feedback type="invalid">Adresse de l'entreprise obligatoire</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor='numEtp'><b>Numéro téléphone</b></Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>+261</InputGroup.Text>
                            <Form.Control isInvalid={isValidNum} id='numEtp' required type="text" aria-label="Num tel" placeholder='Numéro de téléphone' value={num} onChange={onChangeNum} />
                        </InputGroup>
                        <Form.Control.Feedback type="invalid">Numero téléphone de l'entreprise obligatoire</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor='fbEtp'>
                            <b>Nom sur facebook</b>
                        </Form.Label>
                        <Form.Control isInvalid={isValidNom_fb} id='fbEtp' required type="text" value={nom_fb} onChange={onChangeNomfb} placeholder="Entrer le nom sur facebook de l‘entreprise" />
                        <Form.Control.Feedback type="invalid">Nom facebook de l'entreprise obligatoire</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor='nifEtp'>
                            <b>NIF/STAT</b>
                        </Form.Label>
                        <Form.Control id='nifEtp' type="text" placeholder="NIF/STAT de l‘entreprise" value={nif} onChange={onChangeNif} />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor='serEtp'>
                            <b>Type de service</b>
                        </Form.Label>
                        <Form.Select id='serEtp' aria-label="Default select example" onChange={onChangeService}>
                            <option value="valeur 1">Valeur 1</option>
                            <option value="valeur 2">Valeur 2</option>
                            <option value="valeur 3">Valeur 3</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor='sloEtp'>
                            <b>Slogan</b>
                        </Form.Label>
                        <Form.Control isInvalid={isValidSlogan} id='sloEtp' required type="text" placeholder="Slogan de l‘entreprise" value={slogan} onChange={onChangeSlogan} />
                        <Form.Control.Feedback type="invalid">Slogan entreprise obligatoire</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label htmlFor='descEtp'><b>Description</b></Form.Label>
                        <Form.Control isInvalid={isValidDescri} id='descEtp' required as="textarea" rows={3} value={description} onChange={onChangeDescription} />
                        <Form.Control.Feedback type="invalid">Description de l'entreprise obligatoire</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor='aboEtp'>
                            <b>Type d’abonnement</b>
                        </Form.Label>
                        <Form.Select id='aboEtp' aria-label="Default select example" onChange={onChangeAbonnement}>
                            <option value="valeur 1">Valeur 1</option>
                            <option value="valeur 2">Valeur 2</option>
                            <option value="valeur 3">Valeur 3</option>
                        </Form.Select>
                    </Form.Group>
                    <div className='text-center' style={{ fontSize: "20px", fontFamily: "Roboto", color: "#6b3b1e" }}><b>Admin de l‘entreprise</b></div>
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor='nomAdm'>
                            <b>Nom</b>
                        </Form.Label>
                        <Form.Control isInvalid={isValidNomAdmin} id='nomAdm' required type="text" placeholder="Nom de l‘admin" value={nomAdmin} onChange={onChangeNomAdmin} />
                        <Form.Control.Feedback type="invalid">Nom admin obligatoire</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor='prenomAdm'>
                            <b>Prénom</b>
                        </Form.Label>
                        <Form.Control isInvalid={isValidPrenomAdmin} id='prenomAdm' required type="text" placeholder="Prénom de l‘admin" value={prenomAdmin} onChange={onChangePrenomAdmin} />
                        <Form.Control.Feedback type="invalid">Prénom admin obligatoire</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor='numAdm'><b>Numéro téléphone</b></Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>+261</InputGroup.Text>
                            <Form.Control isInvalid={isValidNumAdmin} id="numAdm" required type="text" aria-label="Num tel" placeholder='Numéro téléphone' value={numAdmin} onChange={onChangeNumAdmin} />
                        </InputGroup>
                        <Form.Control.Feedback type="invalid">Téléphone de l'admin obligatoire</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor='mailAdm'>
                            <b>E-mail</b>
                        </Form.Label>
                        <Form.Control
                            pattern='^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
                            id='mailAdm'
                            required
                            type="email"
                            placeholder="email@domaine.com"
                            value={mailAdmin}
                            onChange={onChangeMailAdmin}
                            isInvalid={isValidMailAdmin}
                        />
                        <Form.Control.Feedback type="invalid">
                            Veuillez saisir une adresse e-mail valide
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor='adrAdm'>
                            <b>Adresse</b>
                        </Form.Label>
                        <Form.Control isInvalid={isValidAdresseAdmin} id='adrAdm' required type="mail" placeholder="Adresse de l‘admin" value={adresseAdmin} onChange={onChangeAdresseAdmin} />
                        <Form.Control.Feedback type="invalid">Adresse de l'admin obligatoire</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Label htmlFor='mdpAdm'>
                        <b>Mot de passe</b>
                    </Form.Label>
                    <InputGroup className='mb-3'>
                        <Form.Control isInvalid={isValidMdp} required id='mdpAdm' type={(voirMdp == false) ? "password" : 'text'} placeholder="Mot de passe de l‘admin" value={mdpAdmin} onChange={onChangeMdpAdmin} />
                        <Button variant="outline-success" id="button-addon2" onClick={(e: any) => { setVoirMdp(!voirMdp) }}>
                            {(voirMdp == true) ? <i className="bi bi-eye"></i> : <i className="bi bi-eye-slash"></i>}
                        </Button>
                        <Form.Control.Feedback type="invalid">Mot de passe de l'admin obligatoire</Form.Control.Feedback>
                    </InputGroup>
                    <Form.Label htmlFor='confMdp'>
                        <b>Confirmation mot de passe</b>
                    </Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control
                            id='confMdp'
                            type={(voirConfMdp == false) ? "password" : 'text'}
                            placeholder="Confirmation de mot de passe"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={confMdp}
                            onChange={onChangeConfMdpAdmin}
                            isInvalid={isValidConfMdp}
                        />
                        <Button variant="outline-success" id="button-addon2" onClick={(e: any) => { setVoirConfMdp(!voirConfMdp) }}>
                            {(voirConfMdp == true) ? <i className="bi bi-eye"></i> : <i className="bi bi-eye-slash"></i>}
                        </Button>
                        <Form.Control.Feedback type="invalid">Confirmation mot de passe invalide</Form.Control.Feedback>
                    </InputGroup>
                    <div>
                        <Nav.Link href="/entreprise" style={{ display: "inline" }}>
                            <Button variant="success" style={{ height: "40px", color: "#ffffff" }} type='submit'>Ajouter</Button>{' '}
                        </Nav.Link>
                        <Nav.Link href="/entreprise" style={{ display: "inline" }}>
                            <Button variant="success" style={{ height: "40px", color: "#ffffff" }}>Annuler</Button>
                        </Nav.Link>
                    </div>
                </Form>
            </Container>
        </div>
    )
}