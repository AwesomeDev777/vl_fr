import React from 'react'
import { Badge, Marker, Portlet, Timeline, Widget7 } from '@blueupcode/components'
import { MarkerVariant } from '@blueupcode/components/marker/Marker'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListAlt } from '@fortawesome/free-solid-svg-icons'

const Widget4 = () => {
	const [list] = React.useState([
		{
			color: 'success',
			body: 'Oleksandr - Added Created the project',
            footer: 'Project Name: Test',
			header: '3 days ago'
		},{
			color: 'primary',
			body: 'Oleksandr - Added Edited the project',
            footer: 'Project Name: Test',
			header: '3 days ago'
		},{
			color: 'danger',
			body: 'Oleksandr - Added Deleted the project',
            footer: 'Project Name: Test',
			header: '3 days ago'
		},{
			color: 'primary',
			body: 'Oleksandr - Added Edited the contract',
            footer: 'Project Name: Test',
			header: '3 minutes ago'
		},{
			color: 'danger',
			body: 'Oleksandr - Added Deleted the project',
            footer: 'Project Name: Test',
			header: '3 minutes ago'
		},{
			color: 'success',
			body: 'Oleksandr - Added Created the project',
            footer: 'Project Name: Test',
			header: '3 minutes ago'
		},
	])

	return (
		<Portlet>
			<Portlet.Header>
				<Portlet.Icon>
					<FontAwesomeIcon icon={faListAlt} />
				</Portlet.Icon>
				<Portlet.Title>Latest Project Activity</Portlet.Title>
			</Portlet.Header>
			<Portlet.Body>
				<Portlet noMargin className="h-100">
					<Portlet.Body>
						{/* BEGIN Timeline */}
						<Timeline>
							{list.map((data, index) => (
								<Timeline.Item key={index} pin={<Marker type="dot" variant={data.color as MarkerVariant} />}>
									{/* BEGIN Widget */}
									{/* <Widget7> */}
                                        <Portlet>
                                            
    										<Widget7.Time>{data.header}</Widget7.Time>
                                            <Portlet.Header>
                                                <Widget7.Text>{data.body}</Widget7.Text>
                                            </Portlet.Header>
                                            <Portlet.Body>                                            
                                                <Widget7.Text>{data.footer}</Widget7.Text>
                                            </Portlet.Body>
                                        </Portlet>
									{/* </Widget7> */}
									{/* END Widget */}
								</Timeline.Item>
							))}
						</Timeline>
						{/* END Timeline */}
					</Portlet.Body>
				</Portlet>
			</Portlet.Body>
		</Portlet>
	)
}

export default Widget4
