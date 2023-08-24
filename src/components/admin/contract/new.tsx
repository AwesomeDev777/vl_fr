import { Col, Portlet, Nav, Row, Tab, Button, Form, InputGroup} from '@blueupcode/components'
import axios from 'axios'
import { swal, toast } from 'components/sweetalert2/instance'
import { parseCookies } from 'nookies'
import React from 'react'
import { Admin_Client_Get, Admin_Contract_ADD, Admin_Contract_Type_GetAll } from 'utils/adminUrl'

const NewOne = () => {
    
    const cookies = parseCookies()
    const headers = {"Authorization": cookies.admintoken}

    const [client, setClient] = React.useState('')
    const [subject, setSubject] = React.useState('')
    const [contract_value, setContract_value] = React.useState(0)
    const [contract_type, setContract_type] = React.useState('')
    const [datestart, setDatestart] = React.useState<Date>()
    const [dateend, setDateend] = React.useState<Date>()
    const [description, setDescription] = React.useState('')

    const [newOne, setNewOne] = React.useState({})

    const [clients, setClients] = React.useState([])
    const [contract_types, setContract_types] = React.useState([])
    
    React.useEffect(() => {
        setNewOne({client, subject, contract_type, contract_value, datestart, dateend, description})
    }, [client, subject, contract_type, contract_value, datestart, dateend, description])

    const successAlert = () => {
        toast.fire({
            icon: 'success',
            title: 'Success',
        })
    }

    React.useEffect(() => {
        axios.get(Admin_Client_Get, {headers})
            .then(res => {
                setClient(res.data.data[0]._id)
                setClients(res.data.data)
            })
            .catch(err => console.log(err))
    }, [])

    React.useEffect(() => {
        axios.get(Admin_Contract_Type_GetAll + `/1/0`, {headers})
            .then(res => {
                setContract_types(res.data.all)
                setContract_type(res.data.all[0]._id)
            })
            .catch(err => console.log(err))
    }, [])
    
    const handleSubmit = async () => {
        await axios.post(Admin_Contract_ADD, newOne, {headers})
            .then(res => {
                successAlert()
            })
            .catch(err => {
                console.log(err)
            })
    }

    return(
        <Row>
            <Col md = "6">
                <Portlet>
                    <Portlet.Header bordered>
                        <Portlet.Addon>
                            <h4>* Contract Information</h4>
                        </Portlet.Addon>
                    </Portlet.Header>
                    <Portlet.Body>
                        <Row>
                            <Col>
                                <div className="d-grid gap-3">
                                    <Form.Group controlId="clientID">
                                        <Form.Label>*Client</Form.Label>
                                        <Form.Select onChange={(e) => setClient(e.target.value)} size="lg">
                                            {
                                                clients.map((client_value: any) => (
                                                    <option key={client_value._id} value={client_value._id}>{client_value.company}</option>
                                                ))
                                            }
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group controlId="subjectID">
                                        <Form.Label>*Subject</Form.Label>
                                        <Form.Control onChange={(e) => setSubject(e.target.value)} type="text" size = 'lg'/>
                                    </Form.Group>
                                    <Form.Group controlId="contractvalueID">
                                        <Form.Label>*Contract value</Form.Label>
                                        <Form.Control onChange={(e) => setContract_value(parseInt(e.target.value))}  type="Number"  size = 'lg'/>
                                    </Form.Group>
                                    <Form.Group controlId="contracttypeID">
                                        <Form.Label>*Contract type</Form.Label>
                                        <Form.Select onChange={(e) => setContract_type(e.target.value)} size="lg">
                                            {
                                                contract_types.map((contract_type_value: any)=> (
                                                    <option key={contract_type_value._id} value={contract_type_value._id}>{contract_type_value.name}</option>
                                                ))
                                            }
                                        </Form.Select>
                                    </Form.Group>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="startdateID">
                                                <Form.Label>*Start Date</Form.Label>
                                                <Form.Control onChange={(e) => setDatestart(new Date(e.target.value))}  type="date"  size = 'lg'/>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group controlId="enddateID">
                                                <Form.Label>*End Date</Form.Label>
                                                <Form.Control onChange={(e) => setDateend(new Date(e.target.value))}  type="date"  size = 'lg'/>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Form.Group controlId="descriptionID">
                                        <Form.Label>*Description</Form.Label>
                                        <Form.Control onChange={(e) => setDescription(e.target.value)} as="textarea" rows={3}/>
                                    </Form.Group>
                                </div>
                            </Col>
                        </Row>
                        {/* END Tabs */}
                    </Portlet.Body>
                    <Portlet.Footer bordered align="end">
                        <Button onClick={handleSubmit} type='submit' variant="primary">Submit</Button>
                    </Portlet.Footer>
                </Portlet>
            </Col>
        </Row>
    )
}

export default NewOne
