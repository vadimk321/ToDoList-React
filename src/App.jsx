import { useState, useEffect } from 'react';
import './app.css'


function App() {


  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState('');
  const [editingText, setEditingText] = useState('')

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
          <li key = {task.id}>

            <input 
            type="checkbox" 
            onChange={() => toggleTask(task.id)}
            checked={task.done}/>

            {task.id === editingId ? 
              (<input 
                type="text" 
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                onBlur={() => saveEditTask(task.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {saveEditTask(task.id)}
                  if (e.key === 'Escape') {cancelSaveTask(task.id);}
                }}
              />) 
              : (<span onClick={() => editTask(task.id)}> {task.text}</span>)}

            <button onClick={() => deleteTask(task.id)}>Удалить</button>
          </li>
          )
        )}
      </ul>
    </div>
  );
}

export default App;