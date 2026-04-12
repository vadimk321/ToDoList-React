import { useState, useEffect, useCallback } from 'react';
import './app.css'

import TaskList from './TaskList.jsx'

function App() {

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [editingId, setEditingId] = useState('');



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

    setTasks(prev => [...prev, newTask]);

    e.target.reset();
  }

  const deleteTask = useCallback((id) => {
    setTasks(prev => prev.filter(task => task.id !== id))
  }, [])

  const toggleTask = useCallback((id) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id 
        ? { ...task, done: !task.done} 
        : task))
  }, [])

  const startEdit = useCallback(id => {
    setEditingId(id);
  }, [])

  const saveEdit = useCallback((id, newText) => {
    setTasks(prev => {
      return prev.map(task => task.id === id ? {...task, text: newText} : task)
    })

    setEditingId('');
  }, [])

  const cancelEdit = useCallback(() => {
    setEditingId('');
  }, [])

  const clearList = useCallback(() => {
    setTasks([]);
  }, [])


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
            startEdit={startEdit}
            saveEdit={saveEdit}
            cancelEdit={cancelEdit}
            editingId={editingId}
          />
        <hr />
        <button onClick={clearList}>Сбросить все задачи</button>
        <hr />
    </div>
  );
}

export default App;