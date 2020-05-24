import React from 'react'
import { Provider } from 'react-redux'
import App, { Container } from 'next/app'
import { store } from '../src/store'
import 'semantic-ui-css/semantic.min.css'
import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-client'
import fetch from 'node-fetch'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { WebSocketLink } from 'apollo-link-ws'
import { split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'

const API_URL = `${process.env.NEXT_PUBLIC_BFF_HOST}/query`
const WS_URL = `${process.env.NEXT_PUBLIC_BFF_WS_HOST}/query`

const httpLink = createHttpLink({
    uri: API_URL,
    fetch,
})

const wsLink = process.browser ? new WebSocketLink({ // if you instantiate in the server, the error will be thrown
    uri: WS_URL,
    options: {
        reconnect: true,
    },
}) : null

const link = process.browser ? split( //only create the split in the browser
    // split based on operation type
    ({ query }) => {
        const definition = getMainDefinition(query)
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
    },
    wsLink,
    httpLink,
) : httpLink


const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
})

class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props
        return (
            <ApolloProvider client={client}>
                <Provider store={store}>
                    <Component {...pageProps} />
                </Provider>
            </ApolloProvider>
        )
    }
}

export default MyApp
