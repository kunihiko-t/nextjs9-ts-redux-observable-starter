import React from 'react'
import Wrapper from '../src/components/Wrapper'
import GlobalNav from '../src/components/GlobalNav'
import MouseTracker from '../src/components/Mouse'
import { NextPage } from 'next'

const RenderProps: NextPage = () => {
    return (
        <Wrapper>
            <GlobalNav activeItem="renderProps"/>
            <MouseTracker/>
        </Wrapper>
    )
}

export default RenderProps