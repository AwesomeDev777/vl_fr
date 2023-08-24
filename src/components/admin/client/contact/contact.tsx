import { Col, Portlet, Nav, Row, Table, Tab, Button, Form, InputGroup, ListGroup, Modal} from '@blueupcode/components'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { swal, toast } from 'components/sweetalert2/instance'
import { parseCookies } from 'nookies'
import Pagination from 'utils/Pagination'
import React from 'react'
import { Eye} from 'react-feather'
import { Admin_Contact_ADD, Admin_Contact_Active, Admin_Contact_Delete, Admin_Contact_Edit, Admin_Contact_GetOne, Admin_Contact_GetSome } from 'utils/adminUrl'

const isEmpty = require('utils/is-empty')

const Layout = (props: any) => {
    const cookies = parseCookies()
    const headers = {"Authorization": cookies.admintoken}
    const id = props.id
    const client = id
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

    const [contacts, setContacts] = React.useState([])
    
    const [size, setSize] = React.useState(10)
    const [activeLinkNumber , setActiveLinkNumber] = React.useState(1)
    const [paginationLength , setPaginationLength]  = React.useState(10)

    const [deleteOne, setDeleteOne] = React.useState()
    const [deletesucess, setDeletesucess] = React.useState(0.001)
    const [addsuccess, setAddsuccess] = React.useState(0.001)

    React.useEffect(() => {
        axios.get(Admin_Contact_GetSome + `/${activeLinkNumber}/${size}/${id}`, {headers})
            .then(res => {
                setContacts(res.data.all)
                if (size == 0){setPaginationLength(1)} 
                else{ 
                    if(res.data.length == 0) {setPaginationLength(1)}
                    else{
                        setPaginationLength(Math.ceil(res.data.length / size)) 
                    }
                }
            })
            .catch(err => console.log(err))
    }, [size, activeLinkNumber, deletesucess, addsuccess])
    
    React.useEffect(() => {
        if(!isEmpty(deleteOne))
        {
            axios.delete(Admin_Contact_Delete + `/${deleteOne}`, {headers})
                .then(res => {
                    setDeletesucess(Math.random())
                })
                .catch(err => console.log(err))
        }
    }, [deleteOne])

    const chooseActiveLinkNumber = (activeLinkNumber: React.SetStateAction<number>) => {
        setActiveLinkNumber(activeLinkNumber);
    };
    
    const pagination = {activeLinkNumber, paginationLength, chooseActiveLinkNumber}  
    
    const Swal7 = (id: any) => {
        const handleClick = () => {
            swal
                .fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!',
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        setDeleteOne(id.id)
                        swal.fire('Deleted!', 'Successfully deleted.', 'success')
                    }
                })
        }
    
        return <Button variant="text-danger" onClick={handleClick}  pill size='sm'>delete</Button>
    }

    const successAlert = () => {
        toast.fire({
            icon: 'success',
            title: 'Success!'
        })
    }

    const changeActive = async (e: any, id: any) => {
        const active = {active : e.target.checked}
        await axios.put(Admin_Contact_Active + `/${id}`, active, {headers})
            .then(res => {
                successAlert()
            })
            .catch(err => {
                console.log(err)
            })
    }

    const NewContact = () => {
        const [show, setShow] = React.useState(false)

        const [email, setEmail] = React.useState('')
        const [firstname, setFirstname] = React.useState('')
        const [lastname, setLastname] = React.useState('')
        const [phonenumber, setPhonenumber] = React.useState('')
        const [direction, setDirection] = React.useState('none')
        const [password, setPassword] = React.useState('')
        const [isprimary, setIsprimary] = React.useState(false)
        const [newOne, setNewOne] = React.useState({})
        
        const [passwordtype, setPasswordtype] = React.useState('password')
        const [eye, setEye] = React.useState(true)
        
        const handleHide = () => setShow(false)
        const handleShow = () => setShow(true)

        React.useEffect(() => {
            setNewOne({email,firstname,lastname,phonenumber,client,isprimary,direction,password})
        }, [email,firstname,lastname,phonenumber,direction,isprimary,password])
        
        React.useEffect(() => {
            if (eye) {setPasswordtype('password') }
            else {setPasswordtype('text')}
        }, [eye])
        

        const handleADD = async () => {
            await axios.post(Admin_Contact_ADD, newOne, {headers})
                .then(res => {
                    successAlert()
                    setErrors({email: '',password: '',firstname: '',lastname: '',phonenumber: '', contact: ''})
                    setAddsuccess(Math.random())
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

        return (
            <>
                <Button variant="primary" onClick={handleShow}>
                    + New Contact
                </Button>
                {/* BEGIN Modal */}
                <Modal scrollable show={show} onHide={handleHide}>
                    <Modal.Header>
                        <Modal.Title>New Contact</Modal.Title>
                        <Button icon variant="label-danger" onClick={handleHide}>
                            <FontAwesomeIcon icon={faTimes} />
                        </Button>
                    </Modal.Header>
                    <Modal.Body>
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
                        <Form.Group controlId="phonenumberID">
                            <Form.Label>*Phone Number</Form.Label>
                            <Form.Control onChange={(e) => setPhonenumber(e.target.value)} type="text" size = 'lg'/>
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
                    </Modal.Body>
                    <Modal.Footer>                    
                        <Button onClick={handleADD} type='submit' variant="primary">Submit</Button>
                    </Modal.Footer>
                </Modal>
                {/* END Modal */}
            </>
        )
    }
    const ViewContact = (props: any) => {
        let id = props.id

        let [show, setShow] = React.useState(false)
        
        let [email, setEmail] = React.useState('')
        let [firstname, setFirstname] = React.useState('')
        let [lastname, setLastname] = React.useState('')
        let [phonenumber, setPhonenumber] = React.useState('')
        let [direction, setDirection] = React.useState('none')
        // let [password, setPassword] = React.useState('')
        let [isprimary, setIsprimary] = React.useState(false)
        let [newOne, setNewOne] = React.useState({})
        
        // let [passwordtype, setPasswordtype] = React.useState('password')
        // let [eye, setEye] = React.useState(true)
        
        const handleHide = () => setShow(false)
        const handleShow = () => setShow(true)
        
        React.useEffect(() => {
            let isMounted = true;
            async function fetchData() {
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
                    if(err.response !== undefined){                        
                        error.contact = err.response.data.contact
                        setErrors(error);
                    }
                })
            }
        
            fetchData();
        
            // Cleanup function
            return () => {
                isMounted = false;
            };
        }, [])

        React.useEffect(() => {
            setNewOne({email,firstname,lastname,phonenumber,client,isprimary,direction})
        }, [email,firstname,lastname,phonenumber,direction,isprimary])
        
        // React.useEffect(() => {
        //     if (eye) {setPasswordtype('password') }
        //     else {setPasswordtype('text')}
        // }, [eye])

        const handleEdit = async () => {
            await axios.put(Admin_Contact_Edit + `/${id}`, newOne, {headers})
                .then(res => {
                    successAlert()
                    setErrors({email: '',password: '',firstname: '',lastname: '',phonenumber: '', contact: ''})
                    setAddsuccess(Math.random())
                })
                .catch(err => {
                    let error : Errors = {email: '',password: '',firstname: '',lastname: '',phonenumber: '', contact: ''}
                    !isEmpty(err.response.data.email) ? error.email = err.response.data.email : ''
                    // !isEmpty(err.response.data.password)? error.password = err.response.data.password : ''
                    !isEmpty(err.response.data.firstname) ? error.firstname = err.response.data.firstname : ''
                    !isEmpty(err.response.data.lastname) ? error.lastname = err.response.data.lastname : ''
                    !isEmpty(err.response.data.phonenumber) ? error.phonenumber = err.response.data.phonenumber : ''
                    setErrors(error)
                })
        }

        const change = (e: any) => {
            setIsprimary(e.target.checked) 
        }

        return (
            <>
                <Button variant="text-info" onClick={handleShow}>
                    View
                </Button>
                {/* BEGIN Modal */}
                <Modal scrollable show={show} onHide={handleHide}>
                    <Modal.Header>
                        <Modal.Title>{id}</Modal.Title>
                        <Button icon variant="label-danger" onClick={handleHide}>
                            <FontAwesomeIcon icon={faTimes} />
                        </Button>
                    </Modal.Header>
                    <Modal.Body>
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
                        {/* <Form.Group controlId="passwordID">
                            <Form.Label>*Password</Form.Label>
                            <InputGroup>
                                <Form.Control type={passwordtype} onChange={() => setPassword(passwordID.value)} size = 'lg'/>
                                <Button variant="outline-info" onClick={()=> setEye(!eye)} size = 'lg' icon>
                                    <Eye />
                                </Button>
                            </InputGroup>
                            <p style={danger}>{errors.password}</p>
                        </Form.Group> */}
                        <Form.Check 
                            type="checkbox" 
                            label= "Primary Contact"
                            defaultChecked={isprimary}
                            onChange={(e) => change(e)}
                        />
                    </Modal.Body>
                    <Modal.Footer>                    
                        <Button onClick={handleEdit} type='submit' variant="primary">Submit</Button>
                    </Modal.Footer>
                </Modal>
                {/* END Modal */}
            </>
        )
    }
    return(
        <Portlet>
            <Portlet.Header>
                <Portlet.Addon>        
                    <NewContact />
                </Portlet.Addon>
            </Portlet.Header>
            <Portlet.Body className="pb-0">
                <Row>
                    <Col md={2}>
                        <Form.Select id='sizeID' onChange={(e) => setSize(parseInt(e.target.value))} defaultValue="10" size="lg">
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="0">All</option>
                        </Form.Select>
                    </Col>
                    <Col md={8}></Col>
                    <Col md={2}>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <p></p>
                    </Col>
                </Row>
                {/* BEGIN Table */}
                <Table responsive striped hover>
                    <thead className="table-primary">
                        <tr>
                            <th scope="col">Full Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Active</th>
                            <th scope='col'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            contacts.map((contact: any) => (
                                <tr key={contact._id}>
                                    <td>
                                        {contact.firstname}{contact.lastname}
                                    </td>
                                    <td>
                                        {contact.email}
                                    </td>
                                    <td>
                                        {contact.phonenumber}
                                    </td>
                                    <td>
                                        <Form.Switch id={contact._id} onChange={(e) => changeActive(e, contact._id)}  defaultChecked={contact.active} />
                                    </td>
                                    <td>
                                        <ViewContact id = {contact._id} />
                                        <Swal7 id = {contact._id}/>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Portlet.Body>
            <Portlet.Footer>
                <Row>
                    <Col md={9}>
                    </Col>
                    <Col md={3}>    
                        <Pagination pagination = {pagination}/>
                    </Col>
                </Row>
            </Portlet.Footer>
        </Portlet>
    )
}

export default Layout
