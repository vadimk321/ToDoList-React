import { useState, useEffect } from 'react';
import './app.css'

import TaskList from './TaskList.jsx'

function App() {

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [editingId, setEditingId] = useState('');
  const [editingText, setEditingText] = useState('');


  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks])
  

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
        return {...task, done: !task.done}
      }
      return task
    })

    setTasks(updated)
    setEditingId('')
  }

  function startEdit(id){
    const task = tasks.find(item => item.id === id);
    setEditingId(id);
    setEditingText(task.text);
  }

  function saveEdit(id, newText){
    const updated = tasks.map(task => {
      if (task.id === id){
        return {...task, text: newText};
      }

      return task
    });

    setTasks(updated)
    setEditingId('')
  }

  function cancelEdit(){
    setEditingId('');
    setEditingText('');
  }

  return (
    <div>
      <form onSubmit={addTask}>
        <input name='text'/>
        <button>Добавить</button>
      </form>
        <TaskList 
          tasks={tasks}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          editingText={editingText}
          setEditingText={setEditingText}
          startEdit={startEdit}
          saveEdit={saveEdit}
          cancelEdit={cancelEdit}
          editingId={editingId}
        />
    </div>
  );
}

export default App;