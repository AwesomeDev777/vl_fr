import React from 'react'
import { Portlet, Table, Form, FloatingLabel, Avatar, Row, Col ,  Button } from '@blueupcode/components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import * as SolidIcon from '@fortawesome/free-solid-svg-icons'
import { swal, toast } from 'components/sweetalert2/instance'
import { useRouter } from 'next/router';
import Pagination from 'utils/Pagination'
import {Admin_Staff_Active, Admin_Staff_Delete, Admin_Staff_GetAll} from 'utils/adminUrl'
import { parseCookies } from 'nookies'
import Image from 'next/image'

const isEmpty = require('utils/is-empty')

const StaffComponent = () => {

    const router = useRouter();

    const cookies = parseCookies()
    const headers = {"Authorization": cookies.admintoken}

    const [size, setSize] = React.useState(10)
    const [staffs, setStaffs] = React.useState([])
    const [search_staff, setSearch_staff] = React.useState('')
    const [activeLinkNumber , setActiveLinkNumber] = React.useState(1)
    const [paginationLength , setPaginationLength]  = React.useState(10)
    const [deletestaff, setDeletestaff] = React.useState()
    const [deletesucess, setDeletesucess] = React.useState(0.001)
    const [sort, setSort] = React.useState(1)
    
    React.useEffect(() => {
        axios.get(Admin_Staff_GetAll + `/${activeLinkNumber}/${size}/search:${search_staff}/sort:${sort}`, {headers})
            .then(res => {
                setStaffs(res.data.all)
                if (size == 0){setPaginationLength(1)} 
                else{ 
                    if(res.data.length == 0) {setPaginationLength(1)}
                    else{
                        setPaginationLength(Math.ceil(res.data.length / size)) 
                    }
                }
            })
            .catch(err => console.log(err))
    }, [size, search_staff, activeLinkNumber, sort, deletesucess])
    
    React.useEffect(() => {
        if(!isEmpty(deletestaff))
        {
            axios.delete(Admin_Staff_Delete + `/${deletestaff}`, {headers})
                .then(res => {
                    setDeletesucess(Math.random())
                })
                .catch(err => console.log(err))
        }
    }, [deletestaff])

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
                .then(async (result) => {
                    if (result.isConfirmed) {
                        if(id.id[1] !== undefined)
                        {
                            let body = new FormData()
                            body.append("text", id.id[1])
                            const response = await fetch("/api/upload/remove", {
                                method: "POST",
                                body
                            })
                        }
                        setDeletestaff(id.id[0])
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
        await axios.put(Admin_Staff_Active + `/${id}`, active, {headers})
            .then(res => {
                successAlert()
            })
            .catch(err => {
                console.log(err)
            })
    }

    const displayImage = (name: any) => {
        const profile_image = name
        const src = '/uploads/profile_images/' + profile_image
        if(profile_image === undefined || isEmpty(profile_image)){
            return (<FontAwesomeIcon icon={faUser} />)
        } else{
            return (
                <div style={{position: "relative", width:"35px", height: "35px"}}>                
                    <Image src={src} layout="fill" alt="Avatar image" />
                </div>
            )
        }
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
                    <Col md={2}>
                        <Button variant='primary' onClick={() => router.push('/admin/setting/staff/new')}> New Staff </Button>
                    </Col>
                    <Col md={1}>
                        <Form.Select id='size_id' onChange={(e) => setSize(parseInt(e.target.value))} defaultValue="10" size="lg">
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="0">All</option>
                        </Form.Select>
                    </Col>
                    <Col md={7}></Col>
                    <Col md={2}>
                        <FloatingLabel controlId="search_id"  label="Search">
                            <Form.Control type="text" onChange={(e) => setSearch_staff(e.target.value)} placeholder="name" size='lg'/>
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
                            <th scope="col">Role</th>
                            <th scope="col">Last Login</th>
                            <th scope="col">Active</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            staffs.map((staff: any) => (
                                <tr key={staff._id}>
                                    <td>                                     
                                        <Avatar display>
                                            {displayImage(staff.profile_image)}
                                        </Avatar>
                                        {staff.firstname}
                                        <div>
                                            <Button variant="text-primary" onClick={() => router.push({pathname : '/admin/setting/staff/[id]', query: {id: staff._id}})} pill size='sm'>
                                                view
                                            </Button>
                                            <Swal7 id = {[staff._id, staff.profile_image]}/>
                                        </div>
                                    </td>
                                    <td>
                                        {staff.email}
                                    </td>
                                    <td>
                                        {staff.role.name}
                                    </td>
                                    <td>
                                        {staff.last_login}
                                    </td>
                                    <td>
                                        <Form.Switch id={staff._id} onChange={(e) => change(e, staff._id)}  defaultChecked={staff.active} />
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



export default StaffComponent
