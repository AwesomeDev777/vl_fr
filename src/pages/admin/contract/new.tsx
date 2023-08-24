import React from 'react'
import { Row, Col } from '@blueupcode/components'
import NewOne from 'components/admin/contract/new'
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

NewOnePage.pageTitle = 'New Contract'
NewOnePage.activeLink = 'admin/contract/new'

export default NewOnePage
