import React from 'react'
import { Row, Col } from '@blueupcode/components'
import View from 'components/admin/contract/view'
import type { ExtendedNextPage } from '@blueupcode/components/types'
import { useRouter } from 'next/router'

const ViewPage: ExtendedNextPage = () => {
	const router = useRouter()
	const [id, setId] = React.useState<String>()
	const ViewComponenet = () => {
		if(id !== undefined)
		{
			return (<View id = {useRouter().query.id} />)
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
				<Col md={12}>
					<ViewComponenet />
				</Col>
			</Row>
		</>
	)
}

ViewPage.pageTitle = 'View Contract'
ViewPage.activeLink = 'admin/contract/'

export default ViewPage
