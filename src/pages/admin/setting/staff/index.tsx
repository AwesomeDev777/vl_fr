import React from 'react'
import { Row, Col } from '@blueupcode/components'
import StaffComponent from 'components/admin/setting/staff/index'
import type { ExtendedNextPage } from '@blueupcode/components/types'
import withAdminAuth from 'components/auth/withAdminAuth'

const StaffPage: ExtendedNextPage = () => {
	return (
		<>
			<Row>
				<Col md={12}>
					<StaffComponent />
				</Col>
			</Row>
		</>
	)
}

StaffPage.pageTitle = 'Staff'
StaffPage.activeLink = 'admin/setting/staff'

export default withAdminAuth(StaffPage) 
