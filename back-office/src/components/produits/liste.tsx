import {Container} from 'react-bootstrap'
import {useQuery} from '@apollo/client'
import { Card, Row, Col, Button, Spinner, Nav } from "react-bootstrap"
import {GetAllProduitsResponse,LISTE_PROD, produits} from '../../fetching/query/listeProd'

export const ListeProduit = ()=>{
    const id = localStorage.getItem("idEtp")
    console.log(id)
    const {data,error,loading} = useQuery<GetAllProduitsResponse>(
        LISTE_PROD,
        {
            variables:{
                page:0,
                id_etp:id
            }
        }
    )
    const produits = data?.produits
    console.log(produits);
    if (loading) return (<p>Loading...</p>)
    if (error) return (<p>{error.message}</p>)
    return(
        <>
        <div style={{ fontFamily: "roboto" }}>
      <Row xs={1} mg={2} lg={3} className='g-4'>
        {produits &&(
            produits.map((produit)=>{
            return(
              <Col key={produit.id}>
                <Card border="success" style={{ width: '22rem'}}>
                  <Nav>
                    <Nav.Link style={{width:"100%"}} eventKey={produit.id}>
                      <Card.Img variant="top" src={produit.image} width={250} height={250}/>
                    </Nav.Link>
                  </Nav>
                    <Card.Body>
                        <Card.Title>{produit.titre}</Card.Title>
                        <Card.Text>{produit.resume}</Card.Text>
                        <Card.Text>{produit.prix} MGA</Card.Text>
                            <span> <Button id={produit.id} variant="success" >Modifier</Button> </span>
                            <span> <Button id={produit.id} variant="success" >Supprimer</Button> </span>
                            <span> <Button id={produit.id} variant="success" >Publicité</Button> </span>
                    </Card.Body>
                </Card>
              </Col>
            )
        })
        )
      } 
      </Row>
  {/* <Suppr show={} onHide={} Nom={''} id={''}/>
  <Modif show={''} onHide={} image={image} logoTmp={photoTmp} nom={nom} id={id} logo={logo} adresse={adresse} numero_telephone={num} nom_fb={nom_fb} type_service={service} slogan={slogan} description={descriprion} type_abonnement={abonnement} onChangeNum={onChangeNum} onChangeNom={onChangeNom} onChangeLogo={onChangeLogo} onChangeAdresse={onChangeAdresse} onChangeNomfb={onChangeNomfb} onChangeService={onChangeService} onChangeNif={onChangeNif} onChangeSlogan={onChangeSlogan} onChangeDescription={onChangeDescription} onChangeAbonnement={onChangeAbonnement}/> */}

    </div>
    </>
    )
    
}