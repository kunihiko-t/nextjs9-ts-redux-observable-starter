import React from 'react'
import Wrapper from '~/components/Wrapper'
import GlobalNav from '~/components/GlobalNav'
import Todo from '~/components/Todo'

const RenderProps = () => {
    return (
        <Wrapper>
            <GlobalNav activeItem="graphql"/>
            <Todo/>
        </Wrapper>
    )
}

export default RenderProps
