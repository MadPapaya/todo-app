import React, {useRef, useState} from "react";
import {Todo} from "./TodoList";
import styled from "styled-components";
import {RiCloseCircleLine} from "react-icons/ri";
import {TiEdit} from "react-icons/ti";
import {TfiSave} from "react-icons/tfi";
import {GrRevert} from "react-icons/gr";

const TodoItemsWrapper = styled.div`
  overflow: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(90deg,
    rgba(255, 12, 241, 1) 0%,
    rgba(250, 0, 135, 1) 100%);
    border-radius: 2px;
  }
`

const TodoItem = styled.div<{ $isComplete: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 4px auto;
  color: #fff;
  background: linear-gradient(90deg,
  rgba(255, 118, 20, 1) 0%,
  rgba(255, 84, 17, 1) 100%);

  padding: 6px 16px;
  border-radius: 5px;
  width: 90%;
  min-height: 56px;
  user-select: none;

  ${props => props.$isComplete && `
    text-decoration: line-through;
    opacity: 0.4;
  `}
  &:nth-child(4n + 1) {
    background: linear-gradient(90deg,
    rgba(93, 12, 255, 1) 0%,
    rgba(155, 0, 250, 1) 100%);
  }

  &:nth-child(4n + 2) {
    background: linear-gradient(90deg,
    rgba(255, 12, 241, 1) 0%,
    rgba(250, 0, 135, 1) 100%);
  }

  &:nth-child(4n + 3) {
    background: linear-gradient(90deg,
    rgba(20, 159, 255, 1) 0%,
    rgba(17, 122, 255, 1) 100%);
  }
`

const TodoText = styled.p`
  font-size: 16px;
  line-height: 24px;
  text-align: left;
  word-wrap: break-word;
  width: 100%;
  max-width: calc(100% - 88px);
  padding-right: 10px;
  cursor: text;
  user-select: text;
`

const Label = styled.label`
`

const Checkbox = styled.input`
  display: none;

  & + label {
    display: block;
    width: 24px;
    height: 24px;
    position: relative;
    padding-left: 34px;

    &:before {
      content: "";
      display: inline-block;
      border: 2px solid #FFFFFF;
      width: 20px;
      height: 20px;
      position: absolute;
      left: 0;
      top: 0;
      border-radius: 4px;
      transition: border-color .3s;
      background: #FFFFFF;
      cursor: pointer;
    }
  }

  &:checked + label:before {
    background: url("data:image/svg+xml,%3Csvg width='17' height='13' viewBox='0 0 14 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.75011 8.1275L2.14761 5.525C2.00738 5.38476 1.81718 5.30598 1.61886 5.30598C1.42054 5.30598 1.23034 5.38476 1.09011 5.525C0.949876 5.66523 0.871094 5.85543 0.871094 6.05375C0.871094 6.15194 0.890435 6.24918 0.928014 6.3399C0.965593 6.43063 1.02067 6.51306 1.09011 6.5825L4.22511 9.7175C4.51761 10.01 4.99011 10.01 5.28261 9.7175L13.2176 1.7825C13.3578 1.64226 13.4366 1.45207 13.4366 1.25375C13.4366 1.05543 13.3578 0.86523 13.2176 0.724997C13.0774 0.584764 12.8872 0.505981 12.6889 0.505981C12.4905 0.505981 12.3003 0.584764 12.1601 0.724997L4.75011 8.1275Z' fill='%23FFFFFF'/%3E%3C/svg%3E") no-repeat center;
  }
`

const Input = styled.input`
  font-size: 16px;
  line-height: 24px;
  text-align: left;
  word-wrap: break-word;
  width: 100%;
  max-width: calc(100% - 88px);
  padding: 10px;
  border-radius: 4px;
  border: none;
  outline: none;
  background: #161a2b;
  color: #fff;

  &::placeholder {
    color: #e2e2e2;
  }
`

const TodoIcons = styled.div`
  user-select: none;
  display: flex;
  align-items: center;
  font-size: 24px;
  cursor: pointer;
`

const DeleteIcon = styled(RiCloseCircleLine)`
  user-select: none;
  margin-right: 6px;
  color: #fff;
`

const EditIcon = styled(TiEdit)`
  color: #fff;
`

const SaveIcon = styled(TfiSave)`
  color: #fff;
  margin-right: 10px;
`

const CancelIcon = styled(GrRevert)`
  color: #fff;
  margin: 0 15px;
  
  path {
    stroke: #fff;
  }
`

const CreateTodoText = styled.h2`
  margin-top: 64px;
  color: #fff;
  font-size: 20px;
`

interface TProps {
  todos: Todo[]
  onToggleCompleteTodo: (newValue: Todo) => void
  onRemoveTodo: (todoId: number) => void
  onUpdateTodo: (newValue: Todo) => void
  searchString: boolean
}

const TodoItems = ({
  todos,
  onToggleCompleteTodo,
  onRemoveTodo,
  onUpdateTodo,
  searchString
}: TProps) => {
  const [edit, setEdit] = useState<Todo>({
    id: 0,
    text: '',
    isComplete: false
  })
  console.log('render TodoItems')

  const inputRef = useRef<HTMLInputElement>(null)

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter') {
      submitUpdate()
    }
  }

  const submitUpdate = () => {
    onUpdateTodo({id: edit.id, text: inputRef.current?.value.toString() || '', isComplete: edit.isComplete})
    setEdit({
      id: 0,
      text: '',
      isComplete: false
    })
  }

  return (
      <TodoItemsWrapper>
        {todos.length ? todos.map((todo: Todo) => (
            <TodoItem $isComplete={edit.id === todo.id ? false : todo.isComplete} key={todo.id}>
              {edit && edit.id === todo.id ? (
                  <>
                    <TodoIcons>
                      <SaveIcon onClick={submitUpdate}/>
                    </TodoIcons>
                    <Input
                        ref={inputRef}
                        type="text"
                        placeholder="Update your Todo"
                        defaultValue={todo.text}
                        name="text"
                        onKeyDown={handleKeyDown}
                        autoFocus
                    />
                    <TodoIcons>
                      <CancelIcon onClick={() => setEdit({
                          id: 0,
                          text: '',
                          isComplete: false
                        })}/>
                    </TodoIcons>
                  </>
              ) : (
                  <>
                    <Checkbox
                        type='checkbox'
                        name={`todo-checkbox-${todo.id}`}
                        checked={todo.isComplete}
                        readOnly
                    />
                    <Label
                        htmlFor={`todo-checkbox-${todo.id}`}
                        onClick={() => onToggleCompleteTodo({id: todo.id, text: todo.text, isComplete: !todo.isComplete})}
                    />
                    <TodoText>
                      {todo.text}
                    </TodoText>
                    <TodoIcons>
                      <DeleteIcon onClick={() => onRemoveTodo(todo.id)}/>
                      <EditIcon onClick={() => setEdit(todo)}/>
                    </TodoIcons>
                  </>
              )}
            </TodoItem>
        )) : (
            <CreateTodoText>
              {searchString ? 'None of the todos matched the search' : 'Create Your first Todo!'}
            </CreateTodoText>
        )}
      </TodoItemsWrapper>
  )
}

export default React.memo(TodoItems, (prevProps, nextProps) => {
  return JSON.stringify(prevProps.todos) === JSON.stringify(nextProps.todos)
})