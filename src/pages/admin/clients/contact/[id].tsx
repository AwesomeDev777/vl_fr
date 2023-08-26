import React from 'react'
import { Row, Col } from '@blueupcode/components'
import View from 'components/admin/client/contact/view'
import type { ExtendedNextPage } from '@blueupcode/components/types'
import { useRouter } from 'next/router'

const ViewPage: ExtendedNextPage = () => {
	const router = useRouter()
	const [id, setId] = React.useState<String>()
	const ViewComponenet = () => {
		if(id !== undefined)
		{
			return (<View id = {router.query.id} />)
		}
		return (<p></p>)
	}
	React.useEffect(() => {
		if(router.query == undefined) {return;}
		else{			
			let query = router.query.id
			setId(String(query))
		}
	},[router.query]);

	return (
		<>
			<Row>
				<Col md="2">
				</Col>
				<Col md={8}>
					<ViewComponenet />
				</Col>
				<Col md="2">
				</Col>
			</Row>
		</>
	)
}

ViewPage.pageTitle = 'View Contact'
ViewPage.activeLink = 'admin/clients/contact/'

export default ViewPage
