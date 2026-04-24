import {useCallback} from 'react';
import TaskItem from './TaskItem.jsx'



function TaskList(props){
  
  const {tasks,
        toggleTask,
        deleteTask,
        startEdit,
        saveEdit,
        cancelEdit,
        editingId,
        addPrefixToTask,
        delPrefixFromTask, // 
        filters,
        setFilters,
        filteredTasks
        } = props;
  
  const handleTogglePrefix = useCallback((prefix) => {
      setFilters(prev => ({
        ...prev,
        prefix: prev.prefix === prefix ? null : prefix
      }))
    }, []);




  return (
    <ul>
      {filteredTasks.length > 0 ? <h4>Задач: {filteredTasks.length}</h4> : null}
      {filteredTasks.length === 0 && (
        <p>Ничего не найдено</p>
      )}
      {filteredTasks.length > 0 ? <h2>Задачи</h2> : null}
      {filteredTasks.map(task => (
        <TaskItem 
          key={task.id}
          task={task}
          isEditing={editingId === task.id}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          startEdit={startEdit}
          saveEdit={saveEdit}
          cancelEdit={cancelEdit}
          addPrefixToTask={addPrefixToTask}
          delPrefixFromTask={delPrefixFromTask}
          onTogglePrefix={handleTogglePrefix}
          isActivePrefix={filters.prefix}
          />
        )
      )}
    </ul>
  );
}


export default TaskList