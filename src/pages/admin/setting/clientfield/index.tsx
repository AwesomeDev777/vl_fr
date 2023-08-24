import React from 'react'
import { Row, Col } from '@blueupcode/components'
import ClientFieldComponent from 'components/admin/setting/clientfield/index'
import type { ExtendedNextPage } from '@blueupcode/components/types'
import withAdminAuth from 'components/auth/withAdminAuth'

const ClientFieldPage: ExtendedNextPage = () => {
	return (
		<>
			<Row>
				<Col md={12}>
					<ClientFieldComponent />
				</Col>
			</Row>
		</>
	)
}

ClientFieldPage.pageTitle = 'Client Field'
ClientFieldPage.activeLink = 'admin/setting/clientfield'

export default withAdminAuth(ClientFieldPage) 
