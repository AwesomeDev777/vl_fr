import React from 'react'
import Router from 'next/router'
import authAdminVerifyCookie from './authAdminVerifyCookie'
import PAGE from 'config/page.config'
import type { AdditionalNextPageProps, ExtendedNextPage } from '@blueupcode/components/types'
import type { NextPageContext } from 'next'

const withAdminGuest = (PageComponent: any) => {
	
	// Initialize wrapper component
	const WrapperComponent: ExtendedNextPage = (props) => {
		return <PageComponent {...props} />
	}

	WrapperComponent.getInitialProps = async (ctx: NextPageContext) => {

		// Get initial properties from page component
		const initialProps = PageComponent.getInitialProps ? await PageComponent.getInitialProps(ctx) : {}
		// Verify user token from cookie
		const userData = await authAdminVerifyCookie(ctx)

		// Check whether user token is valid
		if (userData) {
			// Redirect to home page
			if (ctx.res) {
				ctx.res.writeHead(302, {
					Location: ctx.query.redirect || PAGE.AdminhomePagePath,
				})
				ctx.res.end()
			} else {
				Router.push((Router.query.redirect as string) || PAGE.AdminhomePagePath)
			}

			return {
				...initialProps,
				userData,
			}
		}

		return {
			...initialProps,
			userData: null,
		}
	}

	// Inject page component attributes to wrapper component
	return Object.assign(WrapperComponent, PageComponent)
}

export default withAdminGuest
