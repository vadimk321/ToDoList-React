import { useState, useEffect } from 'react';



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

  return (
    <div>
      <form onSubmit={addTask}>
        <input name='text'/>
        <button>Добавить</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key = {task.id}>{task.text}</li>
          )
        )}
      </ul>
    </div>
  );
}

export default App;