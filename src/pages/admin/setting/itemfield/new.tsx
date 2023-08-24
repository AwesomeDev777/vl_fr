import React from 'react'
import { Row, Col } from '@blueupcode/components'
import NewOne from 'components/admin/setting/itemfield/new'
import type { ExtendedNextPage } from '@blueupcode/components/types'

const NewOnePage: ExtendedNextPage = () => {
	return (
		<>
			<Row>
				<Col md={12}>
					<NewOne />
				</Col>
			</Row>
		</>
	)
}

NewOnePage.pageTitle = 'New ItemField'
NewOnePage.activeLink = 'admin/setting/itemfield/new'

export default NewOnePage
