import React from 'react'
import { Row, Col } from '@blueupcode/components'
import PaymentModeComponent from 'components/admin/setting/paymentmode/index'
import type { ExtendedNextPage } from '@blueupcode/components/types'
import withAdminAuth from 'components/auth/withAdminAuth'

const PaymentModePage: ExtendedNextPage = () => {
	return (
		<>
			<Row>
				<Col md={12}>
					<PaymentModeComponent />
				</Col>
			</Row>
		</>
	)
}

PaymentModePage.pageTitle = 'Payment Mode'
PaymentModePage.activeLink = 'admin/setting/paymentmode'

export default withAdminAuth(PaymentModePage) 
