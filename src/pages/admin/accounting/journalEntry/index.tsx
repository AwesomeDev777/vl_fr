import React from 'react'
import JournalEntry from 'components/admin/accounting/journalEntry/index'
import type { ExtendedNextPage } from '@blueupcode/components/types'
import withAdminAuth from 'components/auth/withAdminAuth'

const JournalEntryPage: ExtendedNextPage = () => {
	return (
		<>
            <JournalEntry/>
		</>
	)
}

JournalEntryPage.pageTitle = 'Acounting / Journal Entry'
JournalEntryPage.activeLink = 'admin/accounting/journalEntry'

export default withAdminAuth(JournalEntryPage) 
