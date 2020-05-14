import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'

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
    const [ text, setText ] = useState('')
    const { loading, error, data } = useQuery<TodoList, {}>(FIND_TODOS)
    const [createTodo] = useMutation(CREATE_TODO)
    // useEffect(() => {
    //     //Mount
    //     console.log('mount')
    //     return () => {
    //         console.log('unmount')
    //     }
    // }, [])

    const [changeStatus] = useMutation(CHANGE_STATUS)
    const s = useSubscription(
        TODO_SUBSCRIPTION,
        {
            shouldResubscribe: true, onSubscriptionData: (d) => {
                console.log(d)
            },
        },
    )
    console.log(s.error)

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error :(</div>
    const todoList = data.todos.map(({ text, done, id }) => (
        <div key={id}>
            <Checkbox label={`${text} ${id}`} checked={done} onChange={(_, d) => {
                const status = d.checked ? true : false
                changeStatus({ variables: { id, status } })
            }}/>
        </div>
    ))
    return (
      <>
        <div>
          <Form onSubmit={() => {createTodo({ variables: { input: { text }}})}}>
            <Form.Input placeholder='todo'
                        name='text'
                        value={text}
                        onChange={(e, { value }) => setText(value)}>
            </Form.Input>
            <Button type='submit'>Submit</Button>
          </Form>
        </div>
        <div>{todoList}</div>
      </>
    )
}

export default Todo
