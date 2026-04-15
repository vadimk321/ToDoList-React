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
    addPrefix,
    removePrefix,
    addPrefixToTask
  } = useTasks();

  const [editingId, setEditingId] = useState('');
  // const [editingPrefixId, setEditingPrefixId] = useState('');
  
  function handlerAddTask(e){
    e.preventDefault();

    const text = e.target.elements.text.value;
    addTask(text);

    e.target.reset();
  }
  
  const startEdit = (id) => setEditingId(id);
  const cancelEdit = () => setEditingId('');
  //Пока ручками не трогаем эту гадость. Социальную дистанцию
  const startEditPrefix = (id) => setEditingPrefixId(id);
  const cancelEditPrefix = () => setEditingPrefixId('');

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
            addPrefixToTask={addPrefixToTask}
            editingId={editingId}
          />
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
        
        <hr />
    </div>
  );
}

export default App;