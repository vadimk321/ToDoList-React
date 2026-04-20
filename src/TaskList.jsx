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
        delPrefixFromTask,
        selectedPrefix,
        setSelectedPrefix,
        statusFilter,
        } = props;
  

  const filteredTasks = useMemo(() => {
    let result = tasks;

    // фильтр по префиксу
    if (selectedPrefix) {
      result = result.filter(task => task.prefixes.includes(selectedPrefix))
    };
    // фильтр по статусу
    if (statusFilter === 'active') {
      result = result.filter(task => !task.done)
    };
    if (statusFilter === 'done') {
      result = result.filter(task => task.done);
    }

    return result
  }, [tasks, selectedPrefix, statusFilter]);



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
          setSelectedPrefix={setSelectedPrefix}
          selectedPrefix={selectedPrefix}
          />
        )
      )}
    </ul>
  );
}


export default TaskList