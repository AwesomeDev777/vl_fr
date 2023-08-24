import React from 'react'
import { Row, Col } from '@blueupcode/components'
import CurrencyComponent from 'components/admin/setting/currency/index'
import type { ExtendedNextPage } from '@blueupcode/components/types'
import withAdminAuth from 'components/auth/withAdminAuth'

const CurrencyPage: ExtendedNextPage = () => {
	return (
		<>
			<Row>
				<Col md={12}>
					<CurrencyComponent />
				</Col>
			</Row>
		</>
	)
}

CurrencyPage.pageTitle = 'Currency'
CurrencyPage.activeLink = 'admin/setting/currency'

export default withAdminAuth(CurrencyPage) 
