import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {Todo} from "./TodoList";
import {MdOutlineManageSearch} from "react-icons/md";
import {GrRevert} from "react-icons/gr";

const Form = styled.form`
  display: flex;
  width: 90%;
  margin: 0 auto 32px;
`

const Input = styled.input`
  font-size: 16px;
  padding: 14px 32px 14px 16px;
  border: 2px solid #5d0cff;
  outline: none;
  width: calc(100% - 148px);
  background: transparent;
  color: #fff;
  
  &::placeholder {
    color: #e2e2e2;
  }
`

const Button = styled.button`
  font-size: 16px;
  width: 96px;
  padding: 16px 10px;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  outline: none;
  border: none;
  color: #fff;
  text-transform: capitalize;
  background: linear-gradient(
          90deg,
          rgba(93, 12, 255, 1) 0%,
          rgba(155, 0, 250, 1) 100%
  );
`

const SearchIcon = styled(MdOutlineManageSearch)<{$isSearch: boolean}>`
  display: block;
  width: 52px;
  height: 100%;
  padding: 12px 10px;
  border: 2px solid #5d0cff;
  border-right: none;
  border-radius: 4px 0 0 4px;
  color: #fff;
  cursor: pointer;

  ${props => props.$isSearch && `
    padding: 14px 10px 14px 12px;
    border: none;
    background: linear-gradient(
        90deg,
        rgba(155, 0, 250, 1) 0%,
        rgba(93, 12, 255, 1) 100%
    );
  `}
`

const CancelIcon = styled(GrRevert)`
  display: block;
  width: 96px;
  height: 100%;
  padding: 12px 34px;
  border: 2px solid #5d0cff;
  border-left: none;
  border-radius: 0 4px 4px 0;
  color: #fff;
  cursor: pointer;
  
  path {
    stroke: #fff;
  }
`

type TProps = {
  onSubmit: ((todo: Todo) => void)
  setSearchString: ((searchValue: string) => void)
}

const TodoForm = ({onSubmit, setSearchString}: TProps) => {
  console.log('render TodoForm')
  const [todoId, setTodoId] = useState<number>(() => {
    const todosString = localStorage.getItem("todos")
    let index = 1
    if (todosString) {
      const todos: Todo[] = JSON.parse(todosString)
      if(todos.length) index = todos[todos.length - 1].id + 1
    }
    return index
  })
  const [input, setInput] = useState<string>('')
  const [isSearch, setIsSearch] = useState<boolean>(false)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef?.current?.focus()
  }, [inputRef]);

  useEffect(() => {
    if(isSearch) {
      setSearchString(input)
    } else {
      setSearchString('')
    }
  }, [isSearch, input]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit({
      id: todoId,
      text: input,
      isComplete: false
    })

    setTodoId(prevState => prevState + 1)
    setInput('')
  }

  return (
      <Form onSubmit={handleSubmit}>
        <SearchIcon $isSearch={isSearch} onClick={() => setIsSearch(true)}/>
        <Input
            ref={inputRef}
            type="text"
            placeholder={isSearch ? 'Search Todo' : 'Add Todo'}
            value={input}
            name="text"
            onChange={handleChange}
        />
        {isSearch ? (
            <CancelIcon onClick={() => setIsSearch(false)}/>
        ) : (
            <Button type="submit">Add todo</Button>
        )}
      </Form>
  )
}

export default React.memo(TodoForm)