import { Col, Portlet, Nav, Row, Table, Tab, Button, Form, InputGroup} from '@blueupcode/components'
import axios from 'axios'
import { toast } from 'components/sweetalert2/instance'
import { parseCookies } from 'nookies'
import React from 'react'
import { Admin_Contract_Type_ADD } from 'utils/adminUrl'

const isEmpty = require('utils/is-empty')

const NewOne = () => {
    
    const cookies = parseCookies()
    const headers = {"Authorization": cookies.admintoken}
    const [newOne, setNewOne]= React.useState({})

    const [name, setName] = React.useState('')

    interface Errors {
        name: any,
    }
    const [errors, setErrors] = React.useState<Errors>({name: ''})
    const danger = {color : "red"}
    
    React.useEffect(() => {
        setNewOne({name})
    }, [name])

    const successAlert = () => {
        toast.fire({
            icon: 'success',
            title: 'Success!'
        })
    }
    
    const handleSubmit = async () => {
        await axios.post(Admin_Contract_Type_ADD, newOne, {headers})
            .then(res => {
                successAlert()
                setErrors({name: ''})
            })
            .catch(err => {
                let error : Errors = {
                    name: ''
                }
                !isEmpty(err.response.data.name)? error.name = err.response.data.name : ''
                setErrors(error);
            })
    }

    return(
        <Row>
            <Col md = "6">
                <Portlet>
                    <Portlet.Header bordered>
                        <Portlet.Addon>
                            <h4>* New Contract Type</h4>
                        </Portlet.Addon>
                    </Portlet.Header>
                    <Portlet.Body>
                        <Form.Group controlId="nameID">
                            <Form.Label>* Contract Type Name</Form.Label>
                            <Form.Control onChange={(e) => setName(e.target.value)} type="text" size = 'lg'/>
                            <p style={danger}>{errors.name}</p>
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
