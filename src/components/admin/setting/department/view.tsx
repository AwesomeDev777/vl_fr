import { Col, Portlet, Nav, Row, Table, Tab, Button, Form, InputGroup} from '@blueupcode/components'
import axios from 'axios'
import { toast } from 'components/sweetalert2/instance'
import { parseCookies } from 'nookies'
import React from 'react'
import { Admin_Department_GetOne, Admin_Department_Edit } from 'utils/adminUrl'

const isEmpty = require('utils/is-empty')

const View = (props: any) => {
    
    const cookies = parseCookies()
    const headers = {"Authorization": cookies.admintoken}
    const id = props.id
    interface Errors {
        name: any,
        email: any,
        folder: any,
        department: any
    }
    const [errors, setErrors] = React.useState<Errors>({name: '', email: '', folder: '', department: ''})
    const [newOne, setNewOne]= React.useState({})
    
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [folder, setFolder] = React.useState('')
    const danger = {color : "red"}
    
    React.useEffect(() => {
        axios.get(Admin_Department_GetOne + `/${id}`, {headers})
            .then(async res => {
                setName(res.data.name)
                setEmail(res.data.email)
                setFolder(res.data.folder)
            })
            .catch(err => {
                let error = {name: '', email: '', folder: '', department: ''}
                error.department = err.response.data.department
                setErrors(error);
            })
    }, [])

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
        await axios.put(Admin_Department_Edit + `/${id}`, newOne, {headers})
            .then(res => {
                successAlert()
            })
            .catch(err => {
                let error = {name: '', email: '', folder: '', department: ''}
                !isEmpty(err.response.data.email) ? error.email = err.response.data.email : ''
                !isEmpty(err.response.data.name)? error.name = err.response.data.name : ''
                !isEmpty(err.response.data.folder)? error.folder = err.response.data.folder : ''
                !isEmpty(err.response.data.department)? error.department = err.response.data.department : ''
                setErrors(error)
            })
    }

    return(
        <Row>
            <Col md = "6">
                <Portlet>
                    <Portlet.Header bordered>
                        <Portlet.Addon>
                            <h4>{name}</h4>
                            <p style={danger}>{errors.department}</p>
                        </Portlet.Addon>
                    </Portlet.Header>
                    <Portlet.Body>
                        <Form.Group controlId="emailID">
                            <Form.Label>* Email</Form.Label>
                            <Form.Control onChange={(e) => setEmail(e.target.value)} defaultValue={email} type="text" size = 'lg'/>
                            <p style={danger}>{errors.email}</p>
                        </Form.Group>
                        <Form.Group controlId="folderID">
                            <Form.Label>* Folder</Form.Label>
                            <Form.Control onChange={(e) => setFolder(e.target.value)} defaultValue={folder} type="text" size = 'lg'/>
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

export default View
