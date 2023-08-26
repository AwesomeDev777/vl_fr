import dynamic from 'next/dynamic'
import AsideAddon from './AsideAddon'
import AsideBody from './AsideBody'
import AsideHeader from './AsideHeader'
import AsideTitle from './AsideTitle'
import Aside from "./Aside"

// const Aside = dynamic(() => import('./Aside'), {
// 	ssr: false,
// })

export default Object.assign(Aside, {
	Body: AsideBody,
	Header: AsideHeader,
	Title: AsideTitle,
	Addon: AsideAddon,
})
