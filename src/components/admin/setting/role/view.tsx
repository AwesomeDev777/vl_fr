import { Col, Portlet, Nav, Row, Table, Tab, Button, Form, InputGroup} from '@blueupcode/components'
import axios from 'axios'
import { toast } from 'components/sweetalert2/instance'
import { parseCookies } from 'nookies'
import React from 'react'
import { Admin_Role_GetOne, Admin_Role_Edit } from 'utils/adminUrl'

const isEmpty = require('utils/is-empty')

const View = (props: any) => {
    
    const cookies = parseCookies()
    const headers = {"Authorization": cookies.admintoken}
    const id = props.id
    const [error, setError] = React.useState('')
    const [permissions, setPermissions] = React.useState('')
    const [name, setName] = React.useState('')
    interface Role {
        [key: string]: any
    }
    interface Permission {
        [key: string]: any
    }
    const [contract, setContract] = React.useState<Role>([{View_Own:false},{View_Global:false},{Create:false},{Edit:false},{Delete:false}])
    const [staff, setStaff] = React.useState<Role>([{View_Global:false},{Create:false},{Edit:false},{Delete:false}])
    const [permissionsParam, setPermissionsParam] = React.useState<Permission>([])
    const [contractChange, setContractChange] = React.useState(0.1)
    const [staffChange, setStaffChange] = React.useState(0.1)
    const danger = {color : "red"}
    
    React.useEffect(() => {
        axios.get(Admin_Role_GetOne + `/${id}`, {headers})
            .then(async res => {
                setName(res.data.name)
                let param = Object.entries(JSON.parse(res.data.permissions))
                setPermissionsParam(param)
                setContract(Object(param[0][1]))
                setStaff(Object(param[1][1]))
            })
            .catch(err => {
                console.log(err.response.data.role)
            })
    }, [])

    React.useEffect(() => {
        setPermissions(JSON.stringify({contract, staff}))
    }, [contractChange, staffChange])

    const successAlert = () => {
        toast.fire({
            icon: 'success',
            title: 'Success!'
        })
    }
    
    const handleSubmit = async () => {
        const newOne = {name, permissions}
        await axios.put(Admin_Role_Edit + `/${id}`, newOne, {headers})
            .then(res => {
                successAlert()
                setError('')
            })
            .catch(err => {
                setError(err.response.data.role)
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
                            <h4>{name}</h4>
                            <p style={danger}>{error}</p>
                        </Portlet.Addon>
                    </Portlet.Header>
                    <Portlet.Body>
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
                                {
                                    permissionsParam.map((param: any) => (
                                        <tr key={param[0]}>
                                            <td>
                                                {param[0]}
                                            </td>
                                            <td>
                                                {
                                                    param[1].map((capability: any)=> (
                                                        <Form.Check type="checkbox" key={param[0]+Object.keys(capability)} id={param[0]+Object.keys(capability)} checked = {Boolean(Object.values(capability)[0])} name={String(Object.keys(capability))} onChange={(e) => change(e, param[0])} label={Object.keys(capability)}/>
                                                    ))
                                                }
                                                
                                            </td>
                                        </tr>
                                    ))
                                }
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

export default View
