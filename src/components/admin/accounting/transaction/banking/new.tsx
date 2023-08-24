import { Col, Portlet, Row, Button, Form} from '@blueupcode/components'
import axios from 'axios'
import { toast } from 'components/sweetalert2/instance'
import { parseCookies } from 'nookies'
import React from 'react'
import { Admin_Accounting_Transaction_Bank_ADD } from 'utils/adminUrl'

const isEmpty = require('utils/is-empty')

const NewOne = () => {
    
    const cookies = parseCookies()
    const headers = {"Authorization": cookies.admintoken}
    const [newOne, setNewOne]= React.useState({})

    const [date, setDate] = React.useState<Date>()
    const [withdrawals, setWithdrawals] = React.useState(0)
    const [deposits, setDeposits] = React.useState(0)
    const [payee, setPayee] = React.useState('')
    const [description, setDescription] = React.useState('')

    interface Errors {
        date: any,
        withdrawals: any,
        deposits: any,
        payee: any,
        description: any
    }
    const [errors, setErrors] = React.useState<Errors>({date: '', withdrawals: '', deposits: '', payee: '', description: ''})
    const danger = {color : "red"}
    
    React.useEffect(() => {
        setNewOne({date, withdrawals, deposits, payee, description})
    }, [date, withdrawals, deposits, payee, description])

    const successAlert = () => {
        toast.fire({
            icon: 'success',
            title: 'Success!'
        })
    }
    
    const handleSubmit = async () => {
        await axios.post(Admin_Accounting_Transaction_Bank_ADD, newOne, {headers})
            .then(res => {
                successAlert()
                setErrors({date: '', withdrawals: '', deposits: '', payee: '', description: ''})
            })
            .catch(err => {
                let error : Errors = {
                    date: '', withdrawals: '', deposits: '', payee: '', description: ''
                }
                !isEmpty(err.response.data.date) ? error.date = err.response.data.date : ''
                !isEmpty(err.response.data.withdrawals)? error.withdrawals = err.response.data.withdrawals : ''
                !isEmpty(err.response.data.deposits)? error.deposits = err.response.data.deposits : ''
                !isEmpty(err.response.data.payee)? error.payee = err.response.data.payee : ''
                !isEmpty(err.response.data.description)? error.description = err.response.data.description : ''
                setErrors(error);
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
                        <Form.Group controlId="dateID">
                            <Form.Label>* Date</Form.Label>
                            <Form.Control onChange={(e) => setDate(new Date(e.target.value))} type="Date" size = 'lg'/>
                            <p style={danger}>{errors.date}</p>
                        </Form.Group>
                        <Form.Group controlId="withdrawalsID">
                            <Form.Label>* Withdrawals</Form.Label>
                            <Form.Control onChange={(e) => setWithdrawals(parseInt(e.target.value))} type="Number" size = 'lg'/>
                            <p style={danger}>{errors.withdrawals}</p>
                        </Form.Group>
                        <Form.Group controlId="depositsID">
                            <Form.Label>* Deposits</Form.Label>
                            <Form.Control onChange={(e) => setDeposits(parseInt(e.target.value))} type="Number" size = 'lg'/>
                            <p style={danger}>{errors.deposits}</p>
                        </Form.Group>
                        <Form.Group controlId="payeeID">
                            <Form.Label>* Payee</Form.Label>
                            <Form.Control onChange={(e) => setPayee(e.target.value)} type="text" size = 'lg'/>
                            <p style={danger}>{errors.payee}</p>
                        </Form.Group>
                        <Form.Group controlId="descriptionID">
                            <Form.Label>* Description</Form.Label>
                            <Form.Control onChange={(e) => setDescription(e.target.value)} as="textarea" rows = {5}/>
                            <p style={danger}>{errors.description}</p>
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
