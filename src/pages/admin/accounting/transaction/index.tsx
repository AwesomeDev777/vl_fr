import React from 'react'
import AccountTransaction from 'components/admin/accounting/transaction/index'
import type { ExtendedNextPage } from '@blueupcode/components/types'
import withAdminAuth from 'components/auth/withAdminAuth'

const AccountTransactionPage: ExtendedNextPage = () => {
	return (
		<>
            <AccountTransaction/>
		</>
	)
}

AccountTransactionPage.pageTitle = 'Account / Transaction'
AccountTransactionPage.activeLink = 'admin/acounting/transaction'

export default withAdminAuth(AccountTransactionPage) 
