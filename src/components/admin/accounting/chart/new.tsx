import { Col, Portlet, Nav, Row, Tab, Button, Form, InputGroup} from '@blueupcode/components'
import axios from 'axios'
import { toast } from 'components/sweetalert2/instance'
import { parseCookies } from 'nookies'
import React from 'react'
import Select from 'react-select'
import { Admin_Accounting_Chart_ADD, Admin_Accounting_Chart_GetAll} from 'utils/adminUrl'

const isEmpty = require('utils/is-empty')

const NewOne = () => {
    
    const cookies = parseCookies()
    const headers = {"Authorization": cookies.admintoken}

    const [account_type, setAccount_type] = React.useState('')
    const [account_type_detail, setAccount_type_detail] = React.useState('')
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [parent_account, setParent_account] = React.useState()
    const [balance, setBalance] = React.useState(0)
    const [balance_as_of, setBalance_as_of] = React.useState<Date>()

    const [newOne, setNewOne] = React.useState({})
    
    interface Errors {
        account_type: string,
        account_type_detail : string,
        account: string,
        name: string
    }
    const [errors, setErrors] = React.useState<Errors>({account: '', account_type: '', account_type_detail: '', name: ''})
    
    interface Account {
        value: string,
        label : string
    }
    const [accounts, setAccounts] = React.useState<Account[]>([])

    const [selectedOptions, setSelectedOptions] = React.useState();

    const danger = {color: 'red'}

    React.useEffect(() => {
        axios.get(Admin_Accounting_Chart_GetAll + `/1/0`, {headers})
        .then(res => {
            let account = []
            for(let i = 0; i < res.data.all.length; i++)
            {
                account.push({value: res.data.all[i]._id, label: res.data.all[i].name})
            }
            setAccounts(account)
        })
        .catch(err => {
            let error: Errors = {
                account: '',
                account_type: '',
                account_type_detail: '',
                name: ''
            }
            !isEmpty(err.response.data.account) ? error.account = err.response.data.account : ''
            setErrors(error)
        })
    }, [])
    
    React.useEffect(() => {
        setNewOne({account_type,account_type_detail,name,description,balance,balance_as_of,parent_account})
    }, [account_type,account_type_detail,name,description,balance,balance_as_of,parent_account])

    const successAlert = () => {
        toast.fire({
            icon: 'success',
            title: 'Success'
        })
    }

    function handleSelect(data: any) {
        setParent_account(data.value)
    }
    
    const handleSubmit = async () => {
        await axios.post(Admin_Accounting_Chart_ADD, newOne, {headers})
            .then(res => {
                successAlert()
                setErrors({account: '', account_type: '', account_type_detail: '', name: ''})
            })
            .catch(err => {
                let error: Errors = {
                    account_type: '',
                    account_type_detail: '',
                    account: '',
                    name: ''
                }
                console.log(err)
                !isEmpty(err.response.data.account_type) ? error.account_type = err.response.data.account_type : ''
                !isEmpty(err.response.data.account_type_detail)? error.account_type_detail = err.response.data.account_type_detail : ''
                !isEmpty(err.response.data.name)? error.name = err.response.data.name : ''
                setErrors(error)
            })
    }

    return(
        <Row>
            <Col md = "6">
                <Portlet>
                    <Portlet.Header bordered>
                        <Portlet.Addon>
                            <h4>New Account</h4>
                        </Portlet.Addon>
                    </Portlet.Header>
                    <Portlet.Body>
                        <div className="d-grid gap-3">
                            <Form.Group controlId="accounttypeID">
                                <Form.Label>* Account type</Form.Label>
                                <Form.Control onChange={(e) => setAccount_type(e.target.value)} type="text" size = 'lg'/>
                                <p style={danger}>{errors.account_type}</p>
                            </Form.Group>
                            <Form.Group controlId="accounttypedetailID">
                                <Form.Label>* Account type detail</Form.Label>
                                <Form.Control onChange={(e) => setAccount_type_detail(e.target.value)} type="text"  size = 'lg'/>
                                <p style={danger}>{errors.account_type_detail}</p>
                            </Form.Group>
                            <Form.Group controlId="nameID">
                                <Form.Label>* Name</Form.Label>
                                <Form.Control onChange={(e) => setName(e.target.value)} type="text"  size = 'lg'/>
                                <p style={danger}>{errors.name}</p>
                            </Form.Group>
                            <Row>
                                <Col>
                                    <Form.Group controlId="balanceID">
                                        <Form.Label> Balance</Form.Label>
                                        <Form.Control onChange={(e) => setBalance(parseInt(e.target.value))} type="number"  size = 'lg'/>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="balanceasofID">
                                        <Form.Label> as of</Form.Label>
                                        <Form.Control onChange={(e) => setBalance_as_of(new Date(e.target.value))} type="date"  size = 'lg'/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <div className="dropdown-container">
                                <Select
                                    options={accounts}
                                    placeholder="Select Parent Account"
                                    value={selectedOptions}
                                    onChange={handleSelect}
                                    isSearchable={true}
                                    instanceId="unique-account-id"
                                />
                            </div>
                            <Form.Group controlId="descriptionID">
                                <Form.Label>* Description</Form.Label>
                                <Form.Control onChange={(e) => setDescription(e.target.value)} as="textarea" rows={3}/>
                            </Form.Group>
                        </div>
                    </Portlet.Body>
                    <Portlet.Footer bordered align="end">
                        <Button onClick={handleSubmit} type='submit' variant="primary">Submit</Button>
                    </Portlet.Footer>
                </Portlet>
            </Col>
        </Row>
    )
}

export default NewOne
