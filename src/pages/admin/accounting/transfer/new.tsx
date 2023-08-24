import React from 'react'
import { Row, Col } from '@blueupcode/components'
import NewOne from 'components/admin/accounting/transfer/new'
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

NewOnePage.pageTitle = 'Acounting / New TransferPage'
NewOnePage.activeLink = 'admin/accounting/transfer/new'

export default NewOnePage
