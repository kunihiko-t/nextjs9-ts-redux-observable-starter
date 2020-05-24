import React from 'react'
import Wrapper from '~/components/Wrapper'
import GlobalNav from '~/components/GlobalNav'
import MouseTracker from '~/components/Mouse'

const RenderProps = () => {
    return (
        <Wrapper>
            <GlobalNav activeItem="renderProps"/>
            <MouseTracker/>
        </Wrapper>
    )
}

export default RenderProps
