import React from 'react'
import { Row, Col } from '@blueupcode/components'
import DepartmentComponent from 'components/admin/setting/department/index'
import type { ExtendedNextPage } from '@blueupcode/components/types'
import withAdminAuth from 'components/auth/withAdminAuth'

const DepartmentPage: ExtendedNextPage = () => {
	return (
		<>
			<Row>
				<Col md={12}>
					<DepartmentComponent />
				</Col>
			</Row>
		</>
	)
}

DepartmentPage.pageTitle = 'Department'
DepartmentPage.activeLink = 'admin/setting/department'

export default withAdminAuth(DepartmentPage) 
