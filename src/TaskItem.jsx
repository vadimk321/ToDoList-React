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
    const handleAddPrefixToTask= () => addPrefixToTask(task.id); //

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
          <button className="add-prefix-btn" 
                  onClick={handleAddPrefixToTask}>
                    Добавить префикс
          </button>
      </li>
    )
  }
)



export default TaskItem