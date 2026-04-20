import { useMemo } from 'react';
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
        setFilters
        } = props;
  

  const filteredTasks = useMemo(() => {
    let result = tasks;

    // фильтр по префиксу
    if (filters.prefix) {
      result = result.filter(task => task.prefixes.includes(filters.prefix))
    };
    // фильтр по статусу
    if (filters.status === 'active') {
      result = result.filter(task => !task.done)
    };
    if (filters.status === 'done') {
      result = result.filter(task => task.done);
    }

    return result
  }, [tasks, filters.status, filters.prefix]);


  return (
    

    <ul>
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
          filters={filters}
          setFilters={setFilters}
          />
        )
      )}
    </ul>
  );
}


export default TaskList