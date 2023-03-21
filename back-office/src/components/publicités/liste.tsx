import { LISTE_PUB, ListePubResponse } from '../../fetching/query/listePub'
import { gql, useQuery } from '@apollo/client'
import { useState, useEffect } from "react"
import { NavLink, Route, Routes } from 'react-router-dom'
import { Card, Row, Col, Button, Spinner, Nav } from "react-bootstrap"

export const ListePub = () => {
  const { loading, error, data, refetch } = useQuery<ListePubResponse>(
    LISTE_PUB,
    {
      variables: { page: 0 },
      pollInterval: 200
    },
  );

  const publicités = data?.getAllPublicites.items
  if (loading) return (<div className="center"><Spinner animation="border" role="status">
    <span className="visually-hidden">Loading...</span>
  </Spinner></div>)
  if (error) return (<p>{error.message}</p>)
  return (
    <>
      <div style={{ fontFamily: "roboto" }}>
        <Row xs={1} mg={2} lg={3} className='g-4'>
          {publicités && (
            publicités.map((publicité) => {
              return (
                <Col key={publicité.id}>
                  <Card border="success" style={{ width: '100%', height: '99%' }}>
                    <Nav>
                      <Nav.Link to='/produits/détails' as={NavLink} style={{ width: "100%" }} eventKey={publicité.id}>
                        <Card.Img variant="top" src={publicité.image} width={250} height={220} />
                      </Nav.Link>
                    </Nav>
                    <Card.Body>
                      <Card.Title>{publicité.titre}</Card.Title>
                      <Card.Text style={{ width: '100%', height: '25%', overflow: 'auto' }}>
                        {publicité.description}
                      </Card.Text>
                      <Card.Text style={{ width: '100%', height: '15%', overflow: 'auto' }}>
                        Prix: {publicité.prix} MGA
                      </Card.Text>
                      <Card.Text style={{ width: '100%', height: '15%', overflow: 'auto' }}>
                        Entreprise: {publicité.entreprise}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              )
            })
          )
          }
        </Row>
      </div>
    </>
  )
}