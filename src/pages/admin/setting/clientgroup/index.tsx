import React from 'react'
import { Row, Col } from '@blueupcode/components'
import ClientGroupComponent from 'components/admin/setting/clientgroup/index'
import type { ExtendedNextPage } from '@blueupcode/components/types'
import withAdminAuth from 'components/auth/withAdminAuth'

const ClientGroupPage: ExtendedNextPage = () => {
	return (
		<>
			<Row>
				<Col md={12}>
					<ClientGroupComponent />
				</Col>
			</Row>
		</>
	)
}

ClientGroupPage.pageTitle = 'Client Group'
ClientGroupPage.activeLink = 'admin/setting/clientgroup'

export default withAdminAuth(ClientGroupPage) 
