import { Col, Portlet, Nav, Row, Tab, Button, Form, InputGroup} from '@blueupcode/components'
import Select from 'react-select'
import axios from 'axios'
import { swal, toast } from 'components/sweetalert2/instance'
import { parseCookies } from 'nookies'
import React from 'react'
import { Admin_Client_Get, Admin_Project_ADD, Admin_Staff_GetAll } from 'utils/adminUrl'

const isEmpty = require('utils/is-empty')

const NewOne = () => {
    
    const cookies = parseCookies()
    const headers = {"Authorization": cookies.admintoken}
    const [newOne, setNewOne] = React.useState({})
    
    interface Errors {
        name: string,
        status : string,
        billing_type: string,
        start_date: string
    }
    const [errors, setErrors] = React.useState<Errors>({name: '', status: '', billing_type: '', start_date: ''})

    const danger = {color: 'red'}

    const [name, setName] = React.useState('')
    const [client, setClient] = React.useState('')
    const [billing_type, setBilling_type] = React.useState('')
    const [status, setStatus] = React.useState('')
    const [project_cost, setProject_cost] = React.useState(1)
    const [estimated_hours, setEstimated_hours] = React.useState(0)
    const [staffs, setStaffs] = React.useState([''])
    const [start_date, setStart_date] = React.useState<Date>()
    const [deadline, setDeadline] = React.useState<Date>()
    const [description, setDescription] = React.useState('')
    
    interface Clients {
        value: string,
        label : string
    }
    const [clients, setClients] = React.useState<Clients[]>([])
    interface StaffsAll {
        value: string,
        label : string
    }
    const [staffsAll, setStaffsAll] = React.useState<StaffsAll[]>([])

    React.useEffect(() => {
        axios.get(Admin_Client_Get, {headers})
            .then(res => {
                let temp = []
                for(let i = 0; i < res.data.data.length; i++)
                {
                    temp.push({value: res.data.data[i]._id, label: res.data.data[i].company})
                }
                setClients(temp) 
                setClient(res.data.data[0]._id)
            })
            .catch(err => console.log(err))
    }, [])

    React.useEffect(() => {
        axios.get(Admin_Staff_GetAll + `/1/0/search:/sort:1`, {headers})
            .then(res => {
                let temp = []
                for(let i = 0; i < res.data.all.length; i++)
                {
                    temp.push({value: res.data.all[i]._id, label: res.data.all[i].firstname})
                }
                setStaffsAll(temp)
            })
            .catch(err => console.log(err))
    }, [])
    
    React.useEffect(() => {
        setNewOne({name, client, start_date, deadline, billing_type, status, project_cost, estimated_hours, staffs, description})
    }, [name, client, start_date, deadline, billing_type, status, project_cost, estimated_hours, staffs.length, description])

    const successAlert = () => {
        toast.fire({
            icon: 'success',
            title: 'Success!'
        })
    }
    
    const handleSubmit = async () => {
        await axios.post(Admin_Project_ADD, newOne, {headers})
            .then(res => {
                successAlert()
                setErrors({name: '', status: '', billing_type: '', start_date: ''})
            })
            .catch(err => {
                let error : Errors= {name: '', status: '', billing_type: '', start_date: ''}
                !isEmpty(err.response.data.name) ? error.name = err.response.data.name : ''
                !isEmpty(err.response.data.status)? error.status = err.response.data.status : ''
                !isEmpty(err.response.data.billing_type) ? error.billing_type = err.response.data.billing_type : ''
                !isEmpty(err.response.data.start_date) ? error.start_date = err.response.data.start_date : ''
                setErrors(error)
            })
    }

    function selectStaff(data: any) {
        let temp = []
        for(let i = 0; i < data.length; i++){
            temp.push(data[i].value)
        }
        setStaffs(temp)
    }

    function selectClient(data: any) {
        setClient(data.value)
    }

    const handleDate = (data: any) => {
        const temp = String(data).slice(0, 9)
        return temp
    }

    return(
        <Row>
            <Col md = "2"></Col>
            <Col md = "8">
                <Tab.Container defaultActiveKey="project">
                    <Portlet>
                        <Portlet.Header bordered>
                            <Portlet.Addon>
                                {/* BEGIN Nav */}
                                <Nav variant="lines" portlet>
                                    <Nav.Item>
                                        <Nav.Link eventKey="project">* Project</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Portlet.Addon>
                            <Portlet.Addon>
                                <Nav variant="lines" portlet>
                                    <Nav.Item>
                                        <Nav.Link eventKey="projectsetting">* Project Settings</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                {/* END Nav */}
                            </Portlet.Addon>
                        </Portlet.Header>
                        <Portlet.Body>
                            {/* BEGIN Tabs */}
                            <Tab.Content>
                                <Tab.Pane eventKey="project">
                                    <Portlet>
                                        <Portlet.Body>
                                            <Row>
                                                <Col md="2">
                                                </Col>
                                                <Col md="8">
                                                    <div className="d-grid gap-3">
                                                        <Form.Group controlId="nameID">
                                                            <Form.Label>*Project Name</Form.Label>
                                                            <Form.Control onChange={(e) => setName(e.target.value)} type="text" size = 'lg'/>
                                                            <p style={danger}>{errors.name}</p>
                                                        </Form.Group>
                                                        <div className="dropdown-container">
                                                            <Select
                                                                options={clients}
                                                                placeholder="Select Client"
                                                                onChange={selectClient}
                                                                isSearchable={true}
                                                                instanceId="unique-client-id"
                                                            />
                                                        </div>
                                                        <Form.Group controlId="billingtypeID">
                                                            <Form.Label>*Billing type</Form.Label>
                                                            <Form.Select onChange={(e) => setBilling_type(e.target.value)} size="lg">
                                                                <option value="Fixed Rate">Fixed Rate</option>
                                                                <option value="Project Hours">Project Hours</option>
                                                                <option value="Task Hours">Task Hours</option>  
                                                            </Form.Select>
                                                            <p style={danger}>{errors.billing_type}</p>
                                                        </Form.Group>
                                                        <Form.Group controlId="statusID">
                                                            <Form.Label>*Status</Form.Label>
                                                            <Form.Select onChange={(e) => setStatus(e.target.value)} size="lg">
                                                                <option value="Not Started">Not Started</option>
                                                                <option value="In Progress">In Progress</option>
                                                                <option value="On Hold">On Hold</option>  
                                                                <option value="Cancelled">Cancelled</option>
                                                                <option value="Finished">Finished</option>
                                                            </Form.Select>
                                                            <p style={danger}>{errors.status}</p>
                                                        </Form.Group>
                                                        <Row>
                                                            <Col>
                                                                <Form.Group controlId="totalrateID">
                                                                    <Form.Label>*Total Rate</Form.Label>
                                                                    <Form.Control onChange={(e) => setProject_cost(parseInt(e.target.value))}  type="Number" size = 'lg'/>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col>
                                                                <Form.Group controlId="estimatedhoursID">
                                                                    <Form.Label>*Estimated Hours</Form.Label>
                                                                    <Form.Control onChange={(e) => setEstimated_hours(parseInt(e.target.value))}  type="Number" size = 'lg'/>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col>
                                                                <Form.Group controlId="startdateID">
                                                                    <Form.Label>*Start Date</Form.Label>
                                                                    <Form.Control onChange={(e) => setStart_date(new Date(e.target.value))}  type="date"  size = 'lg'/>
                                                                </Form.Group>
                                                                <p style={danger}>{errors.start_date}</p>
                                                            </Col>
                                                            <Col>
                                                                <Form.Group controlId="deadlineID">
                                                                    <Form.Label>*Deadline</Form.Label>
                                                                    <Form.Control onChange={(e) => setDeadline(new Date(e.target.value))}  type="date"  size = 'lg'/>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                        <div className="dropdown-container">
                                                            <Select
                                                                options={staffsAll}
                                                                placeholder="Select Staff"
                                                                onChange={selectStaff}
                                                                isSearchable={true}
                                                                instanceId="unique-staff-id"
                                                                isMulti
                                                            />
                                                        </div>
                                                        <Form.Group controlId="descriptionID">
                                                            <Form.Label>*Description</Form.Label>
                                                            <Form.Control onChange={(e) => setDescription(e.target.value)} as="textarea" rows={3}/>
                                                        </Form.Group>
                                                    </div>
                                                </Col>
                                                <Col md="2">
                                                </Col>
                                            </Row>
                                        </Portlet.Body>
                                    </Portlet>
                                </Tab.Pane>
                                <Tab.Pane eventKey="projectsetting">
                                    <Portlet>
                                        <Portlet.Body>
                                            <p>Have not yet</p>
                                        </Portlet.Body>
                                    </Portlet>
                                </Tab.Pane>
                            </Tab.Content>
                            {/* END Tabs */}
                        </Portlet.Body>
                        <Portlet.Footer bordered align="end">
                            <Button onClick={handleSubmit} type='submit' variant="primary">Submit</Button>
                        </Portlet.Footer>
                    </Portlet>
                </Tab.Container>
            </Col>
            <Col md = "2"></Col>
        </Row>
    )
}

export default NewOne
