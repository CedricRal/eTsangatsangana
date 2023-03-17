import { Modal, Button, Form, Spinner } from "react-bootstrap"
import { useState } from "react"
import { useMutation, useQuery } from '@apollo/client'
import { DelEtpData, DEL_ETP, DelEtpVar } from "../../fetching/mutation/supprEtp"
import {DEL_PRODUITS,delProduitVar,delProduitsResponse} from "../../fetching/mutation/supprProd"
import {GetAllProduitsResponse,LISTE_PROD, produits} from '../../fetching/query/listeProd'

type propsEtp = {
  id: string,
  show: boolean,
  onHide: any,
}

export const Suppr = (props: propsEtp) => {
  const id = localStorage.getItem("idEtp") || ''
  const {refetch} = useQuery<GetAllProduitsResponse>(
    LISTE_PROD,
    {
        variables:{
            page:0,
            id_etp:id
        }
    }
)
  const [delProduit, { data, loading, error }] = useMutation<delProduitsResponse, delProduitVar>(
    DEL_PRODUITS, {
    refetchQueries: [{ query: LISTE_PROD, variables: { page: 0, id_etp: id } }],
    onQueryUpdated(observableQuery) {
      return observableQuery.refetch();
    }
  }
  )
  const validate = (event: any) => {
    console.log("iddddddd"+props.id);
    event.preventDefault()
    delProduit({
      variables: { id: props.id }
    })
    setShowToast(true)
  }
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showToast, setShowToast] = useState<boolean>(false)
  if (loading) {
    return (<div style={{position:'absolute',top:'50%',left:'50%', color:'white'}}>
    <Spinner variant="light" animation="border" role="status" className='text-center'>
<span className="visually-hidden">Loading...</span>
</Spinner>
</div>)
  }
  if (error) { return <p>{error.message}</p> }
  return (
    <div style={{ fontFamily: "roboto" }}>

      <Modal
        show={props.show}
        onHide={props.onHide}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Form onSubmit={validate}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Suppression
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Souhaitez-vous vraiment supprimer ce produit?
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={props.onHide}>Annuler</Button>
            <Button variant="success" type="submit" onClick={props.onHide}>Supprimer</Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Modal
        show={showToast}
        onHide={() => { setShowToast(false) }}
        size="sm"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Suppression
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontSize: "medium" }}>
          Suppression réussie <i style={{ color: '#44751e' }} className="bi bi-check-lg"></i>
        </Modal.Body>
      </Modal>
    </div>
  )
}