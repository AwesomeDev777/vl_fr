import React from 'react'
import { Row, Col } from '@blueupcode/components'
import NewOne from 'components/admin/client/new'
import type { ExtendedNextPage } from '@blueupcode/components/types'

const NewOnePage: ExtendedNextPage = () => {
	return (
		<>
			<Row>
				<Col md="2">
				</Col>
				<Col md={8}>
					<NewOne />
				</Col>
				<Col md="2">
				</Col>
			</Row>
		</>
	)
}

NewOnePage.pageTitle = 'Create Client'
NewOnePage.activeLink = 'admin/client/new'

export default NewOnePage
