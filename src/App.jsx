import {useState, useEffect} from 'react';
import {useTasks} from './hooks/useTasks.js';
import {useFilters} from './hooks/useFilters.js'
import TaskList from './TaskList.jsx';
import './styles/app.css';

function App() {

  // Переменные -----------------------------------------
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

  const {
    filters,
    setFilters,
    filteredTasks
  } = useFilters(tasks);

  const [editingId, setEditingId] = useState('');
  const [searchInput, setSearchInput] = useState('');


  // Обработчики -----------------------------------------

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilters(prev => ({
        ...prev,
        search: searchInput
      }))
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchInput])

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

  // return  -----------------------------------------
  return (
    <div>
      <div className="find-task-wrapper">
        <input 
        className="find-task-input"
        type="text" 
        value={searchInput}  
        placeholder='Найти задачу...'
        onChange= {(e) => setSearchInput(prev => (e.target.value))
        }/>
        <button 
          className="find-task-clear-btn"
          onClick={() =>{ 
            setSearchInput('');
            setFilters(prev => ({
              ...prev,
              search: ''
            }))}}>❌</button>
      </div>
      <select 
        value={filters.sort}
        onChange={(e) => {
          setFilters(prev => ({
            ...prev,
            sort: e.target.value
          }))
        }}>
        <option value="newest">Сначала новые</option>
        <option value="oldest">Сначала старые</option>
        <option value="az">По алфавиту (A-Z)</option>
        <option value="za">По алфавиту (Z-A)</option>
      </select>
      <button  
        className={`tabs-filters ${filters.status === 'all' ? 'active' : ''}`} 
        onClick={() => setFilters(prev => ({
          ...prev,
          status: 'all' 
        })) }>
        Все
      </button>
      <button 
        className={`tabs-filters ${filters.status === 'active' ? 'active' : ''}`} 
        onClick={() => setFilters(prev => ({
          ...prev,
          status: 'active'
        })) }>
        Активные
      </button>
      <button  
        className={`tabs-filters ${filters.status === 'done' ? 'active' : ''}`} 
        onClick={() => setFilters(prev => ({
          ...prev,
          status: 'done'
        })) }>
        Выполненные
      </button>
      
      {filters.prefix ? <hr /> : null}
      {filters.prefix ? <h2 className="filter-prefix">Задачи с тегом {filters.prefix}</h2> : null}
          <TaskList 
            tasks={tasks}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            startEdit={startEdit}
            saveEdit={handleSaveEdit}
            cancelEdit={cancelEdit}
            addPrefixToTask={addPrefixToTask}
            delPrefixFromTask={delPrefixFromTask}
            editingId={editingId}
            filters={filters}
            setFilters={setFilters}
            filteredTasks={filteredTasks}
          />
        <form onSubmit={handlerAddTask}>
          <input name='text'placeholder='Добавить задачу'/>
          <button>Добавить</button>
            
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
        <button onClick={() => setFilters(prev => ({
          ...prev,
          prefix: null
        }))}>
          Сбросить фильтр
        </button>
        
        <hr />
    </div>
  );
}

export default App;