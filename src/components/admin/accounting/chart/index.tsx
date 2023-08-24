import React from 'react'
import { Portlet, Table, Form, Avatar, Row, Col ,  Button } from '@blueupcode/components'
import axios from 'axios'
import { swal, toast } from 'components/sweetalert2/instance'
import { useRouter } from 'next/router';
import Pagination from 'utils/Pagination'
import {Admin_Accounting_Chart_Active, Admin_Accounting_Chart_Delete, Admin_Accounting_Chart_GetAll} from 'utils/adminUrl'
import { parseCookies } from 'nookies'
const isEmpty = require('utils/is-empty')

const ChartAccountComponent = () => {

    const router = useRouter();

    const cookies = parseCookies()
    const headers = {"Authorization": cookies.admintoken}

    const [size, setSize] = React.useState(10)
    const [accounts, setAccounts] = React.useState([])
    // const [search_staff, setSearch_staff] = React.useState('')
    const [activeLinkNumber , setActiveLinkNumber] = React.useState(1)
    const [paginationLength , setPaginationLength]  = React.useState(10)
    const [deleteOne, setDeleteOne] = React.useState()
    const [deletesucess, setDeletesucess] = React.useState(0.001)

    React.useEffect(() => {
        axios.get(Admin_Accounting_Chart_GetAll + `/${activeLinkNumber}/${size}`, {headers})
            .then(res => {
                setAccounts(res.data.all)
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
            axios.delete(Admin_Accounting_Chart_Delete + `/${deleteOne}`, {headers})
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
    
    const change = async (e: React.ChangeEvent<HTMLInputElement>, id: any) => {
        const active = {active : e.target.checked}
        await axios.put(Admin_Accounting_Chart_Active + `/${id}`, active, {headers})
            .then(res => {
                successAlert()
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handle_parent = (data: { name: any; }) => {
        if(!isEmpty(data)){return data.name} 
        return ""
    }

    return(
        <Portlet>
            <Portlet.Body className="pb-0">
                <Row>
                    <Col md={2}>
                        <Button variant='primary' onClick={() => router.push('/admin/accounting/chart/new')}> New One </Button>
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
                            <th scope="col">Name</th>
                            <th scope="col">Parent Account</th>
                            <th scope="col">Type</th>
                            <th scope="col">Detail Type</th>
                            <th scope="col">Primary Balance</th>
                            <th scope="col">Bank Balance</th>
                            <th scope="col">Active</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            accounts.map((account: any) => (
                                <tr key={account._id}>
                                    <td>
                                        {account.name}
                                    </td>
                                    <td>
                                        {handle_parent(account.parent_account)}
                                    </td>
                                    <td>
                                        {account.account_type}
                                    </td>
                                    <td>
                                        {account.account_type_detail}
                                    </td>
                                    <td>
                                        {account.balance}
                                    </td>
                                    <td>
                                        {account.bank_balance}
                                    </td>
                                    <td>
                                        <Form.Switch id={account._id} onChange={(e) => change(e, account._id)}  defaultChecked={account.active} />
                                    </td>
                                    <td>
                                        <Button variant="text-primary" onClick={() => router.push({pathname : '/admin/accounting/chart/[id]', query: {id: account._id}})} pill size='sm'>
                                            view
                                        </Button>
                                        <Swal7 id = {account._id}/>
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



export default ChartAccountComponent
