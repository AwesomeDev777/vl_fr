import React from 'react'
import { Row, Col } from '@blueupcode/components'
import NewOne from 'components/admin/accounting/transaction/banking/new'
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

NewOnePage.pageTitle = 'Account / New Transaction Banking'
NewOnePage.activeLink = 'admin/acounting/transaction/banking/new'

export default NewOnePage
