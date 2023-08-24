import { Col, Portlet, Nav, Row, Table, Tab, Button, Form, InputGroup} from '@blueupcode/components'
import axios from 'axios'
import { toast } from 'components/sweetalert2/instance'
import { parseCookies } from 'nookies'
import React from 'react'
import { Admin_Payment_Mode_ADD } from 'utils/adminUrl'

const isEmpty = require('utils/is-empty')

const NewOne = () => {
    
    const cookies = parseCookies()
    const headers = {"Authorization": cookies.admintoken}
    const [newOne, setNewOne]= React.useState({})

    const [name, setName] = React.useState('')
    const [active, setActive] = React.useState(true)
    const [show_on_pdf, setShow_on_pdf] = React.useState(false)
    const [invoices_only, setInvoices_only] = React.useState(false)
    const [expenses_only, setExpenses_only] = React.useState(false)
    const [selected_by_default, setSelected_by_default] = React.useState(false)
    const [description, setDescription] = React.useState('')

    interface Errors {
        name: any,
    }
    const [errors, setErrors] = React.useState<Errors>({name: ''})
    const danger = {color : "red"}
    
    React.useEffect(() => {
        setNewOne({name, description, show_on_pdf, invoices_only, expenses_only, selected_by_default, active})
    }, [name, description, show_on_pdf, invoices_only, expenses_only, selected_by_default, active])

    const successAlert = () => {
        toast.fire({
            icon: 'success',
            title: 'Success!'
        })
    }
    
    const handleSubmit = async () => {
        await axios.post(Admin_Payment_Mode_ADD, newOne, {headers})
            .then(res => {
                successAlert()
                setErrors({name: ''})
            })
            .catch(err => {
                let error = {name: ''}
                if(!isEmpty(err.response)){
                    !isEmpty(err.response.data.name)? error.name = err.response.data.name : ''
                }
                setErrors(error);
            })
    }
    
    const change = (func: any, e: any) => {
        func(e.target.checked) 
    }

    return(
        <Row>
            <Col md = "6">
                <Portlet>
                    <Portlet.Header bordered>
                        <Portlet.Addon>
                            <h4>* New Payment Mode</h4>
                        </Portlet.Addon>
                    </Portlet.Header>
                    <Portlet.Body>
                        <Form.Group controlId="nameID">
                            <Form.Label>*Payment Mode Name</Form.Label>
                            <Form.Control onChange={(e) => setName(e.target.value)} type="text" size = 'lg'/>
                            <p style={danger}>{errors.name}</p>
                        </Form.Group>
                        <Form.Group controlId="descriptionID">
                            <Form.Label>Bank Accounts / Description</Form.Label>
                            <Form.Control onChange={(e) => setDescription(e.target.value)} as="textarea" rows={3}/>
                        </Form.Group>
                            <p></p>
                            <Form.Check 
                                type="checkbox"  
                                name = "active" 
                                label= "Active"
                                defaultChecked = {active} 
                                onChange={(e) => change(setActive, e)}
                            />
                            <p></p>
                            <Form.Check 
                                type="checkbox"  
                                name = "show_on_pdf" 
                                label= "Show Bank Accounts / Description on Invoice PDF"
                                defaultChecked = {show_on_pdf} 
                                onChange={(e) => change(setShow_on_pdf, e)}
                            />
                            <p></p>
                            <Form.Check 
                                type="checkbox"  
                                name = "selected_by_default" 
                                label= "Selected by default on invoice"
                                defaultChecked = {selected_by_default} 
                                onChange={(e) => change(setSelected_by_default, e)}
                            />
                            <p></p>
                            <Form.Check 
                                type="checkbox"  
                                name = "invoices_only" 
                                label= "Invoices Only"
                                defaultChecked = {invoices_only} 
                                onChange={(e) => change(setInvoices_only, e)}
                            />
                            <p></p>
                            <Form.Check 
                                type="checkbox"  
                                name = "expenses_only" 
                                label= "Expenses Only"
                                defaultChecked = {expenses_only} 
                                onChange={(e) => change(setExpenses_only, e)}
                            />
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
