import { Col, Portlet, Nav, Row, Table, Tab, Button, Form, InputGroup} from '@blueupcode/components'
import axios from 'axios'
import { toast } from 'components/sweetalert2/instance'
import { parseCookies } from 'nookies'
import React from 'react'
import {Admin_Accounting_JournalEntry_GetOne, Admin_Accounting_JournalEntry_Edit} from 'utils/adminUrl'

const isEmpty = require('utils/is-empty')

const View = (props: any) => {
    
    const cookies = parseCookies()
    const headers = {"Authorization": cookies.admintoken}
    const id = props.id
    interface Errors {
        journal_entries: any,
    }
    const [errors, setErrors] = React.useState<Errors>({journal_entries: ''})
    const [newOne, setNewOne]= React.useState({})

    const [number, setNumber] = React.useState('')
    const [journal_date, setJournal_date] = React.useState<Date>()
    const [amount, setAmount] = React.useState(0)
    const [description, setDescription] = React.useState('')

    const danger = {color : "red"}
    
    React.useEffect(() => {
        axios.get(Admin_Accounting_JournalEntry_GetOne + `/${id}`, {headers})
            .then(res => {
                setNumber(res.data.number)
                setJournal_date(res.data.journal_date)
                setAmount(res.data.amount)
                setDescription(res.data.description)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    React.useEffect(() => {
        setNewOne({number, journal_date, amount, description})
    }, [number, journal_date, amount, description])

    const successAlert = () => {
        toast.fire({
            icon: 'success',
            title: 'Success!'
        })
    }
    
    const handleSubmit = async () => {
        await axios.put(Admin_Accounting_JournalEntry_Edit + `/${id}`, newOne, {headers})
            .then(res => {
                successAlert()
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handlejournal_date = (data: any) => {
        const temp = String(data).slice(0, 9)
        return temp
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
                        <Form.Group controlId="numberID">
                            <Form.Label>* Number</Form.Label>
                            <Form.Control onChange={(e) => setNumber(e.target.value)} defaultValue={number} type="text" size = 'lg'/>
                        </Form.Group>
                        <Form.Group controlId="journalDateID">
                            <Form.Label>* Journal Date : {handlejournal_date(journal_date)}</Form.Label>
                            <Form.Control onChange={(e) => setJournal_date(new Date(e.target.value))} type="date" size = 'lg'/>
                        </Form.Group>
                        <Form.Group controlId="amountID">
                            <Form.Label>* Amount</Form.Label>
                            <Form.Control onChange={(e) => setAmount(parseInt(e.target.value))} value={amount} type="Number" size = 'lg'/>
                        </Form.Group>
                        <Form.Group controlId="descriptionID">
                            <Form.Label>* Description</Form.Label>
                            <Form.Control onChange={(e) => setDescription(e.target.value)} defaultValue={description} type="text" size = 'lg'/>
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
