import {useState} from 'react';
import {useTasks} from './hooks/useTasks.js';
import TaskList from './TaskList.jsx';
import './app.css';

function App() {

  
  const {
    tasks,
    addTask,
    deleteTask,
    toggleTask,
    saveEdit,
    clearList,
    toggleAllTasks,
    removeCompletedTasks,
    addPrefix
  } = useTasks();

  const [editingId, setEditingId] = useState('');
  
  function handlerAddTask(e){
    e.preventDefault();

    const text = e.target.elements.text.value;
    addTask(text);

    e.target.reset();
  }

  const startEdit = (id) => setEditingId(id);
  const cancelEdit = () => setEditingId('');

  const handleSaveEdit = (id, text) => {
    saveEdit(id, text);
    setEditingId('');
  }  

  function handlerAddPrefix(e){
    e.preventDefault();

    const prefixText = e.target.elements.prefix.value; 
    addPrefix(prefixText);

    e.target.reset();
  }

  return (
    <div>
      <form onSubmit={handlerAddTask}>
        <input name='text'/>
        <button>Добавить</button>
      </form>  
          <TaskList 
            tasks={tasks}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            startEdit={startEdit}
            saveEdit={handleSaveEdit}
            cancelEdit={cancelEdit}
            editingId={editingId}
          />
        <hr />
        <button onClick={clearList}>Сбросить все задачи</button>
        <button onClick={toggleAllTasks}>Переключить все задачи</button>
        <button onClick={removeCompletedTasks}>Удалить выполненное</button>
        <hr />
        <form onSubmit={handlerAddPrefix}>
          <input name="prefix"/>
          <button>Добавить префикс</button>
        </form>
        
        <hr />
    </div>
  );
}

export default App;