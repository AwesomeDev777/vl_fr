import { Col, Portlet, Nav, Row, Table, Tab, Button, Form, InputGroup} from '@blueupcode/components'
import axios from 'axios'
import { toast } from 'components/sweetalert2/instance'
import { parseCookies } from 'nookies'
import React from 'react'
import { Admin_Currency_ADD } from 'utils/adminUrl'

const isEmpty = require('utils/is-empty')

const NewOne = () => {
    
    const cookies = parseCookies()
    const headers = {"Authorization": cookies.admintoken}
    const [newOne, setNewOne]= React.useState({})

    const [name, setName] = React.useState('')
    const [symbol, setSymbol] = React.useState('')
    const [decimal_separator, setDecimal_separator] = React.useState('')
    const [thousand_separator, setThousand_separator] = React.useState('')
    const [placement, setPlacement] = React.useState('')

    interface Errors {
        name: any,
        symbol: any
    }
    const [errors, setErrors] = React.useState<Errors>({name: '', symbol: ''})
    const danger = {color : "red"}
    
    React.useEffect(() => {
        setNewOne({name, thousand_separator, placement, symbol, decimal_separator})
    }, [name, placement, thousand_separator, placement, symbol])

    const successAlert = () => {
        toast.fire({
            icon: 'success',
            title: 'Success!'
        })
    }

    const onCheck = (e: any) => {
        setPlacement(e.target.id)
    }
    
    const handleSubmit = async () => {
        // console.log(newOne)
        await axios.post(Admin_Currency_ADD, newOne, {headers})
            .then(res => {
                successAlert()
                setErrors({name: '', symbol: ''})
            })
            .catch(err => {
                let error : Errors = {
                    name: '',
                    symbol: ''
                }
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
                            <h4>* New Currency</h4>
                        </Portlet.Addon>
                    </Portlet.Header>
                    <Portlet.Body>
                        <Form.Group controlId="nameID">
                            <Form.Label>* Name</Form.Label>
                            <Form.Control onChange={(e) => setName(e.target.value)} type="text" size = 'lg'/>
                            <p style={danger}>{errors.name}</p>
                        </Form.Group>
                        <Form.Group controlId="symbolID">
                            <Form.Label>* Symbol</Form.Label>
                            <Form.Control onChange={(e) => setSymbol(e.target.value)} type="text" size = 'lg'/>
                            <p style={danger}>{errors.symbol}</p>
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group controlId="decimalID">
                                    <Form.Label>* Decimal Separator</Form.Label>
                                    <Form.Control onChange={(e) => setDecimal_separator(e.target.value)} type="text" size = 'lg'/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="thousandID">
                                    <Form.Label>* Thousand Separator</Form.Label>
                                    <Form.Control onChange={(e) => setThousand_separator(e.target.value)} type="text" size = 'lg'/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <p></p>
                        <p>* Currency Placement </p>
                        <Row>
                            <Col>
                                <Form.Check 
                                    type="radio" 
                                    id="before" 
                                    name="placement" 
                                    label="Before Amount"
                                    onChange={(e)=>onCheck(e)}
                                />
                            </Col>
                            <Col>
                                <Form.Check
                                    type="radio"
                                    id="after"
                                    name="placement"
                                    label="After Amount"
                                    onChange={(e)=>onCheck(e)}
                                />
                            </Col>
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

export default NewOne
