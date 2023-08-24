import React from 'react'
import { Portlet, Table, Form, FloatingLabel, Avatar, Row, Col ,  Button } from '@blueupcode/components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as SolidIcon from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { swal, toast } from 'components/sweetalert2/instance'
import { useRouter } from 'next/router';
import Pagination from 'utils/Pagination'
import {Admin_Contact_GetAll, Admin_Contact_Delete, Admin_Contact_Active} from 'utils/adminUrl'
import { parseCookies } from 'nookies'
const isEmpty = require('utils/is-empty')

const ContactComponent = () => {

    const router = useRouter();

    const cookies = parseCookies()
    const headers = {"Authorization": cookies.admintoken}

    const [size, setSize] = React.useState(10)
    const [contacts, setContacts] = React.useState([])
    const [activeLinkNumber , setActiveLinkNumber] = React.useState(1)
    const [paginationLength , setPaginationLength]  = React.useState(10)
    const [deleteone, setDeleteone] = React.useState()
    const [deletesucess, setDeletesucess] = React.useState(0.001)
    const [search, setSearch] = React.useState('')
    const [sort, setSort] = React.useState(1)

    React.useEffect(() => {
        axios.get(Admin_Contact_GetAll + `/${activeLinkNumber}/${size}/search:${search}/sort:${sort}`, {headers})
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
    }, [size, search, activeLinkNumber, sort, deletesucess])
    
    React.useEffect(() => {
        if(!isEmpty(deleteone))
        {
            axios.delete(Admin_Contact_Delete + `/${deleteone}`, {headers})
                .then(res => {
                    setDeletesucess(Math.random())
                })
                .catch(err => console.log(err))
        }
    }, [deleteone])

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
                        setDeleteone(id.id)
                        swal.fire('Deleted!', 'That staff has been deleted.', 'success')
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
    
    const change = async (e: any, id: any) => {
        const active = {active : e.target.checked}
        await axios.put(Admin_Contact_Active + `/${id}`, active, {headers})
            .then(res => {
                successAlert()
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleclient = (data: any) => {
        if(data !== null) {
            return data.company
        }
        return ''
    }
    const handleLastLogin = (data: any) => {
        if(data !== undefined) {
            return data
        }
        return 'Never'
    }

    const handleSort = () => {
        if(sort == -1){setSort(1)}
        else{setSort(-1)}
    }

    const FontSort = (props: any) => {
        if(props.icon == 1){return (<FontAwesomeIcon  icon={SolidIcon.faAngleUp}/>)}
        else{return (<FontAwesomeIcon  icon={SolidIcon.faAngleDown}/>)}
    }

    return(
        <Portlet>
            <Portlet.Body className="pb-0">
                <Row>
                    <Col md={1}>
                        <Form.Select id='size_id' onChange={(e) => setSize(parseInt(e.target.value))} defaultValue="10" size="lg">
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="0">All</option>
                        </Form.Select>
                    </Col>
                    <Col md={9}></Col>
                    <Col md={2}>
                        <FloatingLabel controlId="search_id"  label="Search">
                            <Form.Control type="text" onChange={(e) => setSearch(e.target.value)} placeholder="name" size='lg'/>
                        </FloatingLabel>
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
                            <th scope="col" onClick={handleSort}>Full Name <FontSort icon = {sort}/></th>
                            <th scope="col">Email</th>
                            <th scope="col">Company</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Last Login</th>
                            <th scope="col">Active</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            contacts.map((contact: any) => (
                                <tr key={contact._id}>
                                    <td>                                     
                                        <Avatar display>
                                            <FontAwesomeIcon icon={faUser} />
                                        </Avatar>
                                        {contact.firstname + ' ' + contact.lastname}
                                        <div>
                                            <Button variant="text-primary" onClick={() => router.push({pathname : '/admin/clients/contact/[id]', query: {id: contact._id}})} pill size='sm'>
                                                view
                                            </Button>
                                            <Swal7 id = {contact._id}/>
                                        </div>
                                    </td>
                                    <td>
                                        {contact.email}
                                    </td>
                                    <td>
                                        {handleclient(contact.client)}
                                    </td>
                                    <td>
                                        {contact.phonenumber}
                                    </td>
                                    <td>
                                        {handleLastLogin(contact.last_login)}
                                    </td>
                                    <td>
                                        <Form.Switch id={contact._id} onChange={(e) => change(e, contact._id)}  defaultChecked={contact.active} />
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
                {/* END Table */}
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



export default ContactComponent
