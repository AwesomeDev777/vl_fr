import React from 'react'
import { Portlet, useTheme } from '@blueupcode/components'
import { ApexOptions } from 'apexcharts'
import Chart from '@blueupcode/apexcharts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileCircleCheck} from '@fortawesome/free-solid-svg-icons'

const Widget3 = () => {
	const [data] = React.useState({
		title: 'Payment Records',
	})

	const [chartSeries] = React.useState([
		{
			name: 'This Week Payment',
			data: [69, 25, 10, 15, 58, 63, 60],
		},
		{
			name: 'Last Week Payment',
			data: [85, 101, 98, 87, 105, 91, 114],
		},
	])

	return (
		<Portlet>
			<Portlet.Header>		
				<Portlet.Icon>
					<FontAwesomeIcon icon={faFileCircleCheck} />
				</Portlet.Icon>
				<Portlet.Title>Payment Record</Portlet.Title>
			</Portlet.Header>
			<Portlet.Body>
				<Widget30ComponentChart series={chartSeries} />
			</Portlet.Body>
		</Portlet>
	)
}

const Widget30ComponentChart: React.FC<Widget30ComponentChartProps> = (props) => {
	const { resolvedTheme: theme } = useTheme()

	const [options, setOptions] = React.useState<ApexOptions>({
		theme: {
			mode: theme as ApexTheme['mode'],
			palette: 'palette1',
		},
		chart: {
			background: 'transparent',
		},
		plotOptions: {
			bar: {
				horizontal: false,
				columnWidth: '55%',
			},
		},
		dataLabels: {
			enabled: false,
		},
		colors: ['#F0E68C', '#FF69B4',],
		stroke: {
			show: true,
			width: 2,
			colors: ['transparent'],
		},
		xaxis: {
			categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
		},
		fill: {
			opacity: 1,
		},
		tooltip: {
			y: {
				formatter: (val) => `$ ${val}`,
			},
		},
	})

	React.useEffect(() => {
		setOptions((prevOptions) => ({
			...prevOptions,
			mode: theme,
			palette: 'palette1',
		}))
	}, [theme])

	return <Chart type="bar" width="100%" height={350} options={options} series={props.series} />
}

interface Widget30ComponentChartProps {
	series: ApexAxisChartSeries | ApexNonAxisChartSeries
}

// Currency formatter
const currency = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 0,
})

export default Widget3
