import React from 'react'
import { Col, Portlet, ProgressBar, Row, Widget10, Widget4, Widget8 } from '@blueupcode/components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faFileAlt, faFileArchive } from '@fortawesome/free-regular-svg-icons'
import { ProgressBarVariant } from '@blueupcode/components/progress/ProgressBar'

const Widget2 = () => {
	const [invoice] = React.useState([
		{
			title: 'Draft',
			highlight: '0.00%',
			progress: 0,
			isProgress: true,
			variant: "dark",
            num: 0
		},{
			title: 'Not Sent',
			highlight: '100%',
			progress: 100,
			isProgress: true,
			variant: "danger",
            num: 2
		},{
			title: 'Un paid',
			highlight: '100%',
			progress: 100,
			isProgress: true,
			variant: "secondary",
            num: 2
		},{
			title: 'Partially Paid',
			highlight: '0.00%',
			progress: 0,
			isProgress: true,
			variant: "info",
            num: 0
		},{
			title: 'Overdue',
			highlight: '0.00%',
			progress: 0,
			isProgress: true,
			variant: "warning",
            num: 0
		},{
			title: 'Paid',
			highlight: '0.00%',
			progress: 0,
			isProgress: true,
			variant: "success",
            num: 0
		},
	])
    const [estimate] = React.useState([
		{
			title: 'Draft',
			highlight: '30%',
			progress: 30,
			isProgress: true,
			variant: "dark",
            num: 0
		},{
			title: 'Not Sent',
			highlight: '20%',
			progress: 20,
			isProgress: true,
			variant: "danger",
            num: 2
		},{
			title: 'Sent',
			highlight: '10%',
			progress: 10,
			isProgress: true,
			variant: "primary",
            num: 2
		},{
			title: 'Expired',
			highlight: '80%',
			progress: 80,
			isProgress: true,
			variant: "warning",
            num: 0
		},{
			title: 'Declined',
			highlight: '40%',
			progress: 40,
			isProgress: true,
			variant: "warning",
            num: 0
		},{
			title: 'Accepted',
			highlight: '65%',
			progress: 65,
			isProgress: true,
			variant: "success",
            num: 0
		},
	])
    const [proposal] = React.useState([
		{
			title: 'Draft',
			highlight: '0.00%',
			progress: 0,
			isProgress: true,
			variant: "dark",
            num: 0
		},{
			title: 'Sent',
			highlight: '100%',
			progress: 100,
			isProgress: true,
			variant: "primary",
            num: 2
		},{
			title: 'Open',
			highlight: '0%',
			progress: 0,
			isProgress: true,
			variant: "danger",
            num: 2
		},{
			title: 'Revised',
			highlight: '0.00%',
			progress: 0,
			isProgress: true,
			variant: "warning",
            num: 0
		},{
			title: 'Declined',
			highlight: '100%',
			progress: 100,
			isProgress: true,
			variant: "warning",
            num: 0
		},{
			title: 'Accepted',
			highlight: '70%',
			progress: 70,
			isProgress: true,
			variant: "success",
            num: 0
		},
	])
       
    const [list] = React.useState([
		{
			highlight: 'Outstanding Invoices',
			title: '6,35€'
		},
		{
			highlight: 'Past Due Invoices',
			title: '0,00€'
		},
		{
			highlight: 'Paid Invoices',
			title: '0,00€'
		},
	])

	return (
        <Portlet>
            <Portlet.Body>				
                <Row className="g-2">
                    <Col>
                        <Portlet >
                            <Portlet.Header>
                                <Portlet.Icon>
                                    <FontAwesomeIcon icon={faFileAlt} />
                                </Portlet.Icon>
                                <Portlet.Title>Invoice overview</Portlet.Title>
                            </Portlet.Header>
                            {invoice.map((data, index) => (
                                <Portlet.Body key={index}>
                                    <Widget7ComponentProgress
                                        title={data.title}
                                        highlight={data.highlight}
                                        variant={data.variant}
                                        num={data.num}
                                        progress={data.progress as number}
                                    />
                                </Portlet.Body>  
                            ))}                             
                        </Portlet>
                    </Col>
                    <Col>
                        <Portlet >
                            <Portlet.Header>
                                <Portlet.Icon>
                                    <FontAwesomeIcon icon={faFile} />
                                </Portlet.Icon>
                                <Portlet.Title>Estimate overview</Portlet.Title>
                            </Portlet.Header>
                            {estimate.map((data, index) => (
                                <Portlet.Body key={index}>
                                    <Widget7ComponentProgress
                                        title={data.title}
                                        highlight={data.highlight}
                                        variant={data.variant}
                                        num={data.num}
                                        progress={data.progress as number}
                                    />
                                </Portlet.Body>  
                            ))}                             
                        </Portlet>
                    </Col>
                    <Col>
                        <Portlet >
                            <Portlet.Header>
                                <Portlet.Icon>
                                    <FontAwesomeIcon icon={faFileArchive} />
                                </Portlet.Icon>
                                <Portlet.Title>Proposal overview</Portlet.Title>
                            </Portlet.Header>
                            {proposal.map((data, index) => (
                                <Portlet.Body key={index}>
                                    <Widget7ComponentProgress
                                        title={data.title}
                                        highlight={data.highlight}
                                        variant={data.variant}
                                        num={data.num}
                                        progress={data.progress as number}
                                    />
                                </Portlet.Body>  
                            ))}                             
                        </Portlet>
                    </Col>
				</Row>
                <Row>
                    <Widget10 vertical="lg">
                        {list.map((data, index) => (
                            <Col key={index}>
                                <Portlet className="g-2">
                                    <Portlet.Body>
                                        <Widget10.Item >
                                            <Widget10.Content>
                                                <Widget10.Title>{data.highlight}</Widget10.Title>
                                                <Widget10.Subtitle>{data.title}</Widget10.Subtitle>
                                            </Widget10.Content>
                                        </Widget10.Item>
                                    </Portlet.Body>
                                </Portlet>
                            </Col>
                        ))}
                    </Widget10>
                </Row>
            </Portlet.Body>    
        </Portlet>
	)
}

const Widget7ComponentDisplay: React.FC<Widget7ComponentDisplayProps> = ({ title, highlight, ...props }) => {
	return (
		<Widget4 {...props}>
			<Widget4.Group>
				<Widget4.Display>
					<Widget4.Subtitle>{title}</Widget4.Subtitle>
					<Widget4.Highlight>{highlight}</Widget4.Highlight>
				</Widget4.Display>
			</Widget4.Group>
		</Widget4>
	)
}

interface Widget7ComponentDisplayProps {
	title: string
	highlight: string
}

const Widget7ComponentProgress: React.FC<Widget7ComponentProgressProps> = ({
	title,
	highlight,
	progress,
    variant,
    num,
	...props
}) => {
	return (
		<Widget4 {...props}>
			<Widget4.Group>
				<Widget4.Display>
                    <Row>
                        <Col md={1}>
                            {num}
                        </Col>
                        <Col md={11}>
                            <Widget4.Subtitle>{title}</Widget4.Subtitle>
                        </Col>
                    </Row>
				</Widget4.Display>
				<Widget4.Addon>
					<Widget4.Subtitle>{highlight}</Widget4.Subtitle>
				</Widget4.Addon>
			</Widget4.Group>
			<ProgressBar striped now={progress} variant={variant as ProgressBarVariant} />
		</Widget4>
	)
}

interface Widget7ComponentProgressProps {
	title: string
	highlight: string
	progress: number
    variant: string
    num: number
}

export default Widget2
