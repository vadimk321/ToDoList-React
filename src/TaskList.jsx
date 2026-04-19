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
        setSelectedPrefix
        } = props;
  

   const filteredTasks = useMemo(() => {
    if (!selectedPrefix) return tasks;

    return tasks.filter(task => task.prefixes.includes(selectedPrefix))
  },  [tasks, selectedPrefix])

  const activeTasks = useMemo (
    () => filteredTasks.filter(task => !task.done),
    [filteredTasks]
  );

  const doneTasks = useMemo(
    () => filteredTasks.filter(task => task.done),
    [filteredTasks]
  );

 


  return (
    <ul>
      {activeTasks.length > 0 ? <h2>Задачи</h2> : null}
      {activeTasks.map(task => (
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
          />
        )
      )}
      {doneTasks.length > 0 ? (
        <>
          <hr />
          <h2>Выполнено</h2>
        </>
      ) : null}
      {doneTasks.map(task => (
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
          />
      ))}
    </ul>
  );
}


export default TaskList