import React from 'react'
import { Row, Col } from '@blueupcode/components'
import ItemFieldComponent from 'components/admin/setting/itemfield/index'
import type { ExtendedNextPage } from '@blueupcode/components/types'
import withAdminAuth from 'components/auth/withAdminAuth'

const ItemFieldPage: ExtendedNextPage = () => {
	return (
		<>
			<Row>
				<Col md={12}>
					<ItemFieldComponent />
				</Col>
			</Row>
		</>
	)
}

ItemFieldPage.pageTitle = 'Item Field'
ItemFieldPage.activeLink = 'admin/setting/itemfield'

export default withAdminAuth(ItemFieldPage) 
