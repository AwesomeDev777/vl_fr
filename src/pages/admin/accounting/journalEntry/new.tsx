import React from 'react'
import { Row, Col } from '@blueupcode/components'
import NewOne from 'components/admin/accounting/journalEntry/new'
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

NewOnePage.pageTitle = 'Acounting / New JournalEntryPage'
NewOnePage.activeLink = 'admin/accounting/journalEntry/new'

export default NewOnePage
