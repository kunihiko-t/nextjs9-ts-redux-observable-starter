import React from 'react'
import Wrapper from '../src/components/Wrapper'
import GlobalNav from '../src/components/GlobalNav'
import Todo from '../src/components/Todo'

const RenderProps = () => {
    return (
        <Wrapper>
            <GlobalNav activeItem="graphql"/>
            <Todo/>
        </Wrapper>
    )
}

export default RenderProps
