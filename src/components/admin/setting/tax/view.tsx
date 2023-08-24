import { Col, Portlet, Nav, Row, Table, Tab, Button, Form, InputGroup} from '@blueupcode/components'
import axios from 'axios'
import { toast } from 'components/sweetalert2/instance'
import { parseCookies } from 'nookies'
import React from 'react'
import { Admin_Tax_GetOne, Admin_Tax_Edit } from 'utils/adminUrl'

const isEmpty = require('utils/is-empty')

const View = (props: any) => {
    
    const cookies = parseCookies()
    const headers = {"Authorization": cookies.admintoken}
    const id = props.id
    
    interface Errors {
        tax: any,
        taxrate: any,
        name: any
    }
    const [errors, setErrors] = React.useState<Errors>({tax: '', taxrate: '', name: ''})
    const [newOne, setNewOne]= React.useState({})
    
    const [name, setName] = React.useState('')
    const [taxrate, setTaxrate] = React.useState(0)
    const danger = {color : "red"}
    
    React.useEffect(() => {
        axios.get(Admin_Tax_GetOne + `/${id}`, {headers})
            .then(async res => {
                setName(res.data.name)
                setTaxrate(res.data.taxrate)
            })
            .catch(err => {
                let error = {tax: '', taxrate: '', name: ''}
                console.log(err.response.data)
                error.tax = err.response.data.tax
                setErrors(error);
            })
    }, [])

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
        await axios.put(Admin_Tax_Edit + `/${id}`, newOne, {headers})
            .then(res => {
                successAlert()
                setErrors({tax: '', taxrate: '', name: ''})
            })
            .catch(err => {
                let error = {tax: '', taxrate: '', name: ''}
                console.log(err.response.data)
                !isEmpty(err.response.data.taxrate) ? error.taxrate = err.response.data.taxrate : ''
                !isEmpty(err.response.data.name)? error.name = err.response.data.name : ''
                !isEmpty(err.response.data.tax)? error.tax = err.response.data.tax : ''
                setErrors(error)
            })
    }

    return(
        <Row>
            <Col md = "6">
                <Portlet>
                    <Portlet.Header>
                        <Portlet.Addon>
                            {errors.tax}
                        </Portlet.Addon>
                    </Portlet.Header>
                    <Portlet.Body>
                        <Form.Group controlId="nameID">
                                <Form.Label>Name</Form.Label>
                                <Form.Control onChange={(e) => setName(e.target.value)} defaultValue={name} type="text" size = 'lg'/>
                                <p style={danger}>{errors.name}</p>
                            </Form.Group>
                            <Form.Group controlId="taxrateID">
                                <Form.Label>Rate(* percent)</Form.Label>
                                <Form.Control onChange={(e) => setTaxrate(parseInt(e.target.value))} defaultValue={taxrate} type="Number" size = 'lg'/>
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

export default View
