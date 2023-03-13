import {gql,useQuery} from '@apollo/client'
import {Nav,Form,Button} from 'react-bootstrap'
import {GetOneEntrepriseResponse, GET_ONE_ENTREPRISE} from '../../fetching/query/detailEtp'

export const Détails = ()=>{
    const id = localStorage.getItem("idEtp")
    console.log(id);
    
    const {data,error,loading} = useQuery<GetOneEntrepriseResponse>(
        GET_ONE_ENTREPRISE,
        {
            variables:{id:id}
        }
    )
    const entreprises = data?.getOneEntreprise
    if (loading) return (<div>Loading....</div>)
    if (error) return (<p>{error.message}</p>)
    return (
        <div style={{ fontFamily: "Roboto", width: "80vh" }} >
            <Nav.Link href="/entreprise" style={{ width: "20px" }}>
                <p className="fw-bolder tx-tertiary fs-3 fw-bold" >
                    <i className="bi bi-chevron-left"></i>
                </p>
            </Nav.Link>
            <Form.Group className="mb-3">
                <Form.Label>Nom :</Form.Label>
                <Form.Control value={(entreprises && (entreprises.nom))} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Adresse :</Form.Label>
                <Form.Control value={(entreprises && (entreprises.adresse))} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Téléphone :</Form.Label>
                <Form.Control value={(entreprises && (entreprises.tel))} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Facebook :</Form.Label>
                <Form.Control value={(entreprises && (entreprises.adr_fb))} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Type service :</Form.Label>
                <Form.Control value={(entreprises && (entreprises.type_service))} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>NIF/STAT :</Form.Label>
                <Form.Control value={(entreprises && (entreprises.NIF_STAT))} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Slogan :</Form.Label>
                <Form.Control value={(entreprises && (entreprises.slogan))} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Description :</Form.Label>
                <Form.Control as="textarea" value={(entreprises && (entreprises.description))} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Type abonnement :</Form.Label>
                <Form.Control value={(entreprises && (entreprises.type_abonnement))} />
            </Form.Group>
            <div>
                <Nav.Link href="/produits" style={{ display: "inline" }}>
                    <Button variant="light" style={{ backgroundColor: "#6b3b1e", color: "white" , height:'md'}}>Liste produits</Button>
                </Nav.Link>
            </div>
        </div>
    )
}