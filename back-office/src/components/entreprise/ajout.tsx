import { Form, InputGroup, Button, Container, Nav } from 'react-bootstrap'
import React, { useState } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import { regexNum, regexMail } from '../../assets/regex/regex'
import { createEtpData, CREATE_ENTREPRISE, CreateEntrepriseVariables } from '../../fetching/mutation/AjoutEtp'
import { GetAllEntrepriseResponse, GET_ALL_ENTREPRISE_QUERY, GetOneEtp } from '../../fetching/query/listeEtp'

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
                // Define any custom logic for determining whether to refetch
                return observableQuery.refetch();
            }
        }
    )
    let form: any = ''
    const Ajout = async (event: any) => {
        console.log('ajout');
        await (form = event.currentTarget)
        if (form.checkValidity() === false) {
            console.log("test1");
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
    }

    const [voirMdp, setVoirMdp] = useState(false)
    const [voirConfMdp, setVoirConfMdp] = useState(false)
    const [validated, setValidated] = useState(true)
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
        if (regexNum.test(event.target.value)) {
            setNumAdmin(event.target.value);
        }
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
    if (loading) { return <p>Load...</p> }
    return (
        <div style={{ fontFamily: "Roboto", width: "80vh" }} >
            <Container fluid className="justify-content-center" style={{ width: "100%" }}>
                <Nav.Link href="/entreprise" style={{ width: "20px" }}>
                    <p className="fw-bolder tx-tertiary fs-3 fw-bold" >
                        <i className="bi bi-chevron-left"></i>
                    </p>
                </Nav.Link>
                <p>
                    <div style={{ fontSize: "27px", fontFamily: "Roboto", color: "#6b3b1e" }}><b>Ajout entreprise</b></div>
                </p>
                <Form noValidate validated={validated} onSubmit={Ajout}>
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor='nomEtp'>
                            <b>
                                Nom
                            </b>
                        </Form.Label>
                        <Form.Control required id="nomEtp" value={nom} type="text" placeholder="Entrer le nom de l‘entreprise" onChange={onChangeNom} />
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
                        <Form.Label htmlFor='adrEtp'>
                            <b>Adresse</b>
                        </Form.Label>
                        <Form.Control id="adrEtp" required value={adresse} type="text" onChange={onChangeAdresse} placeholder="Entrer l‘adresse de l‘entreprise" />
                        <Form.Control.Feedback type="invalid">Adresse entreprise obligatoire</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor='numEtp'><b>Numéro téléphone</b></Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>+261</InputGroup.Text>
                            <Form.Control id='numEtp' required type="text" aria-label="Num tel" placeholder='Numéro de téléphone' value={num} onChange={onChangeNum} />
                        </InputGroup>
                        <Form.Control.Feedback type="invalid">Téléphone entreprise obligatoire</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor='fbEtp'>
                            <b>Nom sur facebook</b>
                        </Form.Label>
                        <Form.Control id='fbEtp' required type="text" value={nom_fb} onChange={onChangeNomfb} placeholder="Entrer le nom sur facebook de l‘entreprise" />
                        <Form.Control.Feedback type="invalid">Nom facebook entreprise obligatoire</Form.Control.Feedback>
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
                        <Form.Control id='sloEtp' required type="text" placeholder="Slogan de l‘entreprise" value={slogan} onChange={onChangeSlogan} />
                        <Form.Control.Feedback type="invalid">Slogan entreprise obligatoire</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label htmlFor='descEtp'><b>Description</b></Form.Label>
                        <Form.Control id='descEtp' required as="textarea" rows={3} value={description} onChange={onChangeDescription} />
                        <Form.Control.Feedback type="invalid">Description entreprise obligatoire</Form.Control.Feedback>
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
                    <div style={{ fontSize: "20px", fontFamily: "Roboto", color: "#6b3b1e" }}><b>Admin de l‘entreprise</b></div>
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor='nomAdm'>
                            <b>Nom</b>
                        </Form.Label>
                        <Form.Control id='nomAdm' required type="text" placeholder="Nom de l‘admin" value={nomAdmin} onChange={onChangeNomAdmin} />
                        <Form.Control.Feedback type="invalid">Nom admin obligatoire</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor='prenomAdm'>
                            <b>Prénom</b>
                        </Form.Label>
                        <Form.Control id='prenomAdm' required type="text" placeholder="Prénom de l‘admin" value={prenomAdmin} onChange={onChangePrenomAdmin} />
                        <Form.Control.Feedback type="invalid">Prenom admin obligatoire</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor='numAdm'><b>Numéro téléphone</b></Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>+261</InputGroup.Text>
                            <Form.Control id="numAdm" required type="text" aria-label="Num tel" placeholder='Numéro téléphone' value={numAdmin} onChange={onChangeNumAdmin} />
                        </InputGroup>
                        <Form.Control.Feedback type="invalid">Téléphone admin obligatoire</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor='mailAdm'>
                            <b>Mail</b>
                        </Form.Label>
                        <Form.Control id='mailAdm' required type="mail" placeholder="mail@domaine.com" value={mailAdmin} onChange={onChangeMailAdmin} />
                        <Form.Control.Feedback type="invalid">Mail admin obligatoire</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor='adrAdm'>
                            <b>Adresse</b>
                        </Form.Label>
                        <Form.Control id='adrAdm' required type="mail" placeholder="Adresse de l‘admin" value={adresseAdmin} onChange={onChangeAdresseAdmin} />
                        <Form.Control.Feedback type="invalid">Adresse admin obligatoire</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Label htmlFor='mdpAdm'>
                        <b>Mot de passe</b>
                    </Form.Label>
                    <InputGroup className='mb-3'>
                        <Form.Control required id='mdpAdm' type={(voirMdp == false) ? "password" : 'text'} placeholder="Mot de passe de l‘admin" value={mdpAdmin} onChange={onChangeMdpAdmin} />
                        <Button variant="outline-success" id="button-addon2" onClick={(e: any) => { setVoirMdp(!voirMdp) }}>
                            <i className="bi bi-eye"></i>
                        </Button>
                        <Form.Control.Feedback type="invalid">Mot de passe admin obligatoire</Form.Control.Feedback>
                    </InputGroup>
                    <Form.Label htmlFor='confMdp'>
                        <b>Confirmation mot de passe</b>
                    </Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control
                            required
                            id='confMdp'
                            type={(voirConfMdp == false) ? "password" : 'text'}
                            placeholder="Recipient's username"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={confMdp}
                            onChange={onChangeConfMdpAdmin}
                        />
                        <Button variant="outline-success" id="button-addon2" onClick={(e: any) => { setVoirConfMdp(!voirConfMdp) }}>
                            <i className="bi bi-eye"></i>
                        </Button>
                    </InputGroup>
                    <div>
                        <Button variant="success" className='text-center' style={{ height: "40px", color: "#ffffff" }} type="submit">Ajouter</Button>{' '}
                        <Nav.Link href="/entreprise" style={{ display: "inline" }}>
                            <Button variant="success" style={{ height: "40px", color: "#ffffff" }}>Annuler</Button>
                        </Nav.Link>
                    </div>
                </Form>
            </Container>
        </div>
    )
}