import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import React, { useEffect, useMemo, useState } from 'react'
import { Button, Checkbox, Form, List, Container, Divider, Message } from 'semantic-ui-react'

const FIND_TODOS = gql`
    query findTodos {
        todos {
            id
            text
            done
        }
    }
`

const CREATE_TODO = gql`
    mutation createTodo($input: NewTodo!) {
        createTodo(input: $input) {
            id
            text
            done
        }
    }
`

const CHANGE_STATUS = gql`
    mutation changeStatus($id: ID!, $status: Boolean!) {
        changeStatus(id: $id, isDone: $status) {
            id
            text
            done
        }
    }
`

const TODO_SUBSCRIPTION = gql`
    subscription todo {
        todo {
            id
            text
            done
        }
    }
`

interface Todo {
    id: string
    text: string
    done: boolean
}

interface TodoList {
    todos: Todo[]
}

const Todo = () => {
    const [text, setText] = useState('')
    const [todoArray, setTodoArray] = useState([])
    const [createTodo, { error: mError }] = useMutation(CREATE_TODO)
    const { loading, error, data } = useQuery<TodoList, {}>(FIND_TODOS)
    useEffect(() => {
        if (data) {
            setTodoArray(data.todos)
        }
        return () => {
        }
    }, [data])

    const [changeStatus] = useMutation(CHANGE_STATUS)
    // const s = useSubscription(
    //     TODO_SUBSCRIPTION,
    //     {
    //         shouldResubscribe: true, onSubscriptionData: (d) => {
    //             console.log(d)
    //         },
    //     },
    // )
    if (loading) return (<>
        <div>Loading...</div>
    </>)
    if (error) return (<>
        <div>Error {error}</div>
    </>)
    const todoList = todoArray.map(({ text, done, id }) => (

        <List.Item key={id}>
            <List.Icon name='dot circle' size='small' verticalAlign='middle'/>
            <List.Content>
                <List.Description as='div'>
                    <div>
                        <Checkbox label={`${text}`} checked={done} onChange={async (_, d) => {
                            const status = !!d.checked
                            const resp = await changeStatus({ variables: { id, status } })
                            const done = resp.data.changeStatus.done
                            setTodoArray(todoArray.map((t) => {
                                if (t.id === id) {
                                    t.done = done
                                }
                                return t
                            }))
                        }}/>
                    </div>
                </List.Description>
            </List.Content>
        </List.Item>


    ))

    const errMessage = mError ? (
        <Message negative>
            <Message.Header>We're sorry we can't apply that discount</Message.Header>
            {mError.graphQLErrors.map(({ message }, i) => (
                <p key={i}>{message}</p>
            ))}
        </Message>
    ) : null

    return (
        <>
            <Container>
                {errMessage}
                <div>
                    <Form onSubmit={async () => {
                        try {
                          const resp = await createTodo({ variables: { input: { text } } })
                          setTodoArray([...todoArray, resp.data.createTodo])
                        } catch(_) {}
                    }}>
                        <Form.Input placeholder='todo'
                                    name='text'
                                    value={text}
                                    onChange={(e, { value }) => setText(value)}>
                        </Form.Input>
                        <Button type='submit'>Submit</Button>
                    </Form>
                </div>
                <Divider/>
                <div>
                    <List divided relaxed>
                        {todoList}
                    </List>
                </div>
            </Container>
        </>
    )
}

export default Todo
