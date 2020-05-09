import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import React from 'react'
import { Checkbox } from 'semantic-ui-react'

const FIND_TODOS = gql`
query findTodos {
  todos {
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

interface Todo {
    id: string
    text: string
    done: boolean
}

interface TodoList {
    todos: Todo[]
}

const Todo = () => {
    const { loading, error, data } = useQuery<TodoList, {}>(FIND_TODOS)
    const [changeStatus] = useMutation(CHANGE_STATUS)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>
    const todoList = data.todos.map(({ text, done, id }) => (
        <div key={id}>
            <Checkbox label={`${text} ${id}`} checked={done} onChange={(_, d) => {
              const status = d.checked ? true : false
              changeStatus({ variables: { id, status } })
            }} />
        </div>
    ))
    return (<> {todoList} </>)
}

export default Todo
