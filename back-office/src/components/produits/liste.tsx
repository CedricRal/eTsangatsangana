import {Container} from 'react-bootstrap'
import {useQuery} from '@apollo/client'
import { Card, Row, Col, Button, Spinner, Nav } from "react-bootstrap"
import {GetAllProduitsResponse,LISTE_PROD, produits} from '../../fetching/query/listeProd'
import { NavLink, Route, Routes } from 'react-router-dom'
import {Suppr} from "./suppression"
import { useState } from 'react'
import { Modif } from './modification'
import { regexNum } from '../../assets/regex/regex'

export const ListeProduit = ()=>{
    const id = localStorage.getItem("idEtp")
    const {data,error,loading} = useQuery<GetAllProduitsResponse>(
        LISTE_PROD,
        {
            variables:{
                page:0,
                id_etp:id
            }
        }
    )
    const produits: Array<produits> = data?.getAllProduit.produits || []
    const [showmodal,setShowModal] = useState(false)
    const [showToast,setShowToast] = useState(false)
    const [id_,setId_] = useState('')
    const [images,setImages] = useState('')
    const [nom,setNom] = useState('')
    const [image,setImage] = useState('')
    const [description,setDescription] = useState('')
    const [resume,setResume] = useState('')
    const [prix,setPrix] = useState('')
    const [quantite,setQuantite] = useState('')
    const [status,setStatus] = useState(0)
    
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
    const suppr = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setShowModal(true)
      setId_(event.currentTarget.id)
      console.log(event.currentTarget.id)
      console.log(id_);
    }
    const modif = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setShowToast(true)
      if (produits){
        produits.map((produit)=>{
          if(produit.id == event.currentTarget.id){
            setImage('')
            setNom(produit.titre)
            setDescription(produit.description)
            setResume(produit.resume)
            setPrix((produit.prix).toString())
            setQuantite((produit.qt).toString())
            setStatus(produit.status)
          }
        })
      }
      setId_(event.currentTarget.id)
      console.log(event.currentTarget.id)
      console.log(id_);
    }
    
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
                    <span> <Button id={produit.id} variant="success" onClick={modif}>Modifier</Button> </span>
                    <span> <Button id={produit.id} variant="success" className='button' style={{ transition:"all 0.3s ease-out"}} onClick={suppr}><i style={{display:"inline-block"}} className="bi bi-trash"></i><span style={{display:"inline-block"}}>Supprimer</span></Button> </span>
                    <span> <Button id={produit.id} variant={(produit.status == 0) ? "light" : "warning"} className='button' style={{ transition:"all 0.3s ease-out"}}><i style={{display:"inline-block"}} className="bi bi-bag-check"></i><span style={{display:"inline-block"}}>Publicité</span></Button> </span>
                  </Card.Body>
                </Card>
              </Col>
            )
        })
        )
      } 
      </Row>
  <Suppr show={showmodal} onHide={()=>{setShowModal(false)}} id={id_}/>
  <Modif show={showToast} onHide={() => { setShowToast(false) } } id={id_} images={images} nom={nom} image={image} description={description} resume={resume} prix={prix} quantite={quantite} status={status} onChangeResume={onChangeResume} onChangeNom={onChangeNom} onChangeImage={onChangeImage} onChangeDescription={onChangeDescription} onChangePrix={onChangePrix} onChangeQuantite={onChangeQuantite} onChangeStatus={onChangeStatus}/>
    </div>
    </>
    )
    
}