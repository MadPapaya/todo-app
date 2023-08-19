import {useCallback, useEffect, useMemo, useState} from "react";
import TodoForm from "./TodoForm";
import TodoItems from "./TodoItems";
import styled from "styled-components";

export type Todo = {
  id: number
  text: string
  isComplete: boolean
}

const TodoList = () => {
  console.log('render TodoList')
  const [todos, setTodos] = useState<Todo[]>(() => {
    const todosString = localStorage.getItem("todos")
    return todosString ? JSON.parse(todosString) : []
  })
  const [searchString, setSearchString] = useState<string>('')
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos]);

  useEffect(() => {
    if(searchString) {
      setFilteredTodos(todos.filter(todo => todo.text.toLowerCase().search(searchString) !== -1))
    } else {
      setFilteredTodos([])
    }
  }, [searchString, todos]);


  const addTodo = useCallback((todo: Todo) => {
    if(!todo.text || /^\s*$/.test(todo.text)) return

    setTodos((prevState => [...prevState, todo]))
  }, [])

  const updateTodo = useCallback((newValue: Todo) => {
    if(!newValue.text || /^\s*$/.test(newValue.text)) return

    setTodos(prevState => prevState.map(todo => todo.id === newValue.id ? newValue : todo))
  },[])

  const removeTodo = useCallback((todoId: number) => {
    setTodos(prevState => prevState.filter(todo => todo.id !== todoId))
  },[])

  const handleChangeSearchString = useCallback((value: string) => {
    setSearchString(value)
  }, [])

  return (
      <>
        <TodoForm onSubmit={addTodo} setSearchString={handleChangeSearchString}/>
        <TodoItems
          todos={searchString ? filteredTodos : todos}
          onToggleCompleteTodo={updateTodo}
          onRemoveTodo={removeTodo}
          onUpdateTodo={updateTodo}
          searchString={!!searchString}
        />
      </>
  )
}

export default TodoList