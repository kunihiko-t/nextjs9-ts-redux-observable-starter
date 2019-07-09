import React from 'react'
import { Loader } from 'semantic-ui-react'

const centerLoader: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
    const loader = isLoading ? (
        <Loader active inline='centered'/>
    ) : (<></>)

    return (
        <>
            {loader}
        </>
    )
}

export default centerLoader