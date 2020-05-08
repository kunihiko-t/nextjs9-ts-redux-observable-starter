import React from 'react'
import { Provider } from 'react-redux'
import App, { Container } from 'next/app'
import { store } from '../src/store'
import 'semantic-ui-css/semantic.min.css'
import { ApolloProvider } from '@apollo/react-hooks'
// import ApolloClient from 'apollo-boost';
import ApolloClient from 'apollo-client'
import fetch from 'node-fetch'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const API_URL = 'http://localhost:8080/query'

const client = new ApolloClient({
    link: createHttpLink({
        uri: API_URL,
        fetch,
    }),
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
