import React from 'react'
import { Col, Marker, Portlet, Row, Table, useTheme } from '@blueupcode/components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInbox } from '@fortawesome/free-solid-svg-icons'
import { ApexOptions } from 'apexcharts'
import Chart from '@blueupcode/apexcharts'

const Widget3 = () => {
	const [indicators] = React.useState([
		<>
			<Marker type="dot" variant="dark" /> 10% Not Started 
		</>,
		<>
			<Marker type="dot" variant="success" /> 10% In Progress
		</>,
		<>
			<Marker type="dot" variant="danger" /> 0% On Hold
		</>,
		<>
			<Marker type="dot" variant="warning" /> 30% Cancelled
		</>,
		<>
			<Marker type="dot" variant="primary" /> 50% Finished
		</>
	])

	const [chartSeries] = React.useState([1, 1, 0, 3, 5])

	return (
		<Portlet>
			<Portlet.Header bordered>
				<Portlet.Icon>
					<FontAwesomeIcon icon={faInbox} />
				</Portlet.Icon>
				<Portlet.Title>Statistics by Project Status</Portlet.Title>
			</Portlet.Header>
			<Portlet.Body>
				<Row>
					<Col >
						<Widget25ComponentChart series={chartSeries} />
						<div className="d-flex justify-content-around mt-4">
							{indicators.map((indicator, index) => (
								<span key={index} className="text-muted">
									{indicator}
								</span>
							))}
						</div>
					</Col>
					
				</Row>
			</Portlet.Body>
		</Portlet>
	)
}

const Widget25ComponentChart: React.FC<Widget25ComponentChartProps> = (props) => {
	const { resolvedTheme: theme } = useTheme()

	const [options, setOptions] = React.useState<ApexOptions>({
		theme: {
			mode: theme as ApexTheme['mode'],
			palette: 'palette1',
		},
		chart: {
			background: 'transparent',
		},
		stroke: {
			colors: [theme === 'dark' ? '#424242' : '#fff'],
		},
		labels: ['Not Started', 'In Progress', 'On Hold', 'Cancelled', 'Finished'],
		colors: ['#444444', '#2196f3', '#ff3333','#ffd700', '#4caf50',],
		tooltip: {
			fillSeriesColor: false,
			y: {
				formatter: (val) => currency.format(val), // Format chart tooltip value
			},
		},
		legend: {
			show: false,
		},
		dataLabels: {
			enabled: false,
		},
	})

	React.useEffect(() => {
		setOptions((prevOptions) => ({
			...prevOptions,
			mode: theme,
			palette: 'palette1',
			stroke: {
				colors: [theme === 'dark' ? '#424242' : '#fff'],
			},
		}))
	}, [theme])

	return <></>

	// return (
	// 	<Chart
	// 		type="donut"
	// 		width={300}
	// 		height="auto"
	// 		options={options}
	// 		series={props.series}
	// 		className="d-flex justify-content-center"
	// 	/>
	// )
}

interface Widget25ComponentChartProps {
	series: ApexAxisChartSeries | ApexNonAxisChartSeries
}

// Currency formatter
const currency = new Intl.NumberFormat('en-US', {
	// style: 'currency',
	// currency: 'USD',
	minimumFractionDigits: 0,
})

export default Widget3
