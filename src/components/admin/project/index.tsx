import React from 'react'
import { Portlet, Table, Form, Avatar, Row, Col ,  Button } from '@blueupcode/components'
import axios from 'axios'
import { swal } from 'components/sweetalert2/instance'
import { useRouter } from 'next/router';
import Pagination from 'utils/Pagination'
import {Admin_Project_GetAll, Admin_Project_Delete} from 'utils/adminUrl'
import { parseCookies } from 'nookies'
const isEmpty = require('utils/is-empty')

const ProjectComponent = () => {

    const router = useRouter();

    const cookies = parseCookies()
    const headers = {"Authorization": cookies.admintoken}

    const [size, setSize] = React.useState(10)
    const [projects, setProjects] = React.useState([])
    const [activeLinkNumber , setActiveLinkNumber] = React.useState(1)
    const [paginationLength , setPaginationLength]  = React.useState(10)
    const [deleteproject, setDeleteproject] = React.useState()
    const [deletesucess, setDeletesucess] = React.useState(0.001)

    React.useEffect(() => {
        axios.get(Admin_Project_GetAll + `/${activeLinkNumber}/${size}`, {headers})
            .then(res => {
                setProjects(res.data.all)
                if (size == 0){setPaginationLength(1)} 
                else{ 
                    if(res.data.length == 0) {setPaginationLength(1)}
                    else{
                        setPaginationLength(Math.ceil(res.data.length / size)) 
                    }
                }
            })
            .catch(err => console.log(err))
    }, [size, activeLinkNumber, deletesucess])
    
    React.useEffect(() => {
        if(!isEmpty(deleteproject))
        {
            axios.delete(Admin_Project_Delete + `/${deleteproject}`, {headers})
                .then(res => {
                    setDeletesucess(Math.random())
                })
                .catch(err => console.log(err))
        }
    }, [deleteproject])

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
                        setDeleteproject(id.id)
                        swal.fire('Deleted!', 'That Project has been deleted.', 'success')
                    }
                })
        }
    
        return <Button variant="text-danger" onClick={handleClick}  pill size='sm'>delete</Button>
    }

    const staffs = (data: any) => {
        let staff = []
        for (let i = 0; i < data.length; i++)
        {
            staff.push(data[i].firstname)
        }
        return staff.toString()
    }
    
    const handleclient = (data: any) => {
        if(data !== null) {
            return data.company
        }
        return ''
    }

    return(
        <Portlet>
            <Portlet.Body className="pb-0">
                <Row>
                    <Col md={2}>
                        <Button variant='primary' onClick={() => router.push('/admin/project/new')}> New Project </Button>
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
                            <th scope="col">Project Name</th>
                            <th scope="col">Client</th>
                            <th scope="col">Start Date</th>
                            <th scope="col">Deadline</th>
                            <th scope="col">Staffs</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            projects.map((project: any) => (
                                <tr key={project._id}>
                                    <td>
                                        {project.name}
                                    </td>
                                    <td>
                                        {handleclient(project.client)}
                                    </td>
                                    <td>
                                        {project.start_date}
                                    </td>
                                    <td>
                                        {project.deadline}
                                    </td>
                                    <td>
                                        {staffs(project.staffs)}
                                    </td>
                                    <td>
                                        {project.status}
                                    </td>
                                    <td>
                                        <Button variant="text-primary" onClick={() => router.push({pathname : '/admin/project/[id]', query: {id: project._id}})} pill size='sm'>
                                            view / Edit
                                        </Button>
                                        <Swal7 id = {project._id}/>
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



export default ProjectComponent
