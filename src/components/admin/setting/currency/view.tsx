import { Col, Portlet, Nav, Row, Table, Tab, Button, Form, InputGroup} from '@blueupcode/components'
import axios from 'axios'
import { toast } from 'components/sweetalert2/instance'
import { parseCookies } from 'nookies'
import React from 'react'
import { Admin_Currency_GetOne, Admin_Currency_Edit } from 'utils/adminUrl'

const isEmpty = require('utils/is-empty')

const View = (props: any) => {
    
    const cookies = parseCookies()
    const headers = {"Authorization": cookies.admintoken}
    const id = props.id
    interface Errors {
        name: any,
        symbol: any,
        currency: any
    }
    const [errors, setErrors] = React.useState<Errors>({name: '', symbol: '', currency: ''})
    const [newOne, setNewOne]= React.useState({})
    
    const [name, setName] = React.useState('')
    const [symbol, setSymbol] = React.useState('')
    const [decimal_separator, setDecimal_separator] = React.useState('')
    const [thousand_separator, setThousand_separator] = React.useState('')
    const [placement, setPlacement] = React.useState('')
    const [placementValue, setPlacementValue] = React.useState(['', ''])

    const danger = {color : "red"}
    
    React.useEffect(() => {
        axios.get(Admin_Currency_GetOne + `/${id}`, {headers})
            .then(res => {
                setName(res.data.name)
                setSymbol(res.data.symbol)
                setPlacement(res.data.placement)
                setDecimal_separator(res.data.decimal_separator)
                setThousand_separator(res.data.thousand_separator)
                setPlacementValue(["before", "after"])
            })
            .catch(err => {
                let error : Errors = {name: '', symbol: '', currency: ''}
                error.currency = err.response.data.currency
                setErrors(error);
            })
    }, [])

    React.useEffect(() => {
        setNewOne({name, thousand_separator, placement, symbol, decimal_separator})
    }, [name, placement, thousand_separator, placement, symbol])

    const successAlert = () => {
        toast.fire({
            icon: 'success',
            title: 'Success!'
        })
    }

    const onDefaultcheck = (id: any) => {
        if(placement == id) { return true }
        return false
    }

    const onCheck = (e: any) => {
        setPlacement(e.target.id)
    }
    
    const handleSubmit = async () => {
        await axios.put(Admin_Currency_Edit + `/${id}`, newOne, {headers})
            .then(res => {
                successAlert()
                setErrors({name: '', symbol: '', currency: ''})
            })
            .catch(err => {
                let error : Errors = {name: '', symbol: '', currency: ''}
                !isEmpty(err.response.data.name)? error.name = err.response.data.name : ''
                !isEmpty(err.response.data.symbol)? error.symbol = err.response.data.symbol : ''
                setErrors(error)
            })
    }

    return(
        <Row>
            <Col md = "6">
                <Portlet>
                    <Portlet.Header bordered>
                        <Portlet.Addon>
                            <p style={danger}>{errors.currency}</p>
                        </Portlet.Addon>
                    </Portlet.Header>
                    <Portlet.Body>
                    <Form.Group controlId="nameID">
                        <Form.Label>* Name</Form.Label>
                            <Form.Control onChange={(e) => setName(e.target.value)} defaultValue={name} type="text" size = 'lg'/>
                            <p style={danger}>{errors.name}</p>
                        </Form.Group>
                        <Form.Group controlId="symbolID">
                            <Form.Label>* Symbol</Form.Label>
                            <Form.Control onChange={(e) => setSymbol(e.target.value)} defaultValue={symbol} type="text" size = 'lg'/>
                            <p style={danger}>{errors.symbol}</p>
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group controlId="decimalID">
                                    <Form.Label>* Decimal Separator</Form.Label>
                                    <Form.Control onChange={(e) => setDecimal_separator(e.target.value)} defaultValue={decimal_separator} type="text" size = 'lg'/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="thousandID">
                                    <Form.Label>* Thousand Separator</Form.Label>
                                    <Form.Control onChange={(e) => setThousand_separator(e.target.value)} defaultValue={thousand_separator} type="text" size = 'lg'/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <p></p>
                        <p>* Currency Placement </p>
                        <Row>
                            {
                                placementValue.map((value)=>(
                                    <Col key={value}>
                                        <Form.Check 
                                            type="radio" 
                                            id={value} 
                                            name="placement" 
                                            label={value}
                                            defaultChecked = {onDefaultcheck(value)}
                                            onChange={(e)=>onCheck(e)}
                                        />
                                    </Col>                                    
                                ))
                            }
                        </Row>
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
