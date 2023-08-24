import React from 'react'
import { Row, Col } from '@blueupcode/components'
import ExpenseCategoryComponent from 'components/admin/setting/expensecategory/index'
import type { ExtendedNextPage } from '@blueupcode/components/types'
import withAdminAuth from 'components/auth/withAdminAuth'

const expenseCategoryPage: ExtendedNextPage = () => {
	return (
		<>
			<Row>
				<Col md={12}>
					<ExpenseCategoryComponent />
				</Col>
			</Row>
		</>
	)
}

expenseCategoryPage.pageTitle = 'Expense Category'
expenseCategoryPage.activeLink = 'admin/setting/expensecategory'

export default withAdminAuth(expenseCategoryPage) 
