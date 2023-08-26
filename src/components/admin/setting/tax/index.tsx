import React from 'react'
import { Portlet, Table, Form, Row, Col ,  Button } from '@blueupcode/components'
import axios from 'axios'
import { swal, toast } from 'components/sweetalert2/instance'
import { useRouter } from 'next/router';
import Pagination from 'utils/Pagination'
import {Admin_Tax_GetAll, Admin_Tax_Delete} from 'utils/adminUrl'
import { parseCookies } from 'nookies'
const isEmpty = require('utils/is-empty')

const GetALLComponent = () => {

    const router = useRouter();

    const cookies = parseCookies()
    const headers = {"Authorization": cookies.admintoken}

    const [taxes, setTaxes] = React.useState([])
    
    const [size, setSize] = React.useState(10)
    const [activeLinkNumber , setActiveLinkNumber] = React.useState(1)
    const [paginationLength , setPaginationLength]  = React.useState(10)

    const [deleteOne, setDeleteOne] = React.useState()
    const [deletesucess, setDeletesucess] = React.useState(0.001)

    React.useEffect(() => {
        axios.get(Admin_Tax_GetAll + `/${activeLinkNumber}/${size}`, {headers})
            .then(res => {
                setTaxes(res.data.all)
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
        if(!isEmpty(deleteOne))
        {
            axios.delete(Admin_Tax_Delete + `/${deleteOne}`, {headers})
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

    return(
        <Portlet>
            <Portlet.Body className="pb-0">
                <Row>
                    <Col md={3}>
                        <Button variant='primary' onClick={() => router.push('/admin/setting/tax/new')}> New Tax </Button>
                    </Col>
                    <Col md={1}>
                        <Form.Select id='sizeID' onChange={(e) => setSize(parseInt(e.target.value))} defaultValue="10" size="lg">
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="0">All</option>
                        </Form.Select>
                    </Col>
                    <Col md={6}></Col>
                    <Col md={2}>
                        {/* <FloatingLabel controlId="search_id"  label="Search"> */}
                            {/* <Form.Control type="text" placeholder="name" size='lg'/> */}
                            {/* <Form.Control type="text" onChange={() => setSearch_delete(search_id.value)} placeholder="name" size='lg'/> */}
                        {/* </FloatingLabel> */}
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
                            <th scope="col">Name</th>
                            <th scope="col">Slug</th>
                            <th scope='col'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            taxes.map((tax: any) => (
                                <tr key={tax._id}>
                                    <td>
                                        {tax.name}
                                    </td>
                                    <td>
                                        {tax.taxrate}
                                    </td>
                                    <td>
                                        <div>
                                            <Button variant="text-primary" onClick={() => router.push({pathname : '/admin/setting/tax/[id]', query: {id: tax._id}})} pill size='sm'>
                                                view
                                            </Button>
                                            <Swal7 id = {tax._id}/>
                                        </div>
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



export default GetALLComponent
