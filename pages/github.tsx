import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'semantic-ui-react'
import actions from '../src/actions/github'
import RepositoryList from '../src/components/RepositoryList'
import Wrapper from '../src/components/Wrapper'
import GlobalNav from '../src/components/GlobalNav'
import { NextPage } from 'next'

const Github : NextPage = () => {
    const dispatch = useDispatch()
    const github = useSelector((state: any) => state.github)
    const isLoading = github.status === 'running'
    const repositories = github.repositories
    useEffect(() => {
        //Mount
        console.log('mount')
        return () => {
            console.log('unmount')
        }
    }, [])
    return (
        <Wrapper>
            <GlobalNav activeItem="github"/>
            <Button
                onClick={() => {
                    dispatch(actions.fetchRepositories.started({}))
                }}
                disabled={isLoading}
            >
                Fetch repositories
            </Button>
            <RepositoryList items={repositories.items || []} total_count={repositories.total_count}
                            isLoading={isLoading}/>
        </Wrapper>
    )
}

export default Github