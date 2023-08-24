import React from 'react'
import { Row, Col } from '@blueupcode/components'
import ContractTypeComponent from 'components/admin/setting/contract/index'
import type { ExtendedNextPage } from '@blueupcode/components/types'
import withAdminAuth from 'components/auth/withAdminAuth'

const ContractTypePage: ExtendedNextPage = () => {
	return (
		<>
			<Row>
				<Col md={12}>
					<ContractTypeComponent />
				</Col>
			</Row>
		</>
	)
}

ContractTypePage.pageTitle = 'Contract Type'
ContractTypePage.activeLink = 'admin/setting/contract'

export default withAdminAuth(ContractTypePage) 
