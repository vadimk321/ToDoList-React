import React, { useEffect, useState } from 'react';

const TaskItem = React.memo(
  function TaskItem(props){

    const {
          task,
          toggleTask,
          deleteTask,
          isEditing,
          startEdit,
          saveEdit,
          cancelEdit,
          addPrefixToTask
          } = props;

    const [localText, setLocalText] = useState(task.text);
    
    useEffect(() => {

    }, [])
    
    useEffect(() => {
      if  (isEditing) {
        setLocalText(task.text);
      }
    }, [isEditing, task.text]);

    const handleSaveEdit = () => saveEdit(task.id, localText);

    const handleToggle = () => toggleTask(task.id);
    const handleDelete = () => deleteTask(task.id);
    const handleStartEdit = () => startEdit(task.id);
    // пытаемся прокинуть
    const handleAddPrefixToTask = (e) => {
      e.preventDefault();
      const prefix = e.target.elements.addPrefToTask.value;
      
      addPrefixToTask(task.id, prefix);

      e.target.reset();
    } 

    console.log('render', task.id);

    return(
      <li>
        <input
          type="checkbox"
          checked={task.done}
          onChange={handleToggle}
        />
        {task.prefixes.map(prefix => (
          <span key={prefix} className="prefix">[{prefix}]</span>
        ))}
        {isEditing ? (
          <input
            value={localText}
            autoFocus
            onChange={(e) => setLocalText(e.target.value)}
            onBlur={handleSaveEdit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSaveEdit();
              if (e.key === 'Escape') cancelEdit();
            }}
          />
          ) : (<span 
            onClick={handleStartEdit}
            className={task.done ? 'complete' : null}
            >{task.text}</span>)
          }
          <button onClick={handleDelete}>Удалить</button>
          <form onSubmit={handleAddPrefixToTask}>
            <button className="add-prefix-btn">Добавить префикс</button>
            <input name='addPrefToTask' />
          </form>
      </li>
    )
  }
)



export default TaskItem