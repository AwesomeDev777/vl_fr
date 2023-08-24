import React from 'react'
import { Dropdown, Badge, Button, GridNav } from '@blueupcode/components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxes, faProjectDiagram, faTasks, faDollarSign, faUserCog } from '@fortawesome/free-solid-svg-icons'
import {
	faWindowRestore,
	faClipboard,
	faQuestionCircle,
	faImages,
	faChartBar,
	faBookmark,
} from '@fortawesome/free-regular-svg-icons'
import Link from 'next/link'

const LayoutHeaderNav: React.FC = () => {
	return (
		<>
			{/* BEGIN Dropdown */}
			<Dropdown className="d-inline">
				<Dropdown.Toggle variant="flat-primary" width="wider" noCaret active>
					Quick
				</Dropdown.Toggle>
				<Dropdown.Menu align="start" animated>
					<Dropdown.Item
						icon={<FontAwesomeIcon icon={faBoxes} />}
						addon={
							<Badge variant="warning" pill>
								20
							</Badge>
						}
					>
						Inventory Manager
					</Dropdown.Item>
					{/* BEGIN Dropdown Submenu */}
					<Dropdown.Submenu>
						<Dropdown.Item icon={<FontAwesomeIcon icon={faProjectDiagram} />} caret>
							Project manager
						</Dropdown.Item>
						<Dropdown.SubmenuMenu align="end">
							<Dropdown.Item bullet>Create project</Dropdown.Item>
							<Dropdown.Item bullet>Delete project</Dropdown.Item>
							<Dropdown.Item bullet>Ongoing project</Dropdown.Item>
							<Dropdown.Item bullet>Completed project</Dropdown.Item>
							<Dropdown.Item bullet>Urgent project</Dropdown.Item>
						</Dropdown.SubmenuMenu>
					</Dropdown.Submenu>
					{/* END Dropdown Submenu */}
					{/* BEGIN Dropdown Submenu */}
					<Dropdown.Submenu>
						<Dropdown.Item icon={<FontAwesomeIcon icon={faTasks} />} caret>
							Task manager
						</Dropdown.Item>
						<Dropdown.SubmenuMenu align="end">
							<Dropdown.Item bullet>Show task</Dropdown.Item>
							<Dropdown.Item bullet>Assign task</Dropdown.Item>
							<Dropdown.Item bullet>Assign member</Dropdown.Item>
							<Dropdown.Item bullet>Completed task</Dropdown.Item>
							<Dropdown.Item bullet>Urgent task</Dropdown.Item>
						</Dropdown.SubmenuMenu>
					</Dropdown.Submenu>
					{/* END Dropdown Submenu */}
					<Dropdown.Item icon={<FontAwesomeIcon icon={faDollarSign} />}>Invoice</Dropdown.Item>
					<Dropdown.Item icon={<FontAwesomeIcon icon={faUserCog} />}>My Account</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
			{/* END Dropdown */}
			{/* BEGIN Dropdown */}
			
			{/* END Dropdown */}
		</>
	)
}

export default LayoutHeaderNav
