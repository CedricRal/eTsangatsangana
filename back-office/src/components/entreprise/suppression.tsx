import { Modal, Button, Form, Spinner } from "react-bootstrap"
import { useState } from "react"
import { useMutation, useQuery } from '@apollo/client'
import { DelEtpData, DEL_ETP, DelEtpVar } from "../../fetching/mutation/supprEtp"
import { GetAllEntrepriseResponse, GET_ALL_ENTREPRISE_QUERY, GetOneEtp } from '../../fetching/query/listeEtp'

type propsEtp = {
  Nom: string,
  id: string,
  show: boolean,
  onHide: any,
}

export const Suppr = (props: propsEtp) => {
  const { refetch } = useQuery<GetAllEntrepriseResponse>(
    GET_ALL_ENTREPRISE_QUERY,
    {
      variables: { page: 0 },
      pollInterval: 200
    },
  );
  const [delEtp, { data, loading, error }] = useMutation<DelEtpData, DelEtpVar>(
    DEL_ETP, {
    refetchQueries: [{ query: GET_ALL_ENTREPRISE_QUERY, variables: { page: 0 } }],
    onQueryUpdated(observableQuery) {
      return observableQuery.refetch();
    }
  }
  )
  const validate = (event: any) => {
    event.preventDefault()
    delEtp({
      variables: { id: props.id }
    })
    setShowToast(true)
  }
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showToast, setShowToast] = useState<boolean>(false)
  if (loading) {
    return (<div style={{position:'fixed',top:'50%',left:'50%', color:'white'}}>
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
              Souhaitez-vous vraiment supprimer cette entreprise?
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