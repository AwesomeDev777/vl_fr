import React from 'react'
import { Avatar, Dropdown, Portlet, RichList, Button, Badge, GridNav, Widget13 } from '@blueupcode/components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faAddressCard,
	faCalendarTimes,
} from '@fortawesome/free-regular-svg-icons'
import { faLanguage, faUserAlt, } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from 'components/auth/authContext'
import Router from 'next/router'
import PAGE from 'config/page.config'
import type { ButtonVariant } from '@blueupcode/components/types'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from 'store/actions'
import Image from 'next/image'
import { useRouter } from 'next/router';

const isEmpty = require('utils/is-empty')

const LayoutHeaderAdminUser: React.FC<LayoutHeaderAdminUserProps> = ({ variant }) => {
	const dispatch = useDispatch()
    const router = useRouter()
	const userDataFromStore = useSelector((state: any) => state.auth.user)
    const [email, setEmail] = React.useState('')
    const [firstname, setFirstname] = React.useState('')
    const [profile_image, setProfile_image] = React.useState('')
    const [id, setId] = React.useState('')
	const { userData } = useAuth()
	React.useEffect(() => {
		if(userDataFromStore.email !== undefined){
			setEmail(userDataFromStore.email)
			setFirstname(userDataFromStore.firstname)
			setProfile_image(userDataFromStore.profile_image)
			setId(userDataFromStore._id)
		}else{
			setEmail(userData?.email)
			setFirstname(userData?.firstname)
			setProfile_image(userData?.profile_image)
			setId(userData?._id)
		}
	}, [userData])
	
	const handleClick = (data: any) => {
		if(data.title == 'Profile')
		{
			router.push({pathname : '/admin/profile', query: {id: id}})
		}
	}
	const DisplayImage = (props: any) => {
		const profile_image = props.image
        const src = '/uploads/profile_images/' + profile_image
        if(profile_image === undefined || isEmpty(profile_image)){
            return (<FontAwesomeIcon icon={faUserAlt} />)
        } else{
            return (
                <div style={{position: "relative", width:"31px", height: "31px"}}>                
                    <Image src={src} layout="fill" alt="Avatar image" />
                </div>
			)
        }
    }
	
	const handleLogout = async () => {
		// Sign out with Firebase
		await dispatch(logoutUser())

		// Redirect to login page
		Router.push(PAGE.AdminloginPagePath)
	}

	const [navigationData] = React.useState([
		[
			{
				icon: <FontAwesomeIcon icon={faAddressCard} />,
				title: 'Profile',
			},
			{
				icon: <FontAwesomeIcon icon={faCalendarTimes} />,
				title: 'Timesheets',
			},
			{
				icon: <FontAwesomeIcon icon={faLanguage} />,
				title: 'Language',
			},
		]
	])

	return (
		<Dropdown>
			<Widget13 variant={variant} noCaret>
				<Widget13.Text>
					Hi <strong>{firstname}</strong>
				</Widget13.Text>
				{/* BEGIN Avatar */}
				<Widget13.Avatar variant="info" display>
					{/* <div style={displayImage}> */}
						<DisplayImage image={profile_image}/>
					{/* </div> */}
				</Widget13.Avatar>
				{/* END Avatar */}
			</Widget13>
			<Dropdown.Menu wide animated align="end" className="overflow-hidden py-0">
				{/* BEGIN Portlet */}
				<Portlet scroll className="border-0">
					<Portlet.Header className="bg-primary rounded-0">
						{/* BEGIN Rich List */}
						<RichList.Item className="w-100 p-0">
							<RichList.Addon addonType="prepend">
								<Avatar variant="label-light" display circle>
									<DisplayImage image={profile_image}/>
								</Avatar>
							</RichList.Addon>
							<RichList.Content>
								<RichList.Title className="text-white">{firstname ?? 'Guest'}</RichList.Title>
								<RichList.Subtitle className="text-white">{email ?? 'No email'}</RichList.Subtitle>
							</RichList.Content>
							{/* <RichList.Addon addonType="append">
								<Badge variant="label-light" className="fs-6">
									9+
								</Badge>
							</RichList.Addon> */}
						</RichList.Item>
						{/* END Rich List */}
					</Portlet.Header>
					<Portlet.Body className="p-0">
						{/* BEGIN Grid Nav */}
						<GridNav flush action noRounded>
							{navigationData.map((navigationRow, index) => (
								<GridNav.Row key={index}>
									{navigationRow.map((nativationItem, index) => {
										return (
											<GridNav.Item key={index} icon={nativationItem.icon} onClick={() => handleClick(nativationItem)}>
												{nativationItem.title}
											</GridNav.Item>
										)
									})}
								</GridNav.Row>
							))}
						</GridNav>
						{/* END Grid Nav */}
					</Portlet.Body>
					<Portlet.Footer bordered className="rounded-0" onClick={handleLogout}>
						<Button variant="label-danger">Sign out</Button>
					</Portlet.Footer>
				</Portlet>
				{/* END Portlet */}
			</Dropdown.Menu>
		</Dropdown>
	)
}

interface LayoutHeaderAdminUserProps {
	variant: ButtonVariant
}

export default LayoutHeaderAdminUser
