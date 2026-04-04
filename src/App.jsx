import { useState, useEffect } from 'react';
import './app.css'


function App() {


  const [tasks, setTasks] = useState([]);

  // Слежка за tasks
  useEffect(() => {
    console.log(tasks);
  }, [tasks]);
  

  function addTask(e){
    e.preventDefault();
    
    const taskText = e.target.elements.text.value;
    if (!taskText){
      return
    }

    const newTask = {
      id: new Date().toISOString(),
      text: taskText,
      done: false
    }

    setTasks([...tasks, newTask]);

    //Чистка Submit
    e.target.reset();
  }

  function deleteTask(id){
    const tasksUpdated = tasks.filter(task => task.id !== id);
    setTasks(tasksUpdated);
  }

  function toggleTask(id){
    const updated = tasks.map(task => {
      if (task.id === id){
        task.done = !task.done;
      }
      return task
    })

    setTasks(updated)
  }

  return (
    <div>
      <form onSubmit={addTask}>
        <input name='text'/>
        <button>Добавить</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key = {task.id}>
            <input 
            type="checkbox" 
            onChange={() => toggleTask(task.id)}
            checked={task.done}/>
            <span>{task.text}</span>
            <button onClick={() => deleteTask(task.id)}>Удалить</button>
          </li>
          )
        )}
      </ul>
    </div>
  );
}

export default App;