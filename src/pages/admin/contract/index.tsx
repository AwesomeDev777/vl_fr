import React from 'react'
import { Row, Col } from '@blueupcode/components'
import Allcontract from 'components/admin/contract/index'
import type { ExtendedNextPage } from '@blueupcode/components/types'
import withAdminAuth from 'components/auth/withAdminAuth'

const ContractPage: ExtendedNextPage = () => {
	return (
		<>
			<Row>
				<Col md={12}>
					<Allcontract />
				</Col>
			</Row>
		</>
	)
}

ContractPage.pageTitle = 'Contract'
ContractPage.activeLink = 'admin/contract'

export default withAdminAuth(ContractPage) 
