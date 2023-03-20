import {gql,useQuery} from '@apollo/client'
import {Nav,Form,Button} from 'react-bootstrap'
import {GetOneEntrepriseResponse, GET_ONE_ENTREPRISE} from '../../fetching/query/detailEtp'
import {DETAIL_PROD,detailProdResponse} from '../../fetching/query/detailProd'

export const DétailsProd = ()=>{
    const id = localStorage.getItem("idProd")
    console.log("id produits:"+id);
    const {data,error,loading} = useQuery<detailProdResponse>(
        DETAIL_PROD,
        {
            variables:{id:id}
        }
    )
    const produits = data?.getOneProduit
    console.log(produits)
    if (loading) return (<div>Loading....</div>)
    if (error) return (<p>{error.message}</p>)
    return (
        <div style={{ fontFamily: "Roboto", width: "80vh" }} >
            <Nav.Link href="/produits" style={{ width: "20px" }}>
                <p className="fw-bolder tx-tertiary fs-3 fw-bold" >
                    <i className="bi bi-chevron-left"></i>
                </p>
            </Nav.Link>
            <Form.Group className="mb-3">
                <Form.Label>Nom :</Form.Label>
                <Form.Control value={(produits && (produits.titre))} />
            </Form.Group>
            
            <Form.Group className="mb-3">
                <Form.Label>Description :</Form.Label>
                <Form.Control as="textarea" value={(produits && (produits.description))} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Résumé :</Form.Label>
                <Form.Control as="textarea" rows={2} value={(produits && (produits.resume))} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Prix :</Form.Label>
                <Form.Control value={(produits && (produits.prix))} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Quantité du produit :</Form.Label>
                <Form.Control value={(produits && (produits.qt))} />
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Check
                    checked = {(produits && (produits.status) == 1) ? true : false}
                    label={<b>Publier en tant que publicité</b>}
                    name="group1"
                    type='checkbox'
                />
            </Form.Group>
        </div>
    )
}