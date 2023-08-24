import React from 'react'
import Transfer from 'components/admin/accounting/transfer/index'
import type { ExtendedNextPage } from '@blueupcode/components/types'
import withAdminAuth from 'components/auth/withAdminAuth'

const TransferPage: ExtendedNextPage = () => {
	return (
		<>
            <Transfer/>
		</>
	)
}

TransferPage.pageTitle = 'Acounting / TransferPage'
TransferPage.activeLink = 'admin/accounting/transfer'

export default withAdminAuth(TransferPage) 
