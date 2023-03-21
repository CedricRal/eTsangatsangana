import { NavLink} from 'react-router-dom'
import { Nav, Navbar, Container, Button, Form } from "react-bootstrap"
import { data } from '../../data/entreprise'
import React, { ReactNode, useState } from "react"

interface props {
    children: ReactNode
}

export const Publicité = ({ children }: props) => {
    return (
        <>
            <div style={{ fontSize: "27px", fontFamily: "Roboto", color: "#6b3b1e" }} className="text-center"><b>Liste des publicités</b></div>
            <Navbar>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end" style={{ paddingRight: "20px" }}>
                    <span style={{ fontSize: "larger" }}>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder='Recherche'
                                className="me-2"
                                aria-label="Recherche"
                            />
                        </Form>
                    </span>
                </Navbar.Collapse>
            </Navbar>
            <Container fluid>
                <main>{children}</main>
            </Container>
        </>
    )
}