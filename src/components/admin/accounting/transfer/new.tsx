import { Col, Portlet, Nav, Row, Table, Tab, Button, Form, InputGroup} from '@blueupcode/components'
import axios from 'axios'
import { toast } from 'components/sweetalert2/instance'
import { parseCookies } from 'nookies'
import React from 'react'
import { Admin_Accounting_Transfer_ADD } from 'utils/adminUrl'

const isEmpty = require('utils/is-empty')

const NewOne = () => {
    
    const cookies = parseCookies()
    const headers = {"Authorization": cookies.admintoken}
    const [newOne, setNewOne]= React.useState({})

    const [transfer_funds_from, setTransfer_funds_from] = React.useState('')
    const [transfer_funds_to, setTransfer_funds_to] = React.useState('')
    const [transfer_amount, setTransfer_amount] = React.useState(0)
    const [date, setDate] = React.useState<Date>()
    const [description, setDescription] = React.useState('')

    interface Errors {
        transfer_funds_from: any,
        transfer_funds_to: any
    }
    const [errors, setErrors] = React.useState<Errors>({transfer_funds_from: '', transfer_funds_to: ''})
    const danger = {color : "red"}
    
    React.useEffect(() => {
        setNewOne({transfer_funds_from, transfer_funds_to, transfer_amount, date, description})
    }, [transfer_funds_from, transfer_funds_to, transfer_amount, date, description])

    const successAlert = () => {
        toast.fire({
            icon: 'success',
            title: 'Success!'
        })
    }

    const handleSubmit = async () => {
        await axios.post(Admin_Accounting_Transfer_ADD, newOne, {headers})
            .then(res => {
                successAlert()
                setErrors({transfer_funds_from: '', transfer_funds_to: ''})
            })
            .catch(err => {
                let error : Errors = {transfer_funds_from: '', transfer_funds_to: ''}
                !isEmpty(err.response.data.transfer_funds_from)? error.transfer_funds_from = err.response.data.transfer_funds_from : ''
                !isEmpty(err.response.data.transfer_funds_to)? error.transfer_funds_to = err.response.data.transfer_funds_to : ''
                setErrors(error)
            })
    }

    return(
        <Row>
            <Col md = "6">
                <Portlet>
                    <Portlet.Header bordered>
                        <Portlet.Addon>
                            <h4>* New One</h4>
                        </Portlet.Addon>
                    </Portlet.Header>
                    <Portlet.Body>
                        <Form.Group controlId="transferfundsfromID">
                            <Form.Label>* Transfer funds from</Form.Label>
                            <Form.Control onChange={(e) => setTransfer_funds_from(e.target.value)} type="text" size = 'lg'/>
                            <p style={danger}>{errors.transfer_funds_from}</p>
                        </Form.Group>
                        <Form.Group controlId="transferfundstoID">
                            <Form.Label>* Transfer funds to</Form.Label>
                            <Form.Control onChange={(e) => setTransfer_funds_to(e.target.value)} type="text" size = 'lg'/>
                            <p style={danger}>{errors.transfer_funds_to}</p>
                        </Form.Group>
                        <Form.Group controlId="amountID">
                            <Form.Label>* Transfer Amount</Form.Label>
                            <Form.Control onChange={(e) => setTransfer_amount(parseInt(e.target.value))} type="Number" size = 'lg'/>
                        </Form.Group>
                        <Form.Group controlId="dateID">
                            <Form.Label>* Date</Form.Label>
                            <Form.Control onChange={(e) => setDate(new Date(e.target.value))} type="date" size = 'lg'/>
                        </Form.Group>
                        <Form.Group controlId="descriptionID">
                            <Form.Label>* Description</Form.Label>
                            <Form.Control onChange={(e) => setDescription(e.target.value)} as="textarea" rows={3}/>
                        </Form.Group>
                    </Portlet.Body>
                    <Portlet.Footer>
                        <Portlet.Footer bordered align="end">
                            <Button onClick={handleSubmit} type='submit' variant="primary">Submit</Button>
                        </Portlet.Footer>
                    </Portlet.Footer>
                </Portlet>
            </Col>
        </Row>
    )
}

export default NewOne
