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
          delPrefixFromTask, // Пока оставим!
          filters,
          setFilters
          } = props;

    const [localText, setLocalText] = useState(task.text);
    const [prefixInput, setPrefixInput] = useState('');
    
    useEffect(() => {
      if  (isEditing) {
        setLocalText(task.text);
      }
    }, [isEditing, task.text]);

    const handleSaveEdit = () => saveEdit(task.id, localText);

    const handleToggle = () => toggleTask(task.id);
    const handleDelete = () => deleteTask(task.id);
    const handleStartEdit = () => startEdit(task.id);
    

    console.log('render', task.id);

    return(
      <li>
        <input
          type="checkbox"
          checked={task.done}
          onChange={handleToggle}
        />
        <button onClick={handleDelete}>Удалить</button>
        {(task.prefixes || []).map(prefix => (
          <span 
            key={`${task.id}_${prefix}`}
            className={`prefix ${filters.prefix === prefix ? 'active' : ''}`}
            onClick={() => setFilters(prev => ({
              ...prev,
              prefix: prev.prefix === prefix ? null : prefix
            }))}>
            [{prefix}]
          </span>
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
          <input 
            value={prefixInput}
            onChange={(e) => setPrefixInput(e.target.value)} 
            placeholder={
              task.prefixes.length >= 2 
              ? 'Лимит префиксов'
              : 'Добавить префикс'
            }
            disabled={task.prefixes.length >= 2}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();

                const value = prefixInput.trim();
                if (!value) return;

                addPrefixToTask(task.id, value);
                setPrefixInput('');
              }
            }}
            />
            
      </li>
    )
  }
)



export default TaskItem