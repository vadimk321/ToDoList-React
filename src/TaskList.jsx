import { useMemo, useCallback} from 'react';
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
        } = props;
  
  const handleTogglePrefix = useCallback((prefix) => {
      setFilters(prev => ({
        ...prev,
        prefix: prev.prefix === prefix ? null : prefix
      }))
    }, []);



  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    
    // Фильтр по префиксу
    if (filters.prefix) {
      result = result.filter(task => task.prefixes.includes(filters.prefix));
    };
    // Фильтр по статусу
    if (filters.status === 'active') {
      result = result.filter(task => !task.done);
    };
    if (filters.status === 'done') {
      result = result.filter(task => task.done);
    }
    // Фильтр по поиску
    if (filters.search) {
      result = result.filter(task => task.text.toLowerCase().includes(filters.search.toLowerCase().trim()));
    }

    // Сортировка
    if (filters.sort === 'az') {
      result.sort((a, b) => a.text.localeCompare(b.text));
    }

    if (filters.sort === 'za') {
      result.sort((a, b) => b.text.localeCompare(a.text));
    }

    if (filters.sort === 'newest') {
      result.sort((a, b) => b.id - a.id);
    }

    if (filters.sort === 'oldest') {
      result.sort((a, b) => a.id - b.id);
    }

    return result
  }, [tasks, filters.status, filters.prefix, filters.search, filters.sort]);


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