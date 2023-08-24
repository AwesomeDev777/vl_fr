import { Col, Portlet, Nav, Row, Table, Tab, Button, Form, InputGroup} from '@blueupcode/components'
import axios from 'axios'
import { toast } from 'components/sweetalert2/instance'
import { parseCookies } from 'nookies'
import React from 'react'
import { Eye } from 'react-feather'
import { Admin_Contact_Edit, Admin_Contact_GetOne } from 'utils/adminUrl'

const isEmpty = require('utils/is-empty')

const View = (props: any) => {

    const cookies = parseCookies()
    const headers = {"Authorization": cookies.admintoken}
    const id = props.id
    interface Errors {
        email: any,
        password: any,
        firstname: any,
        lastname: any,
        phonenumber: any,
        contact: any
    }
    const [errors, setErrors] = React.useState<Errors>({email: '',password: '',firstname: '',lastname: '',phonenumber: '', contact: ''})
    
    const danger = {color: 'red'}
    
    let [email, setEmail] = React.useState('')
    let [firstname, setFirstname] = React.useState('')
    let [lastname, setLastname] = React.useState('')
    let [phonenumber, setPhonenumber] = React.useState('')
    let [direction, setDirection] = React.useState('none')
    let [password, setPassword] = React.useState('')
    let [isprimary, setIsprimary] = React.useState(false)
    let [newOne, setNewOne] = React.useState({})
    
    let [passwordtype, setPasswordtype] = React.useState('password')
    let [eye, setEye] = React.useState(true)
    
    React.useEffect(() => {
        axios.get(Admin_Contact_GetOne + `/${id}`, {headers})
            .then(res => {
                setEmail(res.data.email)
                setFirstname(res.data.firstname)
                setLastname(res.data.lastname)
                setPhonenumber(res.data.phonenumber)
                setDirection(res.data.direction)
                setIsprimary(res.data.isprimary)
            })
            .catch(err => {
                let error : Errors = {email: '',password: '',firstname: '',lastname: '',phonenumber: '', contact: ''}
                error.contact = err.response.data.contact
                setErrors(error);
            })
    }, [])

    React.useEffect(() => {
        setNewOne({email,firstname,lastname,phonenumber,isprimary,direction})
    }, [email,firstname,lastname,phonenumber,direction,isprimary])
    
    React.useEffect(() => {
        if (eye) {setPasswordtype('password') }
        else {setPasswordtype('text')}
    }, [eye])

    const successAlert = () => {
        toast.fire({
            icon: 'success',
            title: 'Success!'
        })
    }

    const handleEdit = async () => {
        await axios.put(Admin_Contact_Edit + `/${id}`, newOne, {headers})
            .then(res => {
                successAlert()
                setErrors({email: '',password: '',firstname: '',lastname: '',phonenumber: '', contact: ''})
            })
            .catch(err => {
                let error : Errors = {email: '',password: '',firstname: '',lastname: '',phonenumber: '', contact: ''}
                !isEmpty(err.response.data.email) ? error.email = err.response.data.email : ''
                !isEmpty(err.response.data.password)? error.password = err.response.data.password : ''
                !isEmpty(err.response.data.firstname) ? error.firstname = err.response.data.firstname : ''
                !isEmpty(err.response.data.lastname) ? error.lastname = err.response.data.lastname : ''
                !isEmpty(err.response.data.phonenumber) ? error.phonenumber = err.response.data.phonenumber : ''
                setErrors(error)
            })
    }

    const change = (e: any) => {
        setIsprimary(e.target.checked) 
    }

    return(
        <Portlet>
            <Portlet.Body>            
                <Form.Group controlId="emailID">
                    <Form.Label>*Email Address</Form.Label>
                    <Form.Control onChange={(e) => setEmail(e.target.value)} defaultValue={email} type="email" size = 'lg'/>
                    <p style={danger}>{errors.email}</p>
                </Form.Group>
                <Form.Group controlId="firstnameID">
                    <Form.Label>*First Name</Form.Label>
                    <Form.Control onChange={(e) => setFirstname(e.target.value)} defaultValue={firstname} type="text"  size = 'lg'/>
                    <p style={danger}>{errors.firstname}</p>
                </Form.Group>
                <Form.Group controlId="lastnameID">
                    <Form.Label>*Last Name</Form.Label>
                    <Form.Control onChange={(e) => setLastname(e.target.value)} defaultValue={lastname} type="text"  size = 'lg'/>
                    <p style={danger}>{errors.lastname}</p>
                </Form.Group>
                <Form.Group controlId="phonenumberID">
                    <Form.Label>*Phone Number</Form.Label>
                    <Form.Control onChange={(e) => setPhonenumber(e.target.value)} defaultValue={phonenumber} type="text" size = 'lg'/>
                </Form.Group>
                <p></p>
                <Form.Group controlId="directionID">
                    <Form.Label>*Direction</Form.Label>
                    <Form.Select onChange={(e) => setDirection(e.target.value)} defaultValue="none" size="lg">
                        <option value="none">System Default</option>
                        <option value="ltr">LTR</option>
                        <option value="rtl">RTL</option>
                    </Form.Select>
                </Form.Group>
                <p></p>
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
                <Form.Check 
                    type="checkbox" 
                    label= "Primary Contact"
                    defaultChecked={isprimary}
                    onChange={(e) => change(e)}
                />
            </Portlet.Body>
            <Portlet.Header>
                <Button onClick={handleEdit} type='submit' variant="primary">Submit</Button>
            </Portlet.Header>
        </Portlet>
    )
}

export default View
