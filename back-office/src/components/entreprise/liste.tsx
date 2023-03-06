import { useState,useEffect } from "react" 
import {Card, Row, Col, Button, Spinner} from "react-bootstrap"
import {Suppr} from './suppression'
import {Valide} from './pop-up'
import {Modif} from './modification'
import { gql, useQuery } from '@apollo/client'


type GetOneEtp = {
  id: string;
  nom: string;
  logo: string;
  adresse: string;
  tel: string;
  adr_fb: string;
  type_service: string;
  NIF_STAT: string;
  slogan: string;
  description: string;
  date_abonnement: Date;
  type_abonnement: string;
  mode_payement: string;
  date_payement: Date;
};

type GetAllEtp = {
  nbr_page: number;
  items: GetOneEtp[];
};

type GetAllEntrepriseResponse = {
  getAllEntreprise: GetAllEtp;
};


const GET_ALL_ENTREPRISE_QUERY = gql`
  query GetAllEntreprise($page: Int!) {
    getAllEntreprise(page: $page) {
      nbr_page
      items {
        id
        nom
        logo
        adresse
        tel
        adr_fb
        type_service
        NIF_STAT
        slogan
        description
        date_abonnement
        type_abonnement
        mode_payement
        date_payement
      }
    }
  }
`;

export const Liste = ()=>{
  const { loading, error, data } = useQuery<GetAllEntrepriseResponse>(
    GET_ALL_ENTREPRISE_QUERY,
    {
      variables: { page: 0 },
    }
  );

  const entreprises = data?.getAllEntreprise.items;
  const [photoTmp,setPhotoTmp] = useState('')
  const [id,setId] = useState('')
  const [num,setNum] = useState('')
  const [nom,setNom] = useState('')
  const [logo,setLogo] = useState('')
  const [adresse,setAdresse] = useState('')
  const [nom_fb,setNom_fb] = useState('')
  const [service,setService] = useState('')
  const [nif,setNif] = useState('')
  const [slogan,setSlogan] = useState('')
  const [descriprion,setDescription] = useState('')
  const [abonnement,setAbonnement] = useState('')
  const [showModal,setShowModal] = useState(false)
  const [showToast,setShowToast] = useState(false)
  const [showModif,setShowModif] = useState(false)
  const [image,setImage] = useState('')
  const onChangeNom = (event:React.ChangeEvent<HTMLInputElement>)=>{
    setNom(event.target.value)
  }

  const onChangeNum = (event:React.ChangeEvent<HTMLInputElement>)=>{
    const regex = /^[0-9\b]+$/;
    if (regex.test(event.target.value)) {
      setNum(event.target.value);
    }
  }

  const onChangeLogo = (event:React.ChangeEvent<HTMLInputElement>)=>{
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

  const onChangeAdresse = (event:React.ChangeEvent<HTMLInputElement>)=>{
    setAdresse(event.target.value)
  }

  const onChangeNomfb = (event:React.ChangeEvent<HTMLInputElement>)=>{
    setNom_fb(event.target.value)
  }

  const onChangeNif = (event:React.ChangeEvent<HTMLInputElement>)=>{
    setNif(event.target.value)
  }

  const onChangeSlogan = (event:React.ChangeEvent<HTMLInputElement>)=>{
    setSlogan(event.target.value)
  }

  const onChangeDescription = (event:React.ChangeEvent<HTMLInputElement>)=>{
    setDescription(event.target.value)
  }

  const onChangeService = (event:React.ChangeEvent<HTMLInputElement>)=>{
    setService(event.target.value)
  }

  const onChangeAbonnement = (event:React.ChangeEvent<HTMLInputElement>)=>{
    setAbonnement(event.target.value)
  }
  
  const modif =(event:any)=>{
    event.preventDefault();
    setShowModif(true)
    setNom(event.target.id)
    if (entreprises){
      entreprises.map((entreprise) => {
        if (entreprise.id == event.target.id){
          setPhotoTmp(entreprise.logo)
          setId(entreprise.id)
          setNum(entreprise.tel)
          setAdresse(entreprise.adresse)
          setNom_fb(entreprise.adr_fb)
          setService(entreprise.type_service)
          setNif(entreprise.NIF_STAT)
          setSlogan(entreprise.slogan)
          setDescription(entreprise.description)
          setAbonnement(entreprise.type_abonnement)
          setNom(entreprise.nom)
        }
      })
    }
  }
  const suppr =(event:any)=>{
    event.preventDefault();
    setShowModal(true)
    setId(event.target.id)
  }

  if (error) return <p>Error: {error.message}</p>;
  return(
  <div style={{fontFamily:"roboto"}}>
      <Row xs={1} mg={2} lg={3} className='g-4'>
        {loading ? (
          <div className="text-center" style={{fontSize:"200px"}}><Spinner animation="grow" variant="success"/></div>
        
      ) : (
        entreprises &&(
            entreprises.map((entreprise)=>{
            return(
              <Col key={entreprise.id}>
                <Card border="success" style={{ width: '22rem'}}>
                    <Card.Img variant="top" src={entreprise.logo} width={250} height={250}/>
                    <Card.Body>
                        <Card.Title>{entreprise.nom}</Card.Title>
                        <Card.Text>{entreprise.description}</Card.Text>
                            <span> <Button id={entreprise.id} variant="success" onClick={modif}>Modifier</Button> </span>
                            <span> <Button id={entreprise.id} variant="success" onClick={suppr}>Supprimer</Button> </span>
                    </Card.Body>
                </Card>
              </Col>
            )
        })
        )
      )} 
      </Row>
  <Suppr show={showModal} onHide={() => setShowModal(false)} Nom={nom} id={id}/>
  <Modif show={showModif} onHide={() => { setShowModif(false) } } image={image} logoTmp={photoTmp} nom={nom} id={id} logo={logo} adresse={adresse} numero_telephone={num} nom_fb={nom_fb} type_service={service} slogan={slogan} description={descriprion} type_abonnement={abonnement} onChangeNum={onChangeNum} onChangeNom={onChangeNom} onChangeLogo={onChangeLogo} onChangeAdresse={onChangeAdresse} onChangeNomfb={onChangeNomfb} onChangeService={onChangeService} onChangeNif={onChangeNif} onChangeSlogan={onChangeSlogan} onChangeDescription={onChangeDescription} onChangeAbonnement={onChangeAbonnement}/>
  </div>
  )
}

