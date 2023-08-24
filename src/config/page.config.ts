import type { Direction } from '@blueupcode/components/types'
import { LayoutNames } from 'components/layout/getLayout'

/*
 * Page Configuration
 * you can customize general page configuration in the object below
 */

const PAGE: PAGE_INTERFACE = {
	appName: 'Vlblum',
	favicon: '/images/favicon.ico',
	enableContainerFluid: true,
	defaultLayoutName: 'default',
	defaultDirection: 'ltr',
	menuLinkSeparator: '.',
	loginPagePath: '/login',
	homePagePath: '/',
	AdminhomePagePath: '/admin/',
	AdminloginPagePath: '/admin/login',
}

export interface PAGE_INTERFACE {
	appName: string
	favicon: string
	enableContainerFluid: boolean
	defaultLayoutName: LayoutNames
	defaultDirection: Direction
	menuLinkSeparator: string
	loginPagePath: string
	homePagePath: string
	AdminhomePagePath: string
	AdminloginPagePath: string
}

export default PAGE
