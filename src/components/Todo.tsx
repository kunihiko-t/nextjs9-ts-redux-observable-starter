import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import React from 'react'

const FIND_TODOS = gql`
query findTodos {
  todos {
      id
      text
      done
      user {
        name
      }
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
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>
    const todoList = data.todos.map(({ text, done, id }) => (
        <div key={id}>
            {text}: {done}
        </div>
    ))
    return (<> {todoList} </>)
}


export default Todo
