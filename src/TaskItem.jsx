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
          addPrefixToTask,
          delPrefixFromTask
          } = props;

    const [localText, setLocalText] = useState(task.text);
    
    useEffect(() => {
      if  (isEditing) {
        setLocalText(task.text);
      }
    }, [isEditing, task.text]);

    const handleSaveEdit = () => saveEdit(task.id, localText);

    const handleToggle = () => toggleTask(task.id);
    const handleDelete = () => deleteTask(task.id);
    const handleStartEdit = () => startEdit(task.id);
    
    const handleChangePrefixToTask = (e) => {
      e.preventDefault();
      const prefix = e.target.elements.changePrefToTask.value.trim();
      if (!prefix) return;
      const button = e.nativeEvent.submitter;

      
      if (button.name === 'add'){
        addPrefixToTask(task.id, prefix);
      }
      if (button.name === 'del'){
        delPrefixFromTask(task.id, prefix)
      }
      
      

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
        <button onClick={handleDelete}>Удалить</button>
        {task.prefixes.map(prefix => (
          <span key={task.id + prefix} className="prefix">[{prefix}]</span>
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
          
          <form onSubmit={handleChangePrefixToTask}>
            <button className="add-prefix-btn" type='submit' name="add">Добавить префикс</button>
            <button className="del-prefix-btn" type='submit' name="del">Удалить префикс</button>
            <input name='changePrefToTask' />
          </form>
      </li>
    )
  }
)



export default TaskItem