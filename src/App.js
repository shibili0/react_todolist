import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, ListGroup, ListGroupItem } from "react-bootstrap";
function App() {
  const [todos, setTodos] = React.useState([]);

  return (
    <div>
      <h1 className="title">TODO LIST</h1>
      <AddTodo setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}
export default App;
function TodoList({ todos, setTodos }) {
  function handleToggleTodo(todo) {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id
        ? {
            ...t,
            done: !t.done,
          }
        : t
    );
    setTodos(updatedTodos);
  }

  if (!todos.length) {
    return <p>No todos left!</p>;
  }
  return (
    <div className="box">
      {/* <ul className='ul'> */}
      <ListGroup>
        {todos.map((todo) => (
            <ListGroup.Item
              variant="primary"
              style={{
                textDecoration: todo.done ? "line-through" : "",
              }}
              key={todo.id}
            >
              {todo.text}
              <span>
              <Button
                variant="warning"
                className="btn-1"
                onClick={() => handleToggleTodo(todo)}
              >
                DONE
              </Button>
              </span>
              <DeleteTodo todo={todo} setTodos={setTodos} />
            </ListGroup.Item>
            

          // <li className='li'
          //   onDoubleClick={() => handleToggleTodo(todo)}
          //   style={{
          //     textDecoration: todo.done ? "line-through" : ""
          //   }}
          //   key={todo.id}
          // >
          //   {todo.text}
          //   <DeleteTodo todo={todo} setTodos={setTodos} />
          // </li>
        ))}
      </ListGroup>
      {/* </ul> */}
    </div>
  );
}
function DeleteTodo({ todo, setTodos }) {
  function handleDeleteTodo() {
    const confirmed = window.confirm("Do you want to delete this?");
    if (confirmed) {
      setTodos((prevTodos) => {
        return prevTodos.filter((t) => t.id !== todo.id);
      });
    }
  }

  return (
    // <span
    //   className="delete"
    //   onClick={handleDeleteTodo}
    //   role="button"
    //   style={{
    //     color: "red",
    //     fontWeight: "bold",
    //     marginLeft: 10,
    //     cursor: "pointer",
    //   }}
    // >
    //   x
    // </span>
    <span>
      <Button variant="danger" className="btn-1" onClick={handleDeleteTodo}>
        X
      </Button>
    </span>
  );
}
function AddTodo({ setTodos }) {
  const inputRef = React.useRef();
  function handleAddTodo(event) {
    event.preventDefault();
    const text = event.target.elements.addTodo.value;
    let id = Math.floor(Math.random() * 100);
    console.log(id);
    const todo = {
      id,
      text,
      done: false,
    };
    setTodos((prevTodos) => {
      return prevTodos.concat(todo);
    });
    inputRef.current.value = "";
  }

  return (
    <>
      {/* <form onSubmit={handleAddTodo}>
        <input name="addTodo" placeholder="Add todo" ref={inputRef} />
        <Button variant="primary" type="submit" className="btn">
          SUBMIT
        </Button>{" "}
      </form> */}
      <Form onSubmit={handleAddTodo}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            className="input"
            name="addTodo"
            placeholder="Add todo"
            ref={inputRef}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="btn">
          SUBMIT
        </Button>{" "}
      </Form>
    </>
  );
}
