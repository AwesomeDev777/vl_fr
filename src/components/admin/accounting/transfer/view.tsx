import { Col, Portlet, Nav, Row, Table, Tab, Button, Form, InputGroup} from '@blueupcode/components'
import axios from 'axios'
import { toast } from 'components/sweetalert2/instance'
import { parseCookies } from 'nookies'
import React from 'react'
import { desc } from 'react-dom-factories'
import {Admin_Accounting_Transfer_GetOne, Admin_Accounting_Transfer_Edit} from 'utils/adminUrl'

const isEmpty = require('utils/is-empty')

const View = (props: any) => {
    
    const cookies = parseCookies()
    const headers = {"Authorization": cookies.admintoken}
    const id = props.id
    interface Errors {
        transfer_funds_from: any,
        transfer_funds_to: any
    }
    const [errors, setErrors] = React.useState<Errors>({transfer_funds_from: '', transfer_funds_to: ''})
    const [newOne, setNewOne]= React.useState({})

    const [transfer_funds_from, setTransfer_funds_from] = React.useState('')
    const [transfer_funds_to, setTransfer_funds_to] = React.useState('')
    const [transfer_amount, setTransfer_amount] = React.useState(0)
    const [date, setDate] = React.useState<Date>()
    const [description, setDescription] = React.useState('')

    const danger = {color : "red"}
    
    React.useEffect(() => {
        axios.get(Admin_Accounting_Transfer_GetOne + `/${id}`, {headers})
            .then(res => {
                setTransfer_funds_from(res.data.transfer_funds_from)
                setTransfer_funds_to(res.data.transfer_funds_to)
                setTransfer_amount(res.data.transfer_amount)
                setDate(res.data.date)
                setDescription(res.data.description)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

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
        await axios.put(Admin_Accounting_Transfer_Edit + `/${id}`, newOne, {headers})
            .then(res => {
                successAlert()
                setErrors({transfer_funds_from: '', transfer_funds_to: ''})
            })
            .catch(err => {
                console.log(err)
            })
    }
    
    const handleDate = (data: any) => {
        const temp = String(data).slice(0, 9)
        return temp
    }

    return(
        <Row>
            <Col md = "6">
                <Portlet>
                    <Portlet.Body>
                        <Form.Group controlId="transferfundsfromID">
                            <Form.Label>* Transfer funds from</Form.Label>
                            <Form.Control onChange={(e) => setTransfer_funds_from(e.target.value)} defaultValue={transfer_funds_from} type="text" size = 'lg'/>
                            <p style={danger}>{errors.transfer_funds_from}</p>
                        </Form.Group>
                        <Form.Group controlId="transferfundstoID">
                            <Form.Label>* Transfer funds to</Form.Label>
                            <Form.Control onChange={(e) => setTransfer_funds_to(e.target.value)} defaultValue={transfer_funds_to} type="text" size = 'lg'/>
                            <p style={danger}>{errors.transfer_funds_to}</p>
                        </Form.Group>
                        <Form.Group controlId="amountID">
                            <Form.Label>* Transfer Amount</Form.Label>
                            <Form.Control onChange={(e) => setTransfer_amount(parseInt(e.target.value))} value={transfer_amount} type="Number" size = 'lg'/>
                        </Form.Group>
                        <Form.Group controlId="dateID">
                            <Form.Label>* Date : {handleDate(date)}</Form.Label>
                            <Form.Control onChange={(e) => setDate(new Date(e.target.value))}  type="date" size = 'lg'/>
                        </Form.Group>
                        <Form.Group controlId="descriptionID">
                            <Form.Label>* Description</Form.Label>
                            <Form.Control onChange={(e) => setDescription(e.target.value)} defaultValue={description} as="textarea" rows={3}/>
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

export default View
