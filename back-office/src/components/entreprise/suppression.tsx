import { Modal, Button } from "react-bootstrap"
import { useState } from "react"
import { useMutation, useQuery } from '@apollo/client'
import { DelEtpData, DEL_ETP, DelEtpVar } from "../../fetching/mutation/supprEtp"
import { Valide } from './pop-up'
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
    DEL_ETP,{
      refetchQueries: [{ query: GET_ALL_ENTREPRISE_QUERY, variables: { page: 0 } }],
      onQueryUpdated(observableQuery) {
          // Define any custom logic for determining whether to refetch
          return observableQuery.refetch();
      }
  }
    )
  const validate = (event: any) => {
    event.preventDefault()
    delEtp({
      variables: { id: props.id }
    })
    setShowModal(true)
    setShowToast(true)
    console.log("Success")
  }
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showToast, setShowToast] = useState<boolean>(false)
  if (loading) { return <p>loading</p> }
  if (error) { return <p>{error.message}</p> }
  return (
    <div style={{ fontFamily: "roboto" }}>
      <Modal
        show={(showModal == true) ? false : props.show}
        onHide={props.onHide}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Suppression
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Souhaitez-vous vraiment supprimer cette entreprise ""?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={props.onHide}>Annuler</Button>
          <Button variant="success" onClick={validate}>Supprimer</Button>
        </Modal.Footer>
      </Modal>
      <Valide show={showToast} onClose={() => { setShowToast(false) }} message="Suppression" />
    </div>
  )
}