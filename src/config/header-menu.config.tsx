import { ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faAdjust,
	faCheck,
	faDice,
	faIcons,
	faPalette,
	faPencilRuler,
	faRulerCombined,
	faShapes,
	faThList,
	faUnlink,
	faUnlockAlt,
	faUserPlus,
	faWindowRestore,
} from '@fortawesome/free-solid-svg-icons'

/*
 * Header Menu Configuration
 * the object below is representation of the header menu configuration
 * there are some property you can use to customize your menu
 */

const HEADER_MENU: HEADER_MENU_INTERFACE = [
	{
		type: 'link',
		name: 'dashboard',
		title: 'Dashboard',
		link: '/',
	},
	{
		type: 'group',
		name: 'elements',
		title: 'Elements',
		child: [
			{
				type: 'group',
				name: 'base',
				title: 'Base',
				icon: <FontAwesomeIcon icon={faPalette} />,
				child: [
					{
						type: 'link',
						name: 'accordion',
						title: 'Accordion',
						link: '/elements/base/accordion',
					},
					{
						type: 'link',
						name: 'alert',
						title: 'Alert',
						link: '/elements/base/alert',
					},
					{
						type: 'link',
						name: 'badge',
						title: 'Badge',
						link: '/elements/base/badge',
					},
					{
						type: 'link',
						name: 'breadcrumb',
						title: 'Breadcrumb',
						link: '/elements/base/breadcrumb',
					},
					{
						type: 'link',
						name: 'button',
						title: 'Button',
						link: '/elements/base/button',
					},
					{
						type: 'link',
						name: 'button-group',
						title: 'Button Group',
						link: '/elements/base/button-group',
					},
					{
						type: 'link',
						name: 'card',
						title: 'Card',
						link: '/elements/base/card',
					},
					{
						type: 'link',
						name: 'dropdown',
						title: 'Dropdown',
						link: '/elements/base/dropdown',
					},
					{
						type: 'link',
						name: 'list-group',
						title: 'List Group',
						link: '/elements/base/list-group',
					},
					{
						type: 'link',
						name: 'marker',
						title: 'Marker',
						link: '/elements/base/marker',
					},
					{
						type: 'link',
						name: 'modal',
						title: 'Modal',
						link: '/elements/base/modal',
					},
					{
						type: 'link',
						name: 'nav',
						title: 'Navigation',
						link: '/elements/base/nav',
					},
					{
						type: 'link',
						name: 'offcanvas',
						title: 'Offcanvas',
						link: '/elements/base/offcanvas',
					},
					{
						type: 'link',
						name: 'pagination',
						title: 'Pagination',
						link: '/elements/base/pagination',
					},
					{
						type: 'link',
						name: 'placeholder',
						title: 'Placeholder',
						link: '/elements/base/placeholder',
					},
					{
						type: 'link',
						name: 'popover',
						title: 'Popover',
						link: '/elements/base/popover',
					},
					{
						type: 'link',
						name: 'progress',
						title: 'Progress',
						link: '/elements/base/progress',
					},
					{
						type: 'link',
						name: 'spinner',
						title: 'Spinner',
						link: '/elements/base/spinner',
					},
					{
						type: 'link',
						name: 'tab',
						title: 'Tab',
						link: '/elements/base/tab',
					},
					{
						type: 'link',
						name: 'table',
						title: 'Table',
						link: '/elements/base/table',
					},
					{
						type: 'link',
						name: 'tooltip',
						title: 'Tooltip',
						link: '/elements/base/tooltip',
					},
					{
						type: 'link',
						name: 'type',
						title: 'Typoghrapy',
						link: '/elements/base/type',
					},
				],
			},
			{
				type: 'group',
				name: 'advanced',
				title: 'Advanced',
				icon: <FontAwesomeIcon icon={faAdjust} />,
				child: [
					{
						type: 'link',
						name: 'avatar',
						title: 'Avatar',
						link: '/elements/advanced/avatar',
					},
					{
						type: 'link',
						name: 'carousel',
						title: 'Carousel',
						link: '/elements/advanced/carousel',
					},
					{
						type: 'link',
						name: 'chat',
						title: 'Chat',
						link: '/elements/advanced/chat',
					},
					{
						type: 'link',
						name: 'datetimepicker',
						title: 'Date Time Picker',
						link: '/elements/advanced/datetimepicker',
					},
					{
						type: 'link',
						name: 'grid-nav',
						title: 'Grid Nav',
						link: '/elements/advanced/grid-nav',
					},
					{
						type: 'link',
						name: 'rich-list',
						title: 'Rich List',
						link: '/elements/advanced/rich-list',
					},
					{
						type: 'link',
						name: 'sweet-alert',
						title: 'Sweet Alert',
						link: '/elements/advanced/sweet-alert',
					},
					{
						type: 'link',
						name: 'timeline',
						title: 'Timeline',
						link: '/elements/advanced/timeline',
					},
				],
			},
			{
				type: 'group',
				name: 'icons',
				title: 'Icons',
				icon: <FontAwesomeIcon icon={faIcons} />,
				child: [
					{
						type: 'link',
						name: 'feather',
						title: 'Feather',
						link: '/icons/feather',
					},
					{
						type: 'link',
						name: 'fontawesome',
						title: 'Font Awesome',
						link: '/icons/fontawesome',
					},
				],
			},
			{
				type: 'group',
				name: 'portlet',
				title: 'Portlet',
				icon: <FontAwesomeIcon icon={faWindowRestore} />,
				child: [
					{
						type: 'link',
						name: 'base',
						title: 'Base',
						link: '/portlet/base',
					},
					{
						type: 'link',
						name: 'tab',
						title: 'Tab',
						link: '/portlet/tab',
					},
				],
			},
			{
				type: 'group',
				name: 'widgets',
				title: 'Widgets',
				icon: <FontAwesomeIcon icon={faShapes} />,
				child: [
					{
						type: 'link',
						name: 'general',
						title: 'General',
						link: '/widgets/general',
					},
					{
						type: 'link',
						name: 'chart',
						title: 'Chart',
						link: '/widgets/chart',
					},
				],
			},
		],
	},
	{
		type: 'link',
		name: 'chart',
		title: 'Chart',
		link: '/chart/apex-chart',
	},
	{
		type: 'group',
		name: 'form',
		title: 'Form',
		child: [
			{
				type: 'link',
				name: 'base',
				title: 'Base',
				link: '/form/base',
				icon: <FontAwesomeIcon icon={faDice} />,
			},
			{
				type: 'group',
				name: 'editor',
				title: 'Editor',
				icon: <FontAwesomeIcon icon={faPencilRuler} />,
				child: [
					{
						type: 'link',
						name: 'basic',
						title: 'Basic',
						link: '/editor/basic',
					},
					{
						type: 'link',
						name: 'bubble',
						title: 'Bubble',
						link: '/editor/bubble',
					},
					{
						type: 'link',
						name: 'complex',
						title: 'Complex',
						link: '/editor/complex',
					},
				],
			},
			{
				type: 'link',
				name: 'group',
				title: 'Group',
				link: '/form/group',
				icon: <FontAwesomeIcon icon={faThList} />,
			},
			{
				type: 'link',
				name: 'layout',
				title: 'Layout',
				link: '/form/layout',
				icon: <FontAwesomeIcon icon={faRulerCombined} />,
			},
			{
				type: 'link',
				name: 'validation',
				title: 'Validation',
				link: '/form/validation',
				icon: <FontAwesomeIcon icon={faCheck} />,
			},
		],
	},
	{
		type: 'group',
		name: 'pages',
		title: 'Pages',
		child: [
			{
				type: 'group',
				name: 'login',
				title: 'Login',
				icon: <FontAwesomeIcon icon={faUnlockAlt} />,
				child: [
					{
						type: 'link',
						name: 'login-1',
						title: 'Login 1',
						link: '/pages/login/login-1',
					},
					{
						type: 'link',
						name: 'login-2',
						title: 'Login 2',
						link: '/pages/login/login-2',
					},
				],
			},
			{
				type: 'group',
				name: 'register',
				title: 'Register',
				icon: <FontAwesomeIcon icon={faUserPlus} />,
				child: [
					{
						type: 'link',
						name: 'register-1',
						title: 'Register 1',
						link: '/pages/register/register-1',
					},
					{
						type: 'link',
						name: 'register-2',
						title: 'Register 2',
						link: '/pages/register/register-2',
					},
				],
			},
			{
				type: 'group',
				name: 'error',
				title: 'Error',
				icon: <FontAwesomeIcon icon={faUnlink} />,
				child: [
					{
						type: 'link',
						name: 'error-1',
						title: 'Error 1',
						link: '/pages/error/error-1',
					},
					{
						type: 'link',
						name: 'error-2',
						title: 'Error 2',
						link: '/pages/error/error-2',
					},
				],
			},
		],
	},
]

export type HEADER_MENU_INTERFACE = Array<HEADER_MENU_LINK_INTERFACE | HEADER_MENU_GROUP_INTERFACE>

export interface HEADER_MENU_LINK_INTERFACE {
	type: 'link'
	name: string
	title: string
	link: string
	icon?: ReactNode
}

export interface HEADER_MENU_GROUP_INTERFACE {
	type: 'group'
	name: string
	title: string
	icon?: ReactNode
	child: Array<HEADER_MENU_LINK_INTERFACE | HEADER_MENU_GROUP_INTERFACE>
}

export default HEADER_MENU
