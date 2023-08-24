import { Col, Portlet, Nav, Row, Table, Tab, Button, Form, InputGroup} from '@blueupcode/components'
import axios from 'axios'
import { toast } from 'components/sweetalert2/instance'
import { parseCookies } from 'nookies'
import React from 'react'
import { Admin_Payment_Mode_GetOne, Admin_Payment_Mode_Edit } from 'utils/adminUrl'

const isEmpty = require('utils/is-empty')

const View = (props: any) => {
    
    const cookies = parseCookies()
    const headers = {"Authorization": cookies.admintoken}
    const id = props.id
    interface Errors {
        name: any,
        paymentMode: any
    }
    const [errors, setErrors] = React.useState<Errors>({name: '', paymentMode: ''})
    const [newOne, setNewOne]= React.useState({})
    
    const [name, setName] = React.useState('')
    const [active, setActive] = React.useState()
    const [show_on_pdf, setShow_on_pdf] = React.useState()
    const [invoices_only, setInvoices_only] = React.useState()
    const [expenses_only, setExpenses_only] = React.useState()
    const [selected_by_default, setSelected_by_default] = React.useState()
    const [description, setDescription] = React.useState('')
    const danger = {color : "red"}
    
    React.useEffect(() => {
        axios.get(Admin_Payment_Mode_GetOne + `/${id}`, {headers})
            .then(async res => {
                setName(res.data.name)
                setActive(res.data.active)
                setShow_on_pdf(res.data.show_on_pdf)
                setInvoices_only(res.data.invoices_only)
                setExpenses_only(res.data.expenses_only)
                setSelected_by_default(res.data.selected_by_default)
                setDescription(res.data.description)
            })
            .catch(err => {
                let error = {name: '', paymentMode: ''}
                error.paymentMode = err.response.data.paymentMode
                setErrors(error);
            })
    }, [])

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
        await axios.put(Admin_Payment_Mode_Edit + `/${id}`, newOne, {headers})
            .then(res => {
                successAlert()
                setErrors({name: '', paymentMode: ''})
            })
            .catch(err => {
                let error = {name: '', paymentMode: ''}
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
                            <Form.Control onChange={(e) => setName(e.target.value)} defaultValue={name} type="text" size = 'lg'/>
                            <p style={danger}>{errors.name}</p>
                        </Form.Group>
                        <Form.Group controlId="descriptionID">
                            <Form.Label>Bank Accounts / Description</Form.Label>
                            <Form.Control onChange={(e) => setDescription(e.target.value)} defaultValue={description} as="textarea" rows={3}/>
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

export default View
