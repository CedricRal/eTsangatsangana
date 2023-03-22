import { useState, useEffect, SetStateAction } from 'react'
import {useMutation} from '@apollo/client'
import { Container, Image, Form, Button, InputGroup,Alert, Spinner } from 'react-bootstrap';
import logo from '../assets/logo/ET_0F.png'
import { useNavigate } from 'react-router-dom'
import {AUTHENTIFICATION,authentificationResponse,authentificationVar} from '../fetching/mutation/authentification'

export const Auth = () => {
  const [email, setEmail] = useState<string>('');
  const [motDePasse, setMotDePasse] = useState<string>('');
  const [isValidMail, setIsValidMail] = useState(false)
  const [isValidMdp, setIsValidMdp] = useState(false)
  const [auth_user,{data,error,loading}] = useMutation<authentificationResponse,authentificationVar>(
    AUTHENTIFICATION
  )
  
  const onChangeEmail = (event: any) => {
    if (event.target.value == "") {
      setIsValidMail(true)
    }
    else {
      setIsValidMail(false)
    }
    const value = event.target.value;
    const isValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
    if (isValid == false) {
      setIsValidMail(true)
    }
    else {
      setIsValidMail(false)
    }
    setEmail(event.target.value);
  };

  const OnChangeMdp = (event: any) => {
    if (event.target.value == "") {
      setIsValidMdp(true)
    }
    else {
      setIsValidMdp(false)
    }
    setMotDePasse(event.target.value);
  };
  const [voirMdp, setVoirMdp] = useState(false)
  const navigate = useNavigate();
  const valider = async (event: any) => {
    event.preventDefault();
    if(email=='' || motDePasse ==''){
      await event.preventDefault();
      await event.stopPropagation();
      return
    }
    await auth_user({
      variables: { mail: email, mdp: motDePasse }
    })
    window.location.reload()
  };
  if(localStorage.getItem('token')){
    navigate('/')
  }else{
    localStorage.setItem('token', data?.auth_user.token || '')
  }
  return (
    <>
      <div className='d-flex mx-auto' style={{ width: '35%', marginTop: "7%" }}>
        {loading && <div style={{position:'fixed',top:'50%',left:'50%'}}>
        <Spinner variant="primary" animation="border" role="status" className='text-center'>
    <span className="visually-hidden">Loading...</span>
  </Spinner>
    </div>}
        <Container fluid>
          <div className="my-auto">
            <p className='mx-auto text-center'>
              <Image src={logo} width={125} height={125}></Image>
            </p>
            {error && <Alert variant='danger'>{error.message}</Alert>}
            <Form onSubmit={valider}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Adresse e-mail</Form.Label>
                <Form.Control isInvalid={isValidMail} required type="email" placeholder="Entrer votre email" onChange={onChangeEmail} value={email} />
                <Form.Control.Feedback type="invalid">
                  Veuillez saisir une adresse e-mail valide
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Label htmlFor='mdpAdm'>
                Mot de passe
              </Form.Label>
              <InputGroup className='mb-3'>
                <Form.Control isInvalid={isValidMdp} required id='mdpAdm' type={(voirMdp == false) ? "password" : 'text'} placeholder="Mot de passe" onChange={OnChangeMdp} value={motDePasse} />
                <Button variant="outline-success" id="button-addon2" onClick={(e: any) => { setVoirMdp(!voirMdp) }}>
                  {(voirMdp == true) ? <i className="bi bi-eye"></i> : <i className="bi bi-eye-slash"></i>}
                </Button>
                <Form.Control.Feedback type="invalid">Mot de passe obligatoire</Form.Control.Feedback>
              </InputGroup>
              <Button variant="light" style={{ backgroundColor: "#6b3b1e", color: "white" }} type="submit" onClick={valider}>
                Se connecter
              </Button>
            </Form>
          </div>
        </Container>
      </div>

    </>
  )
}