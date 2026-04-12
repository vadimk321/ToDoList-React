import { useReducer, useState, useEffect } from 'react';
import './app.css'

import TaskList from './TaskList.jsx'

function tasksReducer(state, action){
    switch (action.type) {
      case 'ADD_TASK':
        return [...state, action.payload];

      case 'DELETE_TASK':
        return state.filter(task => task.id !== action.payload)

      case 'TOGGLE_TASK':
        return state.map(task => 
          task.id === action.payload 
            ? {...task, done: !task.done}
            : task
        )
      case 'EDIT_TASK':
        return state.map(task => task.id === action.payload ? {...task, text:action.text } : task);

      case 'CLEAR_TASKS':
        return [];

      case 'TOGGLE_ALL':
        const hasActive = state.some(task => !task.done);

        return (state.map(task => ({...task, done: hasActive ? true : false})));
        
      default:
        return state
    }
}

function App() {

  
  const [tasks, dispatch] = useReducer(tasksReducer, [], () => {
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
    if (!taskText) return;

    dispatch({
      type: 'ADD_TASK',
      payload: {
        id: new Date().toISOString(),
        text: taskText,
        done: false
      }
    })

    e.target.reset();
  }

  const deleteTask = (id) => {
    dispatch({type: 'DELETE_TASK', payload: id});
  };

  const toggleTask = (id) => {
    dispatch({type: 'TOGGLE_TASK', payload: id});
  }

  const saveEdit = (id, newText) => {
    dispatch({type: 'EDIT_TASK', payload: id, text: newText})

    setEditingId('');
    }
    
  const clearList = () => {
    dispatch({type: 'CLEAR_TASKS'});
  };

  const toggleAllTasks = () => {
    dispatch({type: 'TOGGLE_ALL'})
  }

  const startEdit = (id) => setEditingId(id);
  const cancelEdit = () => setEditingId('');

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
        <button onClick={toggleAllTasks}>Переключить все задачи</button>
        <hr />
    </div>
  );
}

export default App;