import React from 'react'
import ChartofAccountComponent from 'components/admin/accounting/chart/index'
import type { ExtendedNextPage } from '@blueupcode/components/types'
import withAdminAuth from 'components/auth/withAdminAuth'

const ChartAccountPage: ExtendedNextPage = () => {
	return (
		<>
            <ChartofAccountComponent/>
		</>
	)
}

ChartAccountPage.pageTitle = 'Chart of Accounts'
ChartAccountPage.activeLink = 'admin/accounting/chart'

export default withAdminAuth(ChartAccountPage) 
