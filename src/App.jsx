import {useState} from 'react';
import {useTasks} from './hooks/useTasks.js';
import TaskList from './TaskList.jsx';
import './styles/app.css';

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
    addPrefix,
    removePrefix,
    addPrefixToTask,
    delPrefixFromTask
  } = useTasks();

  const [editingId, setEditingId] = useState('');
  const [selectedPrefix, setSelectedPrefix] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  
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

    const prefixText = e.target.elements.addPrefix.value.toUpperCase(); 
    addPrefix(prefixText);

    e.target.reset();
  }

  function handlerRemovePrefix(e){
    e.preventDefault();

    const prefixText = e.target.elements.delPref.value.toUpperCase();
    removePrefix(prefixText)

    e.target.reset();
  }


  return (
    <div>
      <button  className={`tabs-filters ${statusFilter === 'all' ? 'active' : ''}`} onClick={() => setStatusFilter('all') }>Все</button>
      <button className={`tabs-filters ${statusFilter === 'active' ? 'active' : ''}`} onClick={() => setStatusFilter('active') }>Активные</button>
      <button  className={`tabs-filters ${statusFilter === 'done' ? 'active' : ''}`} onClick={() => setStatusFilter('done') }>Выполненные</button>
      
          <TaskList 
            tasks={tasks}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            startEdit={startEdit}
            saveEdit={handleSaveEdit}
            cancelEdit={cancelEdit}
            addPrefixToTask={addPrefixToTask}
            delPrefixFromTask={delPrefixFromTask}
            selectedPrefix={selectedPrefix}
            setSelectedPrefix={setSelectedPrefix}
            editingId={editingId}
            statusFilter={statusFilter}
          />
        <form onSubmit={handlerAddTask}>
          <input name='text'placeholder='Добавить задачу'/>
          <button>Добавить</button>
            {selectedPrefix ? <h2 className="filter-prefix">Задачи с тегом {selectedPrefix}</h2> : null}
        </form>  
        <hr />
        <button onClick={clearList}>Сбросить все задачи</button>
        <button onClick={toggleAllTasks}>Переключить все задачи</button>
        <button onClick={removeCompletedTasks}>Удалить выполненное</button>
        <hr />
        <form onSubmit={handlerAddPrefix}>
          <input name="addPrefix"/>
          <button>Добавить массовый префикс</button>
        </form>
        <form onSubmit={handlerRemovePrefix}>
          <input name="delPref"/>
          <button>Удалить массовый префикс</button>
        </form>
        <button onClick={() => setSelectedPrefix(null)}>
          Сбросить фильтр
        </button>
        
        <hr />
    </div>
  );
}

export default App;