import React from 'react'
import { Row, Col } from '@blueupcode/components'
import ProjectComponent from 'components/admin/project/index'
import type { ExtendedNextPage } from '@blueupcode/components/types'
import withAdminAuth from 'components/auth/withAdminAuth'

const ProjectPage: ExtendedNextPage = () => {
	return (
		<>
			<Row>
				<Col md={12}>
					<ProjectComponent />
				</Col>
			</Row>
		</>
	)
}

ProjectPage.pageTitle = 'Project'
ProjectPage.activeLink = 'admin/project'

export default withAdminAuth(ProjectPage) 
