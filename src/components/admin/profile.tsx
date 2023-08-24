import { Col, Portlet, Nav, Row, Table, Tab, Button, Form, InputGroup} from '@blueupcode/components'
import axios from 'axios'
import { toast } from 'components/sweetalert2/instance'
import { parseCookies } from 'nookies'
import React from 'react'
import Image from 'next/image'
import { Admin_Staff_GetOne, Admin_Staff_Edit, Admin_Department_GetAll, Admin_Staff_Profile_Image, Admin_Staff_Password } from 'utils/adminUrl'

const isEmpty = require('utils/is-empty')

const View = (props: any) => {
    
    const cookies = parseCookies()
    const headers = {"Authorization": cookies.admintoken}
    const id = props.id
    interface Errors {
        staff: any,
        department: any,
        email: any,
        firstname: any,
        lastname: any,
        oldpassword: any,
        confirmpassword: any,
        newpassword: any,
        image: any
    }
    const [errors, setErrors] = React.useState<Errors>({staff: '', image: '', department: '', email: '', firstname: '', lastname: '', oldpassword: '', confirmpassword: '', newpassword: ''})
    const [newOne, setNewOne]= React.useState({})
    const [password, setPassword]= React.useState({})
    
    const [email, setEmail] = React.useState('')
    const [firstname, setFirstname] = React.useState('')
    const [lastname, setLastname] = React.useState('')
    const [hourly_rate, setHourly_rate] = React.useState(0)
    const [phonenumber, setPhonenumber] = React.useState('')
    const [facebook, setFacebook] = React.useState('')
    const [linkedin, setLinkedin] = React.useState('')
    const [skype, setSkype] = React.useState('')
    const [default_language, setDefault_language] = React.useState('none')
    const [email_signature, setEmail_signature] = React.useState('')
    const [direction, setDirection] = React.useState('none')
    const [departments, setDepartments] = React.useState<String[]>([])
    const [profile_image, setProfile_image] = React.useState('')
    const [alldepartments, setAllDepartments] = React.useState([])
    
    
    const [oldpassword, setOldPassword] = React.useState('')
    const [newpassword, setNewPassword] = React.useState('')
    const [confirmpassword, setConfirmPassword] = React.useState('')

    const danger = {color : "red"}
    
    const [image, setImage] = React.useState(null);

    React.useEffect(() => {
        axios.get(Admin_Staff_GetOne + `/${id}`, {headers})
            .then(res => {
                setEmail(res.data.email)
                setFirstname(res.data.firstname)
                setLastname(res.data.lastname)
                setHourly_rate(res.data.hourly_rate)
                setPhonenumber(res.data.phonenumber)
                setFacebook(res.data.facebook)
                setLinkedin(res.data.linkedin)
                setSkype(res.data.skype)
                setDefault_language(res.data.default_language)
                setEmail_signature(res.data.email_signature)
                setDirection(res.data.direction)
                setDepartments(res.data.departments)
                setProfile_image(res.data.profile_image)
            })
            .catch(err => {
                let error = {staff: '', image: '', department: '', email: '', firstname: '', lastname: '', oldpassword: '', confirmpassword: '', newpassword: ''}
                error.staff = err.response.data.staff
                setErrors(error);
            })
    }, [])

    React.useEffect(() => {
        axios.get(Admin_Department_GetAll + `/1/0`, {headers})
        .then(res => {
            setAllDepartments(res.data.all)
        })
        .catch(err => {
            let error = {staff: '', image: '', department: '', email: '', firstname: '', lastname: '', oldpassword: '', confirmpassword: '', newpassword: ''}
            !isEmpty(err.response.data.department) ? error.department = err.response.data.department : ''
            setErrors(error)
        })
    }, [])

    React.useEffect(() => {
        setNewOne({email,firstname,lastname,hourly_rate,phonenumber,facebook,linkedin,skype,default_language,email_signature,direction,departments})
    }, [email,firstname,lastname,hourly_rate,phonenumber,facebook,linkedin,skype,default_language,email_signature,direction,departments.length])

    React.useEffect(() => {
        setPassword({oldpassword, confirmpassword, newpassword})
    }, [oldpassword, confirmpassword, newpassword])

    const successAlert = () => {
        toast.fire({
            icon: 'success',
            title: 'Success!'
        })
    }
    
    const errorAlert = () => {
        toast.fire({
            icon: 'error',
            title: 'Error exists. Maybe not Image file'
        })
    }

    const onCheck = (e: any) => {
        let department = departments
        if(department.indexOf(e) > -1) { return true }
        return false
    }
    
    const handleSubmit = async () => {
        await axios.put(Admin_Staff_Edit + `/${id}`, newOne, {headers})
            .then(res => {
                successAlert()
                setErrors({staff: '', image: '', department: '', email: '', firstname: '', lastname: '', oldpassword: '', confirmpassword: '', newpassword: ''})
            })
            .catch(err => {
                let error = {staff: '', image: '', department: '', email: '', firstname: '', lastname: '', oldpassword: '', confirmpassword: '', newpassword: ''}
                !isEmpty(err.response.data.email) ? error.email = err.response.data.email : ''
                !isEmpty(err.response.data.firstname) ? error.firstname = err.response.data.firstname : ''
                !isEmpty(err.response.data.lastname) ? error.lastname = err.response.data.lastname : ''
                setErrors(error)
            })
    }

    const changePassword = async () => {
        await axios.put(Admin_Staff_Password + `/${id}`, password, {headers})
                .then(res => {
                    successAlert()
                    setErrors({staff: '', image: '', department: '', email: '', firstname: '', lastname: '', oldpassword: '', confirmpassword: '', newpassword: ''})
                })
                .catch(err => {
                    let error = {staff: '', image: '', department: '', email: '', firstname: '', lastname: '', oldpassword: '', confirmpassword: '', newpassword: ''}
                    console.log(err.response.data)
                    !isEmpty(err.response.data.oldpassword) ? error.oldpassword = err.response.data.oldpassword : ''
                    !isEmpty(err.response.data.confirmpassword) ? error.confirmpassword = err.response.data.confirmpassword : ''
                    !isEmpty(err.response.data.newpassword) ? error.newpassword = err.response.data.newpassword : ''
                    setErrors(error)
                })
    }

    const DisplayImage = () => {
        const src = '/uploads/profile_images/' + profile_image
        if(profile_image === undefined || isEmpty(profile_image)){
            return (<p>Profile Image does not exsist</p>)
        } else{
            return (
                <Image src={src} width={100} height={100} alt="Avatar image" />
            )
        }
    }

    const uploadToClient = async (e: any) => {
        if (e.target.files && e.target.files[0]) {
            const i = e.target.files[0]
            const body = new FormData()
            body.append("file", i)  
            await fetch("/api/upload", {
                method: "POST",
                body
            }).then(res => res.json())
            .then(async data=>{ 
                if(!isEmpty(data.error) || isEmpty(data.filename))
                {
                    errorAlert()
                } else{
                    if(!isEmpty(profile_image))
                    {
                        let body = new FormData()
                        body.append("text", profile_image)
                        const response = await fetch("/api/upload/remove", {
                            method: "POST",
                            body
                        })
                    }
                    setProfile_image(data.filename) 
                    handleImage(data.filename) 
                }
            })
        }
    }

    const handleImage = async (data: any) => {
        if(data !== null && data !== ''){
            await axios.put(Admin_Staff_Profile_Image + `/${id}`, {profile_image: data}, {headers})
            .then(res => {
                successAlert()
            })
            .catch(err => {
                console.log(err)
                let error = {staff: '', image: '', department: '', email: '', firstname: '', lastname: '', oldpassword: '', confirmpassword: '', newpassword: ''}
                !isEmpty(err.response.data.image) ? error.image = err.response.data.image : ''
                setErrors(error)
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
                            <h4>{firstname + " " + lastname}</h4>
                            <p style={danger}>{errors.staff}</p>
                        </Portlet.Addon>
                    </Portlet.Header>
                    <Portlet.Body>
                        <DisplayImage />
                        <Form.Group controlId="formFile">
                            <Form.Label></Form.Label>
                            <Form.Control type="file" onChange={(e) => uploadToClient(e)}/>
                        </Form.Group>            
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
                        <Form.Group controlId="hourlyrateID">
                            <Form.Label>*Hourly Rate</Form.Label>
                            <Form.Control onChange={(e) => setHourly_rate(parseInt(e.target.value))} defaultValue={hourly_rate} type="number"  size = 'lg'/>
                        </Form.Group>
                        <Form.Group controlId="phonenumberID">
                            <Form.Label>*Phone Number</Form.Label>
                            <Form.Control onChange={(e) => setPhonenumber(e.target.value)} defaultValue={phonenumber} type="text" size = 'lg'/>
                        </Form.Group>
                        <Form.Group controlId="facebookID">
                            <Form.Label>*Facebook</Form.Label>
                            <Form.Control onChange={(e) => setFacebook(e.target.value)} defaultValue={facebook}  type="text"  size = 'lg'/>
                        </Form.Group>
                        <Form.Group controlId="linkedinID">
                            <Form.Label>*Linkedin</Form.Label>
                            <Form.Control onChange={(e) => setLinkedin(e.target.value)} defaultValue={linkedin} type="text"  size = 'lg'/>
                        </Form.Group>
                        <Form.Group controlId="skypeID">
                            <Form.Label>*Skype</Form.Label>
                            <Form.Control onChange={(e) => setSkype(e.target.value)} defaultValue={skype} type="text"  size = 'lg'/>
                        </Form.Group>
                        <Form.Group controlId="defaultlangID">
                            <Form.Label>*Default Language</Form.Label>
                            <Form.Select onChange={(e) => setDefault_language(e.target.value)} value={default_language} size="lg">
                                <option value="none" >System Default</option>
                                <option value="English" >English</option>
                                <option value="Germany" >Germany</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="emailsignatureID">
                            <Form.Label>*Email Signature</Form.Label>
                            <Form.Control onChange={(e) => setEmail_signature(e.target.value)} as="textarea" rows={3}/>
                        </Form.Group>
                        <Form.Group controlId="directionID">
                            <Form.Label>*Direction</Form.Label>
                            <Form.Select onChange={(e) => setDirection(e.target.value)} value={direction} size="lg">
                                <option value="none" >System Default</option>
                                <option value="ltr" >LTR</option>
                                <option value="rtl" >RTL</option>
                            </Form.Select>
                        </Form.Group>
                        <p></p>
                        <Form.Group controlId="memberdepartments">
                            {
                                alldepartments.map((department: any) => (
                                    <Form.Check 
                                        type="checkbox" 
                                        key={department._id} 
                                        id = {department._id} 
                                        name = {department._id} 
                                        label={department.name}
                                        defaultChecked = {onCheck(department._id)}
                                        disabled
                                    />
                                ))
                            }
                        </Form.Group>
                        <p></p>
                    </Portlet.Body>
                    <Portlet.Footer>
                        <Portlet.Footer bordered align="end">
                            <Button onClick={handleSubmit} type='submit' variant="primary">Submit</Button>
                        </Portlet.Footer>
                    </Portlet.Footer>
                </Portlet>
            </Col><Col md = "6">
                <Portlet>
                    <Portlet.Header bordered>
                        <Portlet.Addon>
                            <h4>Change your password</h4>
                        </Portlet.Addon>
                    </Portlet.Header>
                    <Portlet.Body>
                        <Form.Group controlId="oldpasswordID">
                            <Form.Label>*Old Password</Form.Label>
                            <InputGroup>
                                <Form.Control type="password" onChange={(e) => setOldPassword(e.target.value)} size = 'lg'/>
                            </InputGroup>
                            <p style={danger}>{errors.oldpassword}</p>
                        </Form.Group>
                        <Form.Group controlId="newpasswordID">
                            <Form.Label>*New Password</Form.Label>
                            <InputGroup>
                                <Form.Control type="password" onChange={(e) => setNewPassword(e.target.value)} size = 'lg'/>
                            </InputGroup>
                            <p style={danger}>{errors.newpassword}</p>
                        </Form.Group>
                        <Form.Group controlId="confirmpasswordID">
                            <Form.Label>*Confirm Password</Form.Label>
                            <InputGroup>
                                <Form.Control type="password" onChange={(e) => setConfirmPassword(e.target.value)} size = 'lg'/>
                            </InputGroup>
                            <p style={danger}>{errors.confirmpassword}</p>
                        </Form.Group>
                        
                    </Portlet.Body>
                    <Portlet.Footer>
                        <Portlet.Footer bordered align="end">
                            <Button onClick={changePassword} type='submit' variant="primary">Submit</Button>
                        </Portlet.Footer>
                    </Portlet.Footer>
                </Portlet>
            </Col>
        </Row>
    )
}

export default View


