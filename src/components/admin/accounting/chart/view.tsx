import { Col, Portlet, Nav, Row, Table, Tab, Button, Form, InputGroup} from '@blueupcode/components'
import Select from 'react-select'
import axios from 'axios'
import { toast } from 'components/sweetalert2/instance'
import { parseCookies } from 'nookies'
import React from 'react'
import { Admin_Accounting_Chart_GetOne, Admin_Accounting_Chart_GetAll, Admin_Accounting_Chart_Edit} from 'utils/adminUrl'

const isEmpty = require('utils/is-empty')

const View = (props: any) => {
    
    const id = props.id
    const cookies = parseCookies()
    const headers = {"Authorization": cookies.admintoken}
    const [newOne, setNewOne]= React.useState({})
    const danger = {color : "red"}
    
    const [account_type, setAccount_type] = React.useState('')
    const [account_type_detail, setAccount_type_detail] = React.useState('')
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [parent_account, setParent_account] = React.useState()
    const [balance, setBalance] = React.useState(0)
    const [balance_as_of, setBalance_as_of] = React.useState<Date>()
    
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

    React.useEffect(() => {
        axios.get(Admin_Accounting_Chart_GetOne + `/${id}`, {headers})
            .then(res => {
                setName(res.data.name)
                setAccount_type(res.data.account_type)
                setParent_account(res.data.parent_account)
                setAccount_type_detail(res.data.account_type_detail)
                setBalance_as_of(res.data.balance_as_of)
                setBalance(res.data.balance)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    
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

    function handleValue(data: any) {
        if(isNaN(data)){return 0}
        return data
    }

    const handleSubmit = async () => {
        await axios.put(Admin_Accounting_Chart_Edit + `/${id}`, newOne, {headers})
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

    const handleBalance_as_of = (data: any) => {
        const temp = String(data).slice(0, 9)
        return temp
    }

    return(
        <Row>
            <Col md = "6">
                <Portlet>
                    <Portlet.Body>
                        <div className="d-grid gap-3">
                            <Form.Group controlId="accounttypeID">
                                <Form.Label>* Account type</Form.Label>
                                <Form.Control onChange={(e) => setAccount_type(e.target.value)} defaultValue={account_type} type="text" size = 'lg'/>
                                <p style={danger}>{errors.account_type}</p>
                            </Form.Group>
                            <Form.Group controlId="accounttypedetailID">
                                <Form.Label>* Account type detail</Form.Label>
                                <Form.Control onChange={(e) => setAccount_type_detail(e.target.value)} defaultValue={account_type_detail} type="text"  size = 'lg'/>
                                <p style={danger}>{errors.account_type_detail}</p>
                            </Form.Group>
                            <Form.Group controlId="nameID">
                                <Form.Label>* Name</Form.Label>
                                <Form.Control onChange={(e) => setName(e.target.value)} defaultValue={name} type="text" size = 'lg'/>
                            </Form.Group>
                            <Row>
                                <Col>
                                    <Form.Group controlId="balanceID">
                                        <Form.Label> Balance</Form.Label>
                                        <Form.Control onChange={(e) => setBalance(parseInt(e.target.value))} value={handleValue(balance)} type="Number"  size = 'lg'/>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="balanceasofID">
                                        <Form.Label> as of : {handleBalance_as_of(balance_as_of)}</Form.Label>
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
                                <Form.Control onChange={(e) => setDescription(e.target.value)} defaultValue={description} as="textarea" rows={3}/>
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

export default View
