import React from 'react'
import { Row, Col } from '@blueupcode/components'
import View from 'components/admin/setting/department/view'
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
				<Col md={12}>
					<ViewComponenet />
				</Col>
			</Row>
		</>
	)
}

ViewPage.pageTitle = 'View Department'
ViewPage.activeLink = 'admin/setting/department'

export default ViewPage
