import { Col, Portlet, Nav, Row, Table, Tab, Button, Form, InputGroup} from '@blueupcode/components'
import axios from 'axios'
import { toast } from 'components/sweetalert2/instance'
import { parseCookies } from 'nookies'
import React from 'react'
import { Admin_Department_ADD } from 'utils/adminUrl'

const isEmpty = require('utils/is-empty')

const NewOne = () => {
    
    const cookies = parseCookies()
    const headers = {"Authorization": cookies.admintoken}
    const [newOne, setNewOne]= React.useState({})

    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [folder, setFolder] = React.useState('')

    interface Errors {
        name: any,
        email: any,
        folder: any
    }
    const [errors, setErrors] = React.useState<Errors>({name: '', email: '', folder: ''})
    const danger = {color : "red"}
    
    React.useEffect(() => {
        setNewOne({name, email, folder})
    }, [name, email, folder])

    const successAlert = () => {
        toast.fire({
            icon: 'success',
            title: 'Success!'
        })
    }
    
    const handleSubmit = async () => {
        await axios.post(Admin_Department_ADD, newOne, {headers})
            .then(res => {
                successAlert()
            })
            .catch(err => {
                let error = {name: '', email: '', folder: ''}
                !isEmpty(err.response.data.email) ? error.email = err.response.data.email : ''
                !isEmpty(err.response.data.name)? error.name = err.response.data.name : ''
                !isEmpty(err.response.data.folder)? error.folder = err.response.data.folder : ''
                setErrors(error);
            })
    }

    return(
        <Row>
            <Col md = "6">
                <Portlet>
                    <Portlet.Header bordered>
                        <Portlet.Addon>
                            <h4>* New Department</h4>
                        </Portlet.Addon>
                    </Portlet.Header>
                    <Portlet.Body>
                        <Form.Group controlId="nameID">
                            <Form.Label>* Department Name</Form.Label>
                            <Form.Control onChange={(e) => setName(e.target.value)} type="text" size = 'lg'/>
                            <p style={danger}>{errors.name}</p>
                        </Form.Group>
                        <Form.Group controlId="emailID">
                            <Form.Label>* Department Email</Form.Label>
                            <Form.Control onChange={(e) => setEmail(e.target.value)} type="text" size = 'lg'/>
                            <p style={danger}>{errors.email}</p>
                        </Form.Group>
                        <Form.Group controlId="folderID">
                            <Form.Label>* Department Folder</Form.Label>
                            <Form.Control onChange={(e) => setFolder(e.target.value)} type="text" size = 'lg'/>
                            <p style={danger}>{errors.folder}</p>
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
