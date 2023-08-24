import { Col, Portlet, Nav, Row, Table, Tab, Button, Form, InputGroup} from '@blueupcode/components'
import axios from 'axios'
import { toast } from 'components/sweetalert2/instance'
import { parseCookies } from 'nookies'
import React from 'react'
import { Admin_Item_Field_GetOne, Admin_Item_Field_Edit } from 'utils/adminUrl'

const isEmpty = require('utils/is-empty')

const View = (props: any) => {
    
    const cookies = parseCookies()
    const headers = {"Authorization": cookies.admintoken}
    const id = props.id
    interface Errors {
        name: any,
        slug: any,
        field: any
    }
    const [errors, setErrors] = React.useState<Errors>({name: '', slug: '', field: ''})
    const [newOne, setNewOne]= React.useState({})
    
    const [name, setName] = React.useState('')
    const [slug, setSlug] = React.useState('')
    const danger = {color : "red"}
    
    React.useEffect(() => {
        axios.get(Admin_Item_Field_GetOne + `/${id}`, {headers})
            .then(async res => {
                setName(res.data.name)
                setSlug(res.data.slug)
            })
            .catch(err => {
                let error = {name: '', slug: '', field: ''}
                error.field = err.response.data.field
                setErrors(error);
            })
    }, [])

    React.useEffect(() => {
        setNewOne({name, slug})
    }, [name, slug])

    const successAlert = () => {
        toast.fire({
            icon: 'success',
            title: 'Success!'
        })
    }
    
    const handleSubmit = async () => {
        await axios.put(Admin_Item_Field_Edit + `/${id}`, newOne, {headers})
            .then(res => {
                successAlert()
                setErrors({name: '', slug: '', field: ''})
            })
            .catch(err => {
                let error = {name: '', slug: '', field: ''}
                !isEmpty(err.response.data.slug) ? error.slug = err.response.data.slug : ''
                !isEmpty(err.response.data.name)? error.name = err.response.data.name : ''
                !isEmpty(err.response.data.field)? error.field = err.response.data.field : ''
                setErrors(error)
            })
    }

    return(
        <Row>
            <Col md = "6">
                <Portlet>
                    <Portlet.Body>
                        <Form.Group controlId="nameID">
                                <Form.Label>* Name</Form.Label>
                                <Form.Control onChange={(e) => setName(e.target.value)} defaultValue={name} type="text" size = 'lg'/>
                                <p style={danger}>{errors.name}</p>
                            </Form.Group>
                            <Form.Group controlId="slugID">
                                <Form.Label>* Slug</Form.Label>
                                <Form.Control onChange={(e) => setSlug(e.target.value)} defaultValue={slug} type="text" size = 'lg'/>
                                <p style={danger}>{errors.slug}</p>
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
