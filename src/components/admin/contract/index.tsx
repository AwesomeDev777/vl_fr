import React from 'react'
import { Portlet, Table, Form, Row, Col ,  Button, useTheme } from '@blueupcode/components'
import axios from 'axios'
import { swal } from 'components/sweetalert2/instance'
import { useRouter } from 'next/router';
import Pagination from 'utils/Pagination'
import {Admin_Contract_GetAll, Admin_Contract_Delete, Admin_Contract_Type_GetAll} from 'utils/adminUrl'
import { parseCookies } from 'nookies'
import { ApexOptions } from 'apexcharts';
// import Chart from '@blueupcode/apexcharts';
const isEmpty = require('utils/is-empty')

const ContractComponent = () => {
    const { resolvedTheme: theme } = useTheme()

    const router = useRouter();

    const cookies = parseCookies()
    const headers = {"Authorization": cookies.admintoken}

    const [size, setSize] = React.useState(10)
    
    const [contracts, setContracts] = React.useState([])
    
    const [activeLinkNumber , setActiveLinkNumber] = React.useState(1)
    const [paginationLength , setPaginationLength]  = React.useState(10)
    const [deletecontract, setDeletecontract] = React.useState()
    const [deletesucess, setDeletesucess] = React.useState(0.001)

    const [contract_type_names, setContract_type_names] = React.useState([''])
    const [contract_type_ids, setContract_type_ids] = React.useState([''])
    const [contract_type_values, setContract_type_values] = React.useState([0])
    const [contract_type_nums, setContract_type_nums] = React.useState([0])
    const [contract_type_ids_length, setContract_type_ids_length] = React.useState(0)

    React.useEffect(() => {
        axios.get(Admin_Contract_GetAll + `/${activeLinkNumber}/${size}`, {headers})
            .then(res => {
                setContracts(res.data.all)
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
        axios.get(Admin_Contract_Type_GetAll + `/1/0`, {headers})
            .then(res => {
                let con_id = []
                let con_name = []
                let con_value = []
                let con_num = []
                for(let i =0; i < res.data.all.length; i++){
                    con_id.push(res.data.all[i]._id)
                    con_name.push(res.data.all[i].name)
                    con_num[i] = 0
                    con_value[i] = 0
                }
                setContract_type_ids(con_id)
                setContract_type_names(con_name)
                setContract_type_values(con_value)
                setContract_type_nums(con_num)
                setContract_type_ids_length(1)
            })
            .catch(err => console.log(err))
    }, [])

    React.useEffect(() => {
        if(!isEmpty(deletecontract))
        {
            axios.delete(Admin_Contract_Delete + `/${deletecontract}`, {headers})
                .then(res => {
                    setDeletesucess(Math.random())
                })
                .catch(err => console.log(err))
        }
    }, [deletecontract])

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
                        setDeletecontract(id.id)
                        swal.fire('Deleted!', 'That Contract has been deleted.', 'success')
                    }
                })
        }
        return <Button variant="text-danger" onClick={handleClick}  pill size='sm'>delete</Button>
    }

    interface ChartGeneralProps {
        mode: 'light' | 'dark'
        series: ApexAxisChartSeries | ApexNonAxisChartSeries
    }

    const handleDate = (data: any) => {
        const temp = String(data).slice(0, 9)
        return temp
    }

    React.useEffect(() => {
        if(contract_type_ids.length != 0){
            for(let i = 0; i < contract_type_ids.length; i++){
                contracts.map((contract: any)=>{
                    if(contract.contract_type !== null){
                        if(contract_type_ids[i] == contract.contract_type._id)
                        {
                            contract_type_values[i] += contract.contract_value
                            contract_type_nums[i] += 1
                        }   
                    }
                })
            }
        } else{
            setContract_type_values([])
        }
    }, [contracts.length, contract_type_ids_length,])

    
    const handleproject = (data: any) => {
        if(data !== undefined) {
            return data.name
        }
        return ''
    }
    const handleclient = (data: any) => {
        if(data !== null) {
            return data.company
        }
        return ''
    }
    const handletype = (data: any) => {
        if(data !== null) {
            return data.name
        }
        return ''
    }
    const Chart4 = (props: ChartGeneralProps) => {
        const [options, setOptions] = React.useState<ApexOptions>({
            theme: {
                mode: props.mode,
                palette: 'palette1',
            },
            chart: {
                background: 'transparent',
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                },
            },
            dataLabels: {
                enabled: false,
            },
            xaxis: {
                categories: []
            },
        })

    
        React.useEffect(() => {
            setOptions((prevOptions) => ({
                ...prevOptions,
                mode: props.mode,
                xaxis: { 'categories' : contract_type_names},
                palette: 'palette1',
            }))
        }, [props.mode])

        return <div />
    
        // return <></> // <Chart type="bar" width="100%" height={350} options={options} series={props.series} />
    }

    return(
        <Portlet>
            <Portlet.Body className="pb-0">
                <Row>
                    <Col md={2}>
                        <Button variant='primary' onClick={() => router.push('/admin/contract/new')}> New Contract </Button>
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
                        {/* <FloatingLabel controlId="search_id"  label="Search"> */}
                            {/* <Form.Control type="text" placeholder="name" size='lg'/> */}
                            {/* <Form.Control type="text" onChange={() => setSearch_delete(search_id.value)} placeholder="name" size='lg'/> */}
                        {/* </FloatingLabel> */}
                    </Col>
                </Row>
                <Row>    
                    <Col>
                        <Portlet>
                            <Portlet.Header bordered>
                                <Portlet.Title>Contracts by Type</Portlet.Title>
                            </Portlet.Header>
                            <Portlet.Body>
                                <Chart4
                                    mode={theme as ChartGeneralProps['mode']}
                                    series={[
                                        {
                                            data: contract_type_nums,
                                        },
                                    ]}
                                />
                            </Portlet.Body>
                        </Portlet>
                    </Col>
                    <Col>
                        <Portlet>
                            <Portlet.Header bordered>
                                <Portlet.Title>Contracts Value by Type</Portlet.Title>
                            </Portlet.Header>
                            <Portlet.Body>
                                <Chart4
                                    mode={theme as ChartGeneralProps['mode']}
                                    series={[
                                        {
                                            data: contract_type_values,
                                        },
                                    ]}
                                />
                            </Portlet.Body>
                        </Portlet>
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
                            <th scope="col">Subject</th>
                            <th scope="col">Client</th>
                            <th scope="col">Type</th>
                            <th scope="col">Value</th>
                            <th scope="col">Start Date</th>
                            <th scope="col">End Date</th>
                            <th scope="col">Project</th>
                            <th scope="col">Signature</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            contracts.map((contract: any) => (
                                <tr key={contract._id}>
                                    <td>
                                        {contract.subject}
                                    </td>
                                    <td>
                                        {handleclient(contract.client)}
                                    </td>
                                    <td>
                                        {handletype(contract.contract_type)}
                                    </td>
                                    <td>
                                        {contract.contract_value}
                                    </td>
                                    <td>
                                        {handleDate(contract.datestart)}
                                    </td>
                                    <td>
                                        {handleDate(contract.dateend)}
                                    </td>
                                    <td>
                                        {handleproject(contract.project)}
                                    </td>
                                    <td>
                                        {contract.signature}
                                    </td>
                                    <td>
                                        <Button variant="text-primary" onClick={() => router.push({pathname : '/admin/contract/[id]', query: {id: contract._id}})} pill size='sm'>
                                            view / Edit
                                        </Button>
                                        <Swal7 id = {contract._id}/>
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



export default ContractComponent
