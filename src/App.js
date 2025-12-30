import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';

function App() {

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);

  const fetchTodo = async(selectedDate) =>{
    const res = await axios.get(`http://localhost:5000/api/todos/${selectedDate}`);
    setTodos(res.data);
  }

  const addorUpdateTodo = async () =>{
    if(!title || !date)return alert("Fill the field");

    if(editId){
      await axios.put(`http://localhost:5000/api/todos/${editId}`, title);
      setEditId(null);
      toast.success('Task Updated Successfully');
    }

    else{
      await axios.post(`http://localhost:5000/api/todos`, {title, date});
      toast.success('Task Saved Successfully');
    }

    setTitle('');
    fetchTodo(date);
  }

  const deleteTodo =  async(id) =>{
     Swal.fire({
            title: "Do you want to delete the Task ?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Delete",
        }).then((result) => {

            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/api/todos/${id}`)
                    .then((res) => {
                        toast.success("Task Deleted!")
                        fetchTodo(date);
                    })
                Swal.fire("Deleted!", "", "success");
            } else if (result.isDenied) {
                Swal.fire("Deleted cancel", "", "info");
            }
        });
    
    
  }

   const toggleStatus = async (todo) => {
    await axios.put(`http://localhost:5000/api/todos/${todo._id}`, {
      completed: !todo.completed
    });
    fetchTodo(date);
  };

  const editTodo = (todo) => {
    setTitle(todo.title);
    setEditId(todo._id);
  };

  useEffect(() => {
    if (date) fetchTodo(date);
  }, [date]);


  return (
    <>
    <h1>To-do List</h1>
    <div className="todo">
      <ToastContainer/>
      <h2>Select Date & Add your task</h2>

      <input type="date" className='date' value={date} onChange={(e) => setDate(e.target.value)}/>
      <br /><br />

      <input type="text" className='text' placeholder="Task name" value={title} onChange={(e) => setTitle(e.target.value)}/>

      <button className="addtask" onClick={addorUpdateTodo}>
        {editId ? "Update" : "Add"}
      </button>

      <ul>
        {todos.map((todo) => (
          <li key={todo._id} style={{ marginTop: "10px" }}>
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                color: todo.completed ? "green" : "black"
              }}
            >
              {todo.title}
            </span><br/>

            <button onClick={() => toggleStatus(todo)}>
              {todo.completed ? "Undo" : "Done"}
            </button>&ensp;

            <button onClick={() => editTodo(todo)}>Edit</button>&ensp;

            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}

export default App;
