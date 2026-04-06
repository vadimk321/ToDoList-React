import { useState, useEffect } from 'react';
import './app.css'
import TaskItem from './TaskItem.jsx'

function App() {

  const [tasks, setTasks] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('tasks'));
    return saved ? saved : [];
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
    setEditingId(null)
    console.log(editingId)
  }

  function editTask(id){
    const task = tasks.find(item => item.id === id);
    setEditingId(id);
    setEditingText(task.text);
  }

  function saveEditTask(id){
    const updated = tasks.map(task => {
      if (task.id === id){
        return {...task, text: editingText};
      }

      return task
    });

    setTasks(updated)
    setEditingId('')
  }

  function cancelSaveTask(){
    setEditingId('');
    setEditingText('');
  }

  return (
    <div>
      <form onSubmit={addTask}>
        <input name='text'/>
        <button>Добавить</button>
      </form>
      <ul>
        {tasks.map(task => (
          <TaskItem 
            key={task.id} 
            task={task}
            toggleTask={toggleTask}
            saveEditTask={saveEditTask}
            editTask={editTask}
            deleteTask={deleteTask}
            setEditingId={setEditingId}
            editingId={editingId}
            setEditingText={setEditingText}
            editingText={editingText}
            cancelSaveTask={cancelSaveTask}
            />
          )
        )}
      </ul>
    </div>
  );
}

export default App;