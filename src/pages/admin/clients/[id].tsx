import React, { ReactElement } from 'react'
import { Row, Col } from '@blueupcode/components'
import View from 'components/admin/client/view'
import Layout from 'components/admin/client/layout'
import Contact from 'components/admin/client/contact/contact'
import type { ExtendedNextPage } from '@blueupcode/components/types'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import axios from 'axios'
import { Admin_Client_GetOne } from 'utils/adminUrl'

const isEmpty = require('utils/is-empty')

const ViewPage: ExtendedNextPage = () => {
	const cookies = parseCookies()
    const headers = {"Authorization": cookies.admintoken}

	const router = useRouter()
	const [id, setId] = React.useState<String>()
    const [layout, setLayout] = React.useState<String>("profile")
	const [view, setView] = React.useState<ReactElement>()
	const [company, setCompany] = React.useState('')

	const [profile, setProfile] = React.useState<ReactElement>()
	const [contact, setContact] = React.useState<ReactElement>()
	
	const backLayout = (layout: String) => {
		setLayout(layout);
	}
	
	React.useEffect(() => {
		if(router.query == undefined || isEmpty(router.query) == true) {return;}
		else{			
			let query = router.query.id
			setId(String(query))
			axios.get(Admin_Client_GetOne + `/${query}`, {headers})
				.then(res => {
					setCompany(res.data.company)
				})
				.catch(err => {
					console.log(err)
				})
			setProfile(<View id = {query}/>)
			setContact(<Contact id = {query}/>)
		}
	},[router.query]);

	const LayoutComponent = () => {
		if(id !== undefined)
		{
			const layoutProps = {id, layout, company, backLayout} 

			return (<Layout layoutProps = {layoutProps}/>)
		}
		return (<p></p>)
	}

	React.useEffect(() => {
		if(router.query !== undefined){
			if(layout == "profile")
			{
				setView(profile)
			}
			if(layout == "contact")
			{
				setView(contact)
			}
		}
    }, [layout])	

	React.useEffect(()=> {
		if(id == undefined) {return;}
		else{			
			setView(profile)
		}
	}, [id])

	return (
		<>
			<Row>
				<Col md={3}>
					<LayoutComponent />
				</Col>
				<Col md={9}>
					{view}
				</Col>
			</Row>
		</>
	)
}

ViewPage.pageTitle = 'View Client'
ViewPage.activeLink = 'admin/client/'

export default ViewPage
