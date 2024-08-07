import { Modal } from "react-bootstrap"


type propsEtp = {
    show: boolean,
    onClose: any,
    message: string
}

export const PopUp = (props: propsEtp) => {
    return (
        <div style={{ fontFamily: "roboto" }}>
            <Modal
                show={props.show}
                onHide={props.onClose}
                size="sm"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Error
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ fontSize: "medium" }}>
                    {props.message} <i style={{ color: '#44751e' }} className="bi bi-check-lg"></i>
                </Modal.Body>
            </Modal>
        </div>
    )
}