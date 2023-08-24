import { Col, Portlet, Row, Button, Form} from '@blueupcode/components'
import axios from 'axios'
import { toast } from 'components/sweetalert2/instance'
import { parseCookies } from 'nookies'
import React from 'react'
import { Admin_Tax_ADD } from 'utils/adminUrl'

const isEmpty = require('utils/is-empty')

const NewOne = () => {
    
    const cookies = parseCookies()
    const headers = {"Authorization": cookies.admintoken}
    const [newOne, setNewOne]= React.useState({})

    const [name, setName] = React.useState('')
    const [taxrate, setTaxrate] = React.useState(0)

    interface Errors {
        taxrate: any,
        name: any
    }
    const [errors, setErrors] = React.useState<Errors>({taxrate: '', name: ''})
    const danger = {color : "red"}
    
    React.useEffect(() => {
        setNewOne({name, taxrate})
    }, [name, taxrate])

    const successAlert = () => {
        toast.fire({
            icon: 'success',
            title: 'Success!'
        })
    }
    
    const handleSubmit = async () => {
        await axios.post(Admin_Tax_ADD, newOne, {headers})
            .then(res => {
                successAlert()
                setErrors({taxrate: '', name: ''})
            })
            .catch(err => {
                let error = {taxrate: '', name: ''}
                !isEmpty(err.response.data.taxrate) ? error.taxrate = err.response.data.taxrate : ''
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
                            <h4>* New Tax</h4>
                        </Portlet.Addon>
                    </Portlet.Header>
                    <Portlet.Body>
                        <Form.Group controlId="nameID">
                            <Form.Label>Name</Form.Label>
                            <Form.Control onChange={(e) => setName(e.target.value)} type="text" size = 'lg'/>
                            <p style={danger}>{errors.name}</p>
                        </Form.Group>
                        <Form.Group controlId="taxrateID">
                            <Form.Label>Rate(* percent)</Form.Label>
                            <Form.Control onChange={(e) => setTaxrate(parseInt(e.target.value))} type="Number" size = 'lg'/>
                            <p style={danger}>{errors.taxrate}</p>
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
