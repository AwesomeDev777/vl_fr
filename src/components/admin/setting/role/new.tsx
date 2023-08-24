import { Col, Portlet, Nav, Row, Table, Tab, Button, Form, InputGroup} from '@blueupcode/components'
import axios from 'axios'
import { toast } from 'components/sweetalert2/instance'
import { parseCookies } from 'nookies'
import React from 'react'
import { Admin_Role_ADD } from 'utils/adminUrl'

const isEmpty = require('utils/is-empty')

const NewOne = () => {
    
    const cookies = parseCookies()
    const headers = {"Authorization": cookies.admintoken}

    const [name, setName] = React.useState('')
    const [permissions, setPermissions] = React.useState('')
    interface Contract {
        [key: string]: any
    }
    interface Staff {
        [key: string]: any
    }
    const [contract, setContract] = React.useState<Contract>([{View_Own:false},{View_Global:false},{Create:false},{Edit:false},{Delete:false}])
    const [staff, setStaff] = React.useState<Staff>([{View_Global:false},{Create:false},{Edit:false},{Delete:false}])
    const [contractChange, setContractChange] = React.useState(0.1)
    const [staffChange, setStaffChange] = React.useState(0.1)
    interface Errors {
        name: any,
    }
    const [errors, setErrors] = React.useState<Errors>({name: ''})
    const danger = {color : "red"}
    
    React.useEffect(() => {
        setPermissions(JSON.stringify({contract, staff}))
    }, [name, contractChange, staffChange])

    const successAlert = () => {
        toast.fire({
            icon: 'success',
            title: 'Success!'
        })
    }
    
    const handleSubmit = async () => {
        const newOne = {name, permissions}
        await axios.post(Admin_Role_ADD, newOne, {headers})
            .then(res => {
                successAlert()
            })
            .catch(err => {
                let error = {name: ''}
                !isEmpty(err.response.data.name)? error.name = err.response.data.name : ''
                setErrors(error);
            })
    }

    const change = (e: any, f: any) => {
        switch(f) {
            case 'contract':
                let newContract = contract
                for(let i= 0; i < newContract.length; i++)
                {
                    if(Object.keys(newContract[i]) == e.target.name)
                    {
                        newContract[i][e.target.name] = !newContract[i][e.target.name]
                    }
                }
                setContract(newContract)
                setContractChange(Math.random())
                break
            case 'staff':
                let newStaff = staff
                for(let i= 0; i < newStaff.length; i++)
                {
                    if(Object.keys(newStaff[i]) == e.target.name)
                    {
                        newStaff[i][e.target.name] = !newStaff[i][e.target.name]
                    }
                }
                setStaff(newStaff)
                setStaffChange(Math.random())
                break
            default:
                break
        }
    }

    return(
        <Row>
            <Col md = "6">
                <Portlet>
                    <Portlet.Header bordered>
                        <Portlet.Addon>
                            <h4>* New Role</h4>
                        </Portlet.Addon>
                    </Portlet.Header>
                    <Portlet.Body>
                        <Form.Group controlId="nameID">
                            <Form.Label>* Role Name</Form.Label>
                            <Form.Control onChange={(e) => setName(e.target.value)} type="text" size = 'lg'/>
                            <p style={danger}>{errors.name}</p>
                        </Form.Group>
                        <p></p>
                        <Table bordered>
                            <thead>
                                <tr>
                                    <th>
                                        Feature
                                    </th>
                                    <th>
                                        Capabilities
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
									<td >Contract</td>
									<td>
                                        <Form.Check type="checkbox" id="cntown" name="View_Own" onChange={(e) => change(e, "contract")} label="View (Own)"/>
                                        <Form.Check type="checkbox" id="cntglobal" name="View_Global" onChange={(e) => change(e, "contract")} label="View (Global)"/>
                                        <Form.Check type="checkbox" id="cntcreate" name="Create" onChange={(e) => change(e, "contract")} label="Create"/>
                                        <Form.Check type="checkbox" id="cntEdit" name="Edit" onChange={(e) => change(e, "contract")} label="Edit"/>
                                        <Form.Check type="checkbox" id="cntDelete" name="Delete" onChange={(e) => change(e, "contract")} label="Delete"/>
                                    </td>
								</tr>
                                <tr>
									<td>Staff</td>
									<td>
                                        <Form.Check type="checkbox" id="staffglobal" name="View_Global" onChange={(e) => change(e, "staff")} label="View (Global)"/>
                                        <Form.Check type="checkbox" id="staffCreate" name="Create" onChange={(e) => change(e, "staff")} label="Create"/>
                                        <Form.Check type="checkbox" id="staffEdit" name="Edit" onChange={(e) => change(e, "staff")} label="Edit"/>
                                        <Form.Check type="checkbox" id="staffDelete" name="Delete" onChange={(e) => change(e, "staff")} label="Delete"/>
                                    </td>
								</tr>
                            </tbody>
                        </Table>
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
