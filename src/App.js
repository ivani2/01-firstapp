import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

import TodoList from "./TodoList";

// {
//   id: 1,
//   name: 'Todo 1',
//   complete: true,
// },
// {
//   id: 2,
//   name: 'Todo 2',
//   complete: false,
// }
const LOCAL_STORAGE_KEY = 'todoApp'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() =>{
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if( storedTodos.length > 0 ) setTodos(storedTodos)
  }, [])

  useEffect(() =>{
    localStorage.setItem( LOCAL_STORAGE_KEY, JSON.stringify( todos ) )
  }, [ todos ])

  function handleAddTodo( e ){
    const name =  todoNameRef.current.value
    if ( name === '') return
    setTodos( prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    })
    todoNameRef.current.value = null
  }

  function toggleTodo( id ){
    const newTodos = [...todos]
    const todo = newTodos.find( todo => todo.id === id )
    todo.complete = !todo.complete
    setTodos( newTodos )
  }

  function handleClearTodos(  ){
    const newTodos = todos.filter( todo => !todo.complete )
    setTodos( newTodos )
  }

  return (
    <>
      <div className="container">
        <TodoList todos = { todos } toggleTodo = { toggleTodo } />
        <input ref={todoNameRef} type="text" />
        <button onClick={ handleAddTodo } >Add Todo</button>
        <button onClick={ handleClearTodos } >Clear Complete</button>
        <div> { todos.filter( todo => !todo.complete ).length } left to do</div>
      </div>
    </>

  )
}

export default App;
