import React from 'react'

import Todo from './Todo'

export default function TodoList( { todos, toggleTodo } ) {
  return (
    // <div>
    //     {/* Hello World; from TodoList */}
    //     { todos.length }
    // </div>

    todos.map( todo => {
        return <Todo key={todo.id}  todo={ todo } toggleTodo = { toggleTodo } />
    } )
  )
}
