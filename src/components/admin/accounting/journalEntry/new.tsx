import { Col, Portlet, Nav, Row, Table, Tab, Button, Form, InputGroup} from '@blueupcode/components'
import axios from 'axios'
import { toast } from 'components/sweetalert2/instance'
import { parseCookies } from 'nookies'
import React from 'react'
import { Admin_Accounting_JournalEntry_ADD } from 'utils/adminUrl'

const isEmpty = require('utils/is-empty')

const NewOne = () => {
    
    const cookies = parseCookies()
    const headers = {"Authorization": cookies.admintoken}
    const [newOne, setNewOne]= React.useState({})

    const [number, setNumber] = React.useState('')
    const [journal_date, setJournal_date] = React.useState<Date>()
    const [amount, setAmount] = React.useState(0)
    const [description, setDescription] = React.useState('')
    interface Errors {
        journal_entries: any,
    }
    const [errors, setErrors] = React.useState<Errors>({journal_entries: ''})
    const danger = {color : "red"}
    
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
        await axios.post(Admin_Accounting_JournalEntry_ADD, newOne, {headers})
            .then(res => {
                successAlert()
                setErrors({journal_entries: ''})
            })
            .catch(err => {
                let error : Errors = {
                    journal_entries: ''
                }
                !isEmpty(err.response.data.journal_entries)? error.journal_entries = err.response.data.journal_entries : ''
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
                        <Form.Group controlId="numberID">
                            <Form.Label>* Number</Form.Label>
                            <Form.Control onChange={(e) => setNumber(e.target.value)} type="text" size = 'lg'/>
                        </Form.Group>
                        <Form.Group controlId="journalDateID">
                            <Form.Label>* Journal Date</Form.Label>
                            <Form.Control onChange={(e) => setJournal_date(new Date(e.target.value))} type="date" size = 'lg'/>
                        </Form.Group>
                        <Form.Group controlId="amountID">
                            <Form.Label>* Amount</Form.Label>
                            <Form.Control onChange={(e) => setAmount(parseInt(e.target.value))} type="Number" size = 'lg'/>
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
