import React from 'react'
import { Portlet, Table, Form, Row, Col ,  Button, Accordion } from '@blueupcode/components'
import axios from 'axios'
import { swal } from 'components/sweetalert2/instance'
import { useRouter } from 'next/router';
import Pagination from 'utils/Pagination'
import {Admin_Accounting_Transaction_Bank_GetAll, Admin_Accounting_Transaction_Bank_Delete} from 'utils/adminUrl'
import { parseCookies } from 'nookies'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBank } from '@fortawesome/free-solid-svg-icons';
import { faSalesforce } from '@fortawesome/free-brands-svg-icons';
const isEmpty = require('utils/is-empty')

const GetAllComponent = () => {

    const router = useRouter();

    const cookies = parseCookies()
    const headers = {"Authorization": cookies.admintoken}
    
    const [size, setSize] = React.useState(10)
    const [activeLinkNumber , setActiveLinkNumber] = React.useState(1)
    const [paginationLength , setPaginationLength]  = React.useState(1)

    const [deleteBank, setDeleteBank] = React.useState()
    const [deleteBankSucess, setDeleteBankSucess] = React.useState(0.001)

    const [banks, setBanks] = React.useState([])

    React.useEffect(() => {
        axios.get(Admin_Accounting_Transaction_Bank_GetAll + `/${activeLinkNumber}/${size}`, {headers})
            .then(res => {
                setBanks(res.data.all)
                if (size == 0){setPaginationLength(1)} 
                else{ 
                    if(res.data.length == 0) {setPaginationLength(1)}
                    else{
                        setPaginationLength(Math.ceil(res.data.length / size)) 
                    }
                }
            })
            .catch(err => console.log(err))
    }, [size, activeLinkNumber, deleteBankSucess])
    
    React.useEffect(() => {
        if(!isEmpty(deleteBank))
        {
            axios.delete(Admin_Accounting_Transaction_Bank_Delete + `/${deleteBank}`, {headers})
                .then(res => {
                    setDeleteBankSucess(Math.random())
                })
                .catch(err => console.log(err))
        }
    }, [deleteBank])

    const chooseActiveLinkNumber = (activeLinkNumber: React.SetStateAction<number>) => {
        setActiveLinkNumber(activeLinkNumber);
    };
    
    const pagination = {activeLinkNumber, paginationLength, chooseActiveLinkNumber}  
    
    const SwalBank = (id: any) => {
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
                        setDeleteBank(id.id)
                        swal.fire('Deleted!', 'Successfully deleted.', 'success')
                    }
                })
        }
    
        return <Button variant="text-danger" onClick={handleClick}  pill size='sm'>delete</Button>
    }

    return(
        <Row>
            <Col>
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header icon={() => <FontAwesomeIcon icon={faBank} />}>
                            Banking
                        </Accordion.Header>
                        <Accordion.Body>
                            <Portlet>
                                <Portlet.Body className="pb-0">
                                    <Row>
                                        <Col md={3}>
                                            <Button variant='primary' onClick={() => router.push('/admin/accounting/transaction/banking/new')}> New </Button>
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
                                                <th scope="col">Date</th>
                                                <th scope="col">Withdrawals</th>
                                                <th scope="col">Deposits</th>
                                                <th scope="col">Payee</th>
                                                <th scope="col">Description</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Mapping</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                banks.map((bank: any) => (
                                                    <tr key={bank._id}>
                                                        <td>
                                                            {bank.date}
                                                        </td>
                                                        <td>
                                                            {bank.withdrawals}
                                                        </td>
                                                        <td>
                                                            {bank.deposits}
                                                        </td>
                                                        <td>
                                                            {bank.payee}
                                                        </td>
                                                        <td>
                                                            {bank.description}
                                                        </td>
                                                        <td>
                                                            {bank.status}
                                                        </td>
                                                        <td>
                                                            {bank.mapping}
                                                        </td>
                                                        <td>
                                                            {/* <Button variant="text-primary" onClick={() => router.push({pathname : '/admin/accounting/transaction/banking/[id]', query: {id: bank._id}})} pill size='sm'>
                                                                view
                                                            </Button> */}
                                                            <SwalBank id = {bank._id}/>
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
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header icon={() => <FontAwesomeIcon icon={faSalesforce} />}>
                            sales
                        </Accordion.Header>
                        <Accordion.Body>
                            <strong>Lorem ipsum dolor sit amet</strong>, consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                            ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>            
            </Col>
        </Row>
    )
}



export default GetAllComponent
