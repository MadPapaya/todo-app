import React from 'react';
import './style.scss';
import TodoList from "./components/TodoList";
import styled from "styled-components";

const TodoAppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 90vw;
  max-width: 600px;
  height: 80vh;
  min-height: 400px;
  background: #161a2b;
  text-align: center;
  margin: 10vh auto;
  border-radius: 10px;
  padding-bottom: 32px;
`

const H1 = styled.h1`
  margin: 32px 0;
  color: #fff;
  font-size: 24px;
`

function App() {
  return (
      <TodoAppWrapper>
        <H1>Todo List</H1>
        <TodoList/>
      </TodoAppWrapper>
  );
}

export default App;
