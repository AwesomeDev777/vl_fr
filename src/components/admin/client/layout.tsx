import { Portlet, ListGroup} from '@blueupcode/components'
import React from 'react'

const Layout = (props: any) => {

    const [company, setCompany] = React.useState(props.layoutProps.company)
    const [layout, setLayout] = React.useState(props.layoutProps.layout)
    
    React.useEffect(() => {
        props.layoutProps.backLayout(layout)
    }, [layout])

    const handleClick = (data: String) => {
        setLayout(data)
    }

    return(
        <Portlet noMargin>
            <Portlet.Header>
                <Portlet.Title>{company}</Portlet.Title>
            </Portlet.Header>
            <Portlet.Body>
                {/* BEGIN List Group */}
                <ListGroup>
                    <ListGroup.Item as="button" id="profile" onClick={() => handleClick("profile")} >Profile</ListGroup.Item>
                    <ListGroup.Item as="button" id="contract" onClick={() => handleClick("contact")} >Contact</ListGroup.Item>
                </ListGroup>
                {/* END List Group */}
            </Portlet.Body>
        </Portlet>
    )
}

export default Layout
