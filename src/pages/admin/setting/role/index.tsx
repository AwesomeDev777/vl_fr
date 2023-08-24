import React from 'react'
import { Row, Col } from '@blueupcode/components'
import RoleComponent from 'components/admin/setting/role/index'
import type { ExtendedNextPage } from '@blueupcode/components/types'
import withAdminAuth from 'components/auth/withAdminAuth'

const RolePage: ExtendedNextPage = () => {
	return (
		<>
			<Row>
				<Col md={12}>
					<RoleComponent />
				</Col>
			</Row>
		</>
	)
}

RolePage.pageTitle = 'Role'
RolePage.activeLink = 'admin/setting/role'

export default withAdminAuth(RolePage) 
