import React from 'react'
import { Row, Col } from '@blueupcode/components'
import NewOne from 'components/admin/setting/paymentmode/new'
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

NewOnePage.pageTitle = 'New Payment Mode'
NewOnePage.activeLink = 'admin/setting/paymentmode/new'

export default NewOnePage
