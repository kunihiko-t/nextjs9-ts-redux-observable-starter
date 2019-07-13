import React from 'react'
import { Menu } from 'semantic-ui-react'
type NaviItem = 'github' | 'renderProps'
import { useRouter } from 'next/router';

const GlobalNav: React.FC<{ activeItem: NaviItem }> = ({ activeItem }) => {
    const router = useRouter()
    return (
            <Menu pointing secondary>
                <Menu.Item
                    name='Github'
                    active={activeItem === 'github'}
                    onClick={() => router.push('/github')}
                    link={true}
                />
                <Menu.Item
                    name='Render Props'
                    active={activeItem === 'renderProps'}
                    onClick={() => router.push('/render_props')}
                    link={true}
                />
            </Menu>
    )
}

export default GlobalNav