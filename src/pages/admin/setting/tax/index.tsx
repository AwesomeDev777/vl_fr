import React from 'react'
import { Row, Col } from '@blueupcode/components'
import TaxComponent from 'components/admin/setting/tax/index'
import type { ExtendedNextPage } from '@blueupcode/components/types'
import withAdminAuth from 'components/auth/withAdminAuth'

const TaxPage: ExtendedNextPage = () => {
	return (
		<>
			<Row>
				<Col md={12}>
					<TaxComponent />
				</Col>
			</Row>
		</>
	)
}

TaxPage.pageTitle = 'Tax'
TaxPage.activeLink = 'admin/setting/tax'

export default withAdminAuth(TaxPage) 
