import React from 'react'
import withAdminAuth from 'components/auth/withAdminAuth'
import Widget1 from 'components/admin/dashboard/widget1'
import Widget2 from 'components/admin/dashboard/widget2'
import Widget3 from 'components/admin/dashboard/widget3'
import Widget4 from 'components/admin/dashboard/widget4'
import Widget5 from 'components/admin/dashboard/widget5'
import { Row, Col } from '@blueupcode/components'
import type { ExtendedNextPage } from '@blueupcode/components/types'

const DashboardPage: ExtendedNextPage = () => {
	return (
		<>
			<Row>
				<Col>
					<Widget1 />
				</Col>
			</Row>
			<Row>
				<Col md = "8">
					{/* <Widget2 /> */}
					<Row>
						<Col>
							<Widget3/>
						</Col>
					</Row>
				</Col>
				<Col md = "4">
					<Widget4/>
					<Widget5/>
				</Col>
			</Row>
		</>
	)
}

DashboardPage.pageTitle = 'Dashboard'
DashboardPage.activeLink = 'dashboard'

export default withAdminAuth(DashboardPage)
