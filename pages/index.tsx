import React from 'react'
import actions from '../src/actions/user'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Header } from 'semantic-ui-react'
import CenterLoader from '../src/components/CenterLoader'
import LoginInput from '../src/components/form/LoginInput'
import LoginButton from '../src/components/form/LoginButton'
import LoginWrapper from '../src/components/LoginWrapper'
import Router from 'next/router'

const Login = () => {
    const user = useSelector((state: any) => state.user)

    //TODO Use Middleware or something
    if (user.isAuthenticated) {
        Router.push('/github')
    }

    const isLoading = user.status === 'running'
    const dispatch = useDispatch()
    return (
        <LoginWrapper>
            <Header as="h1">LOGIN</Header>
            <Form>
                <Form.Field>
                    <LoginInput onFocus={() => {
                    }} placeholder="ID"/>
                </Form.Field>
                <Form.Field>
                    <LoginInput type="password" placeholder="Password"/>
                </Form.Field>
                <LoginButton
                    onClick={() => {
                        dispatch(actions.login.started({ id: '1' }))
                    }}
                    disabled={isLoading}
                >
                    Login
                </LoginButton>
            </Form>
            <CenterLoader isLoading={isLoading}/>
        </LoginWrapper>
    )
}

export default Login
