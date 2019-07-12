import React from 'react'
import Wrapper from '../src/components/Wrapper'
import GlobalNav from '../src/components/GlobalNav'
import MouseTracker from '../src/components/Mouse'

const RenderProps = () => {
    return (
        <Wrapper>
            <GlobalNav activeItem="renderProps"/>
            <MouseTracker/>
        </Wrapper>
    )
}

export default RenderProps