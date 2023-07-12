import { useState } from "react"
import "./styles.css"

export default function App() {
  const [newItem, setNewItem] = useState("")
  const [todos, setTodos] = useState([])
  
  function handleSubmit(e) {
    e.preventDefault()
  
    setTodos(currentTodos => {
      return [
        ...currentTodos,
        { 
          id: crypto.randomUUID(), 
          title: newItem,
          completed: false
        }
      ]
    })

    setNewItem("")
  }

  const toggleTodo = ( id, completed ) => {
    setTodos( currentTodos => {
      return currentTodos.map( todo => {
        if ( todo.id === id ) {
          console.log(`${todo.title} toggled`)
          return { ...todo, completed }
        }
        return todo
      })
    })
  }

  const deleteTodo = ( id ) => {
    setTodos( currentTodos => {
      return currentTodos.filter( todo => todo.id !== id)
    })
  }

  return (
    <>
      <form 
        id="TodoForm" 
        className="new-item-form" 
        onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input
            type="text" 
            id="item" 
            value={newItem}
            onChange={e => setNewItem(e.target.value)}
          />
        </div>
        <button className="btn" aria-label="Add Item">Add</button>
      </form>
      <h1 className="header">Todo List</h1>
      <ul className="list">
        { todos.map(todo => {
          return(
            <li 
              className="list-item"
              key={todo.id}>
              <label>
                <input
                  name={`${todo.title} Checkbox`}
                  type="checkbox" 
                  checked={todo.completed}
                  onChange={ e => toggleTodo(todo.id, e.target.checked) }/>
                {todo.title}
              </label>
              <button 
                className="btn btn-danger"
                onClick={() => deleteTodo(todo.id)}>
                Delete
              </button>
            </li>
          )
        }) }
      </ul>
    </>
  )
}
