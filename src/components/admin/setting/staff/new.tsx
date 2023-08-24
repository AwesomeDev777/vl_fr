import { Col, Portlet, Nav, Row, Tab, Button, Form, InputGroup, Modal} from '@blueupcode/components'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import * as fs from 'fs'
import { swal, toast } from 'components/sweetalert2/instance'
import { parseCookies } from 'nookies'
import React from 'react'
import { Eye } from 'react-feather'
import { Admin_Department_GetAll, Admin_Role_GetAll, Admin_Staff_ADD, Admin_Staff_Profile_Image } from 'utils/adminUrl'

const isEmpty = require('utils/is-empty')

const NewOne = () => {
    
    const cookies = parseCookies()
    const headers = {"Authorization": cookies.admintoken}

    const [id, setId] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [firstname, setFirstname] = React.useState('')
    const [lastname, setLastname] = React.useState('')
    const [hourly_rate, setHourly_rate] = React.useState(0.0)
    const [phonenumber, setPhonenumber] = React.useState('')
    const [facebook, setFacebook] = React.useState('')
    const [linkedin, setLinkedin] = React.useState('')
    const [skype, setSkype] = React.useState('')
    const [default_language, setDefault_language] = React.useState('none')
    const [email_signature, setEmail_signature] = React.useState('')
    const [direction, setDirection] = React.useState('none')
    const [role, setRole] = React.useState<String>()
    const [departments, setDepartments] = React.useState<String[]>([])
    const [password, setPassword] = React.useState('')
    const [preImagePath, setPreImagePath] = React.useState('')
    const [newOne, setNewOne] = React.useState({})
    
    const [passwordtype, setPasswordtype] = React.useState('password')
    const [eye, setEye] = React.useState(true)
    interface Errors {
        department: any,
        role: any,
        email: any,
        password: any,
        firstname: any,
        lastname: any,
    }
    const [errors, setErrors] = React.useState<Errors>({department: '', role: '', email: '', password: '', firstname: '', lastname: ''})
    const [alldepartments, setAllDepartments] = React.useState([])
    const [roles, setRoles] = React.useState([])
    
    
    let [show, setShow] = React.useState(false)
    const handleHide = () => setShow(false)
    // const handleShow = () => setShow(true)
    const [image, setImage] = React.useState<File>();

    const danger = {color: 'red'}

    React.useEffect(() => {
        axios.get(Admin_Department_GetAll + `/1/0`, {headers})
        .then(res => {
            setAllDepartments(res.data.all)
        })
        .catch(err => {
            let error : Errors= {department: '', role: '', email: '', password: '', firstname: '', lastname: ''}
            !isEmpty(err.response.data.department) ? error.department = err.response.data.department : ''
            setErrors(error)
        })
    }, [])

    React.useEffect(() => {
        axios.get(Admin_Role_GetAll + `/1/0`, {headers})
        .then(res => {
            setRoles(res.data.all)
            setRole(res.data.all[0]._id)
        })
        .catch(err => {
            let error : Errors= {department: '', role: '', email: '', password: '', firstname: '', lastname: ''}
            !isEmpty(err.response.data.role) ? error.role = err.response.data.role : ''
            setErrors(error)
        })
    }, [])
    
    React.useEffect(() => {
        setNewOne({email,firstname,lastname,hourly_rate,phonenumber,facebook,linkedin,skype,default_language,email_signature,direction,password,departments,role})
    }, [email,firstname,lastname,hourly_rate,phonenumber,facebook,linkedin,skype,default_language,email_signature,direction,password,departments.length,role])
    
    React.useEffect(() => {
        if (eye) {setPasswordtype('password') }
        else {setPasswordtype('text')}
    }, [eye])

    const successAlert = () => {
        toast.fire({
            icon: 'success',
            title: 'Success'
        })
    }

    const errorAlert = () => {
        toast.fire({
            icon: 'error',
            title: 'Error exists. Maybe not Image file'
        })
    }

    const change = (e: String) => {
        let department = departments
        console.log(department)
        if(department.indexOf(e) > -1) { department.splice(department.indexOf(e), 1) }
        else{department.push(e)}
        setDepartments(department) 
    }
    
    const handleSubmit = async () => {
        await axios.post(Admin_Staff_ADD, newOne, {headers})
            .then(res => {
                successAlert()
                setId(res.data._id)
                setPreImagePath('')
                setShow(true)
            })
            .catch(err => {
                let error : Errors= {department: '', role: '', email: '', password: '', firstname: '', lastname: ''}
                !isEmpty(err.response.data.email) ? error.email = err.response.data.email : ''
                !isEmpty(err.response.data.password)? error.password = err.response.data.password : ''
                !isEmpty(err.response.data.firstname) ? error.firstname = err.response.data.firstname : ''
                !isEmpty(err.response.data.lastname) ? error.lastname = err.response.data.lastname : ''
                setErrors(error)
            })
    }

    const uploadToClient = (e: any) => {
        if (e.target.files && e.target.files[0]) {
            const i = e.target.files[0];
            setImage(i);
        }
    }
    
    const uploadToServer = async () => {        
        const body = new FormData()
        if(image != null)
        {
            body.append("file", image)  
            await fetch("/api/upload", {
                method: "POST",
                body
            }).then(res => res.json())
            .then(async data=>{ 
                if(!isEmpty(data.error) || isEmpty(data.filename))
                {
                    errorAlert()
                } else{
                    if(!isEmpty(preImagePath))
                    {
                        let body = new FormData()
                        body.append("text", preImagePath)
                        const response = await fetch("/api/upload/remove", {
                            method: "POST",
                            body
                        })
                    }
                    handleImage(data.filename) 
                }
            })
        }
    };

    const handleImage = async (data: any) => {
        if(data !== null && data !== ''){
            await axios.put(Admin_Staff_Profile_Image + `/${id}`, {profile_image: data}, {headers})
            .then(res => {
                successAlert()
                setPreImagePath(data)
            })
            .catch(err => {
                console.log(err)
                let error = {}
                // !isEmpty(err.response.data.image) ? error.image = err.response.data.image : ''
                // setErrors(error)
            })
        }else{
            errorAlert()
        }
    }

    return(
        <Row>
            <Col md = "6">
                <Portlet>
                    <Portlet.Header bordered>
                        <Portlet.Addon>
                            <h4>New Member</h4>
                        </Portlet.Addon>
                    </Portlet.Header>
                    <Portlet.Body>
                        <Row>
                            <Col md="2"></Col>
                            <Col md="8">
                                <div className="d-grid gap-3">
                                    <Form.Group controlId="emailID">
                                        <Form.Label>*Email Address</Form.Label>
                                        <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" size = 'lg'/>
                                        <p style={danger}>{errors.email}</p>
                                    </Form.Group>
                                    <Form.Group controlId="firstnameID">
                                        <Form.Label>*First Name</Form.Label>
                                        <Form.Control onChange={(e) => setFirstname(e.target.value)} type="text"  size = 'lg'/>
                                        <p style={danger}>{errors.firstname}</p>
                                    </Form.Group>
                                    <Form.Group controlId="lastnameID">
                                        <Form.Label>*Last Name</Form.Label>
                                        <Form.Control onChange={(e) => setLastname(e.target.value)} type="text"  size = 'lg'/>
                                        <p style={danger}>{errors.lastname}</p>
                                    </Form.Group>
                                    <Form.Group controlId="hourlyrateID">
                                        <Form.Label>*Hourly Rate</Form.Label>
                                        <Form.Control onChange={(e) => setHourly_rate(parseInt(e.target.value))} type="number"  size = 'lg'/>
                                    </Form.Group>
                                    <Form.Group controlId="phonenumberID">
                                        <Form.Label>*Phone Number</Form.Label>
                                        <Form.Control onChange={(e) => setPhonenumber(e.target.value)} type="text" size = 'lg'/>
                                    </Form.Group>
                                    <Form.Group controlId="facebookID">
                                        <Form.Label>*Facebook</Form.Label>
                                        <Form.Control onChange={(e) => setFacebook(e.target.value)}  type="text"  size = 'lg'/>
                                    </Form.Group>
                                    <Form.Group controlId="linkedinID">
                                        <Form.Label>*Linkedin</Form.Label>
                                        <Form.Control onChange={(e) => setLinkedin(e.target.value)}  type="text"  size = 'lg'/>
                                    </Form.Group>
                                    <Form.Group controlId="skypeID">
                                        <Form.Label>*Skype</Form.Label>
                                        <Form.Control onChange={(e) => setSkype(e.target.value)}  type="text"  size = 'lg'/>
                                    </Form.Group>
                                    <Form.Group controlId="defaultlangID">
                                        <Form.Label>*Default Language</Form.Label>
                                        <Form.Select onChange={(e) => setDefault_language(e.target.value)} defaultValue="none" size="lg">
                                            <option value="none">System Default</option>
                                            <option value="English">English</option>
                                            <option value="Germany">Germany</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group controlId="emailsignatureID">
                                        <Form.Label>*Email Signature</Form.Label>
                                        <Form.Control onChange={(e) => setEmail_signature(e.target.value)} as="textarea" rows={3}/>
                                    </Form.Group>
                                    <Form.Group controlId="directionID">
                                        <Form.Label>*Direction</Form.Label>
                                        <Form.Select onChange={(e) => setDirection(e.target.value)} defaultValue="none" size="lg">
                                            <option value="none">System Default</option>
                                            <option value="ltr">LTR</option>
                                            <option value="rtl">RTL</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group controlId="departmentsID">
                                        {
                                            alldepartments.map((department: any) => (
                                                <Form.Check 
                                                    type="checkbox" 
                                                    key={department._id} 
                                                    id = {department._id} 
                                                    name = {department._id} 
                                                    label={department.name} 
                                                    onChange={(e) => change(e.target.name)}
                                                />
                                            ))
                                        }
                                    </Form.Group>
                                    <Form.Group controlId="roleID">
                                        <Form.Label>*Role</Form.Label>
                                        <Form.Select onChange={(e) => setRole(e.target.value)} size="lg">
                                            {
                                                roles.map((roleName: any) =>(
                                                    <option key={roleName._id} value={roleName._id}>{roleName.name}</option>
                                                ))
                                            }
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group controlId="passwordID">
                                        <Form.Label>*Password</Form.Label>
                                        <InputGroup>
                                            <Form.Control type={passwordtype} onChange={(e) => setPassword(e.target.value)} size = 'lg'/>
                                            <Button variant="outline-info" onClick={()=> setEye(!eye)} size = 'lg' icon>
                                                <Eye />
                                            </Button>
                                        </InputGroup>
                                        <p style={danger}>{errors.password}</p>
                                    </Form.Group>
                                </div>
                            </Col>
                            <Col md="2"></Col>
                        </Row>
                    </Portlet.Body>
                    <Portlet.Footer bordered align="end">
                        <Button onClick={handleSubmit} type='submit' variant="primary">Submit</Button>
                        <Modal scrollable show={show} onHide={handleHide}>
                            <Modal.Header>
                                <Modal.Title>Profile Image</Modal.Title>
                                <Button icon variant="label-danger" onClick={handleHide}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </Button>
                            </Modal.Header>
                            <Modal.Body>
                                <Form.Group controlId="formFile">
                                    <Form.Label></Form.Label>
                                    <Form.Control type="file" onChange={(e) => uploadToClient(e)}/>
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>                    
                                <Button onClick={uploadToServer} type='submit' variant="primary">Submit</Button>
                            </Modal.Footer>
                        </Modal>
                    </Portlet.Footer>
                </Portlet>
            </Col>
        </Row>
    )
}

export default NewOne
