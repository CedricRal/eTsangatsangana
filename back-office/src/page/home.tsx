import React, { ReactNode, useState } from "react"
import { Link, useLocation, NavLink } from 'react-router-dom'
import { Nav, Navbar, Container, Button, Offcanvas, Image } from "react-bootstrap"
import logo from '../assets/logo/ET_0F.png'
import abonnement from '../assets/logo/abonnement.png'
import campagne_push from '../assets/logo/campagne_push.png'
import entreprise from '../assets/logo/entreprise.png'
import produit from '../assets/logo/produit.png'


interface props {
  children: ReactNode
}

const Home = ({ children }: props) => {
  const [show, setShow] = useState(false);
  const [isClose, setIsClose] = useState(false);
  const toggle = () => setIsClose(!isClose);
  const menuItem = [
    {
      path: "/entreprise",
      name: "Entreprise",
      icon: <Image src={entreprise} width={24} height={24}></Image>
    },
    {
      path: "/publicité",
      name: "Publicités",
      icon: <Image src={produit} width={24} height={24}></Image>
    },
    {
      path: "/campagne_push",
      name: "Campagne push",
      icon: <Image src={campagne_push} width={24} height={24}></Image>
    },
    {
      path: "/abonnement_entreprise",
      name: "Abonnement entreprise",
      icon: <Image src={abonnement} width={24} height={24}></Image>
    }
  ]
  return (
    <div style={{ display: "flex", fontFamily: "Roboto" }}>
      <Navbar className="c-secondary fixed-top shadow" expand="lg" fixed-top style={{height:'14%'}}>
        <Nav className="bg-light" >
          <Nav.Link onClick={toggle} style={{backgroundColor:'white',paddingTop:'35%'}}>
            <i className="bi bi-list" style={{ fontSize: "2.5em", color: "#6b3b1e", backgroundColor:'white' }}></i>
          </Nav.Link>
        </Nav>
        <Container fluid className="c-secondary">
          <Navbar.Brand style={{marginBottom:'1.5%'}}>
            <Image src={logo} width={60} height={60} alt="User icon" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            <span className="justify-content-end" style={{ fontSize: "30px" }}>
              <Button variant="light" style={{ backgroundColor: "#6b3b1e", color: "white" }}>Déconnexion</Button>
            </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div style={{ width: isClose ? "50px" : "210px" }} className="sidebar">
        {
          menuItem.map((item, index) => (
            <NavLink to={item.path} key={index} className="link">
              <div className="icon" style={{ display: "inline" }}>{item.icon}</div>
              <div style={{ display: isClose ? "none" : "block" }} className="link_text">{item.name}</div>
            </NavLink>
          ))
        }
      </div>
      <Container fluid style={{ display: "flex", margin: isClose ? "105px 0px 0px 80px" : "105px 0px 0px 215px", width: isClose ? "100%" : "100%" }}>
        <main style={{ width: "100%" }}>{children}</main>
      </Container>
    </div>
  )
}

export default Home
