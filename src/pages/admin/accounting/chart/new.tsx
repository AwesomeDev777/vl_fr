import React from 'react'
import { Row, Col } from '@blueupcode/components'
import NewOne from 'components/admin/accounting/chart/new'
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

NewOnePage.pageTitle = 'Acounting / New Accounting'
NewOnePage.activeLink = 'admin/accounting/chart/new'

export default NewOnePage
