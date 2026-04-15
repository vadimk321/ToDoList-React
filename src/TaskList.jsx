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
        } = props;
  

  const activeTasks = useMemo(() => tasks.filter(task => !task.done), [tasks])
  const doneTasks = useMemo(() => tasks.filter(task => task.done), [tasks]);


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
          />
      ))}
    </ul>
  );
}


export default TaskList