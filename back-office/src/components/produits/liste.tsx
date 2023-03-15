import {Container} from 'react-bootstrap'
import {useQuery} from '@apollo/client'
import { Card, Row, Col, Button, Spinner, Nav } from "react-bootstrap"
import {GetAllProduitsResponse,LISTE_PROD, produits} from '../../fetching/query/listeProd'
import { NavLink, Route, Routes } from 'react-router-dom'

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
    const produits = data?.getAllProduit.produits
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
                <Card border="success" style={{ width: '100%', height: '99%' }}>
                  <Nav>
                    <Nav.Link to='/entreprise/détails' as={NavLink} style={{ width: "100%" }} eventKey={produit.id}>
                      <Card.Img variant="top" src={produit.image} width={250} height={220} />
                    </Nav.Link>
                  </Nav>
                  <Card.Body>
                    <Card.Title>{produit.titre}</Card.Title>
                    <Card.Text style={{ width: '100%', height: '15%', overflow: 'auto' }}>
                      {produit.resume}
                    </Card.Text>
                    <Card.Text style={{ width: '100%', height: '15%', overflow: 'auto' }}>
                      {produit.prix} MGA
                    </Card.Text>
                    <span> <Button id={produit.id} variant="success" >Modifier</Button> </span>
                    <span> <Button id={produit.id} variant="success" className='button' style={{ transition:"all 0.3s ease-out"}}><i style={{display:"inline-block"}} className="bi bi-trash"></i><span style={{display:"inline-block"}}>Supprimer</span></Button> </span>
                    <span> <Button id={produit.id} variant={(produit.status == 0) ? "light" : "warning"} className='button' style={{ transition:"all 0.3s ease-out"}}><i style={{display:"inline-block"}} className="bi bi-bag-check"></i><span style={{display:"inline-block"}}>Publicité</span></Button> </span>
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