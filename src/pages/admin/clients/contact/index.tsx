import React from 'react'
import { Row, Col } from '@blueupcode/components'
import ContactComponent from 'components/admin/client/contact/index'
import type { ExtendedNextPage } from '@blueupcode/components/types'
import withAdminAuth from 'components/auth/withAdminAuth'

const ContactPage: ExtendedNextPage = () => {
	return (
		<>
			<Row>
				<Col md={12}>
					<ContactComponent />
				</Col>
			</Row>
		</>
	)
}

ContactPage.pageTitle = 'Contacts'
ContactPage.activeLink = 'admin/clients/contact'

export default withAdminAuth(ContactPage) 
