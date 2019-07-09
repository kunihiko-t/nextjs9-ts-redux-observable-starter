import React from 'react'
import { Menu } from 'semantic-ui-react'
import Router from 'next/router'
type NaviItem = 'github' | 'renderProps'

const GlobalNav: React.FC<{ activeItem: NaviItem }> = ({ activeItem }) => {

    return (
            <Menu pointing secondary>
                <Menu.Item
                    name='Github'
                    active={activeItem === 'github'}
                    onClick={() => Router.push('/github')}
                    link={true}
                />
                <Menu.Item
                    name='Render Props'
                    active={activeItem === 'renderProps'}
                    onClick={() => Router.push('/render_props')}
                    link={true}
                />
            </Menu>
    )
}

export default GlobalNav