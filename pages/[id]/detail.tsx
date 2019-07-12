import React from 'react'

const RenderProps = props => {
    return (
        <div>{props.user.id} </div>
    )
}

RenderProps.getInitialProps = async({ query }) => {
    const { id } = query
    return {
        user: {
            id,
        },
    }
}

export default RenderProps