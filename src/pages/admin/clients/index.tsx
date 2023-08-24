import React from 'react'
import { Row, Col } from '@blueupcode/components'
import ClientComponent from 'components/admin/client/index'
import type { ExtendedNextPage } from '@blueupcode/components/types'
import withAdminAuth from 'components/auth/withAdminAuth'

const ClientPage: ExtendedNextPage = () => {
	return (
		<>
			<Row>
				<Col md={12}>
					<ClientComponent />
				</Col>
			</Row>
		</>
	)
}

ClientPage.pageTitle = 'Client'
ClientPage.activeLink = 'admin/client'

export default withAdminAuth(ClientPage) 
