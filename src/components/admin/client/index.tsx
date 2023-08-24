import React from 'react'
import { Portlet, Table, Form, Avatar, Row, Col ,  Button, FloatingLabel } from '@blueupcode/components'
import axios from 'axios'
import { swal, toast } from 'components/sweetalert2/instance'
import { useRouter } from 'next/router';
import Pagination from 'utils/Pagination'
import {Admin_Client_GetAll, Admin_Client_Delete, Admin_Client_Active} from 'utils/adminUrl'
import { parseCookies } from 'nookies'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as SolidIcon from '@fortawesome/free-solid-svg-icons'
const isEmpty = require('utils/is-empty')

const AllclientComponent = () => {

    const router = useRouter();

    const cookies = parseCookies()
    const headers = {"Authorization": cookies.admintoken}

    const [size, setSize] = React.useState(10)
    const [clients, setClients] = React.useState([])
    // const [search_client, setSearch_client] = React.useState('')
    const [activeLinkNumber , setActiveLinkNumber] = React.useState(1)
    const [paginationLength , setPaginationLength]  = React.useState(10)
    const [deleteclient, setDeleteclient] = React.useState()
    const [deletesucess, setDeletesucess] = React.useState(0.001)
    const [search, setSearch] = React.useState('')
    const [sort, setSort] = React.useState(1)

    React.useEffect(() => {
        axios.get(Admin_Client_GetAll + `/${activeLinkNumber}/${size}/search:${search}/sort:${sort}`, {headers})
            .then(res => {
                setClients(res.data.all)
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
        if(!isEmpty(deleteclient))
        {
            axios.delete(Admin_Client_Delete + `/${deleteclient}`, {headers})
                .then(res => {
                    setDeletesucess(Math.random())
                })
                .catch(err => console.log(err))
        }
    }, [deleteclient])

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
                        setDeleteclient(id.id)
                        swal.fire('Deleted!', 'That Client has been deleted.', 'success')
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
        await axios.put(Admin_Client_Active + `/${id}`, active, {headers})
            .then(res => {
                successAlert()
            })
            .catch(err => {
                console.log(err)
            })
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
            <Portlet.Header>
                <Portlet.Addon>
                    <Button variant='primary' onClick={() => router.push('/admin/clients/client')}> Create Client </Button>
                    <Button variant='text-primary' onClick={() => router.push('/admin/clients/contact')}> Contacts </Button>
                </Portlet.Addon>
            </Portlet.Header>
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
                            <th scope="col" onClick={handleSort}>Company <FontSort icon = {sort}/></th>
                            <th scope="col">Contact</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Groups</th>
                            <th scope="col">Date Created</th>
                            <th scope="col">Active</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            clients.map((client: any) => (
                                <tr key={client._id}>
                                    <td>
                                        {client.company}
                                    </td>
                                    <td>
                                        {/* {client.website} */}
                                    </td>
                                    <td>
                                        {/* {client.website} */}
                                    </td>
                                    <td>
                                        {client.phonenumber}
                                    </td>
                                    <td>
                                        {client.groups.toString()}
                                    </td>
                                    <td>
                                        {client.created_at}
                                    </td>
                                    <td>
                                        <Form.Switch id={client._id} onChange={(e) => change(e, client._id)}  defaultChecked={client.active} />
                                    </td>
                                    <td>
                                        <Button variant="text-primary" onClick={() => router.push({pathname : '/admin/clients/[id]', query: {id: client._id}})} pill size='sm'>
                                            view / Edit
                                        </Button>
                                        <Swal7 id = {client._id}/>
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



export default AllclientComponent
