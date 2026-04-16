import { useReducer, useEffect } from "react";



function tasksReducer(state, action){
    switch (action.type) {
      case 'ADD_TASK':
        return [...state, action.payload];

      case 'DELETE_TASK':
        return state.filter(task => task.id !== action.payload)

      case 'TOGGLE_TASK':
        return state.map(task => 
          task.id === action.payload 
            ? {...task, done: !task.done}
            : task
        )
      case 'EDIT_TASK':
        return state.map(task => task.id === action.payload ? {...task, text:action.text } : task);

      case 'CLEAR_TASKS':
        return [];

      case 'TOGGLE_ALL':
        const hasActive = state.some(task => !task.done);

        return (state.map(task => ({...task, done: hasActive ? true : false})));
      
      case 'REMOVE_COMPLETED_TASKS':
        return state.filter(task => !task.done);

      case 'ADD_PREFIX':
        return state.map(task => {
          // Максимум 2 префикса и проверка на наличие дублей
          if(task.prefixes.length >= 2) return task;
          if (task.prefixes.includes(action.payload)) return task;

          const updated = [...task.prefixes, action.payload];
          return {...task, prefixes: updated}
        })

      case 'REMOVE_PREFIX':
        const updated = state.map(task => {
          const newPrefixes = task.prefixes.filter(prefix => prefix !== action.payload);

          if (newPrefixes.length === task.prefixes.length) {
            return task;
          }

          return {...task, prefixes: newPrefixes};
        })

        return updated
        
      case 'ADD_PREFIX_TO_TASK': {
        const updated = state.map(task => {
          if (task.prefixes.length >= 2) return task
          
          return task.id === action.payload.id ? {...task, prefixes: [...task.prefixes, action.payload.prefix]} : task})

        return updated
      }
        

      default:
        return state
    }

    
}

export function useTasks() {
  const [tasks, dispatch] = useReducer(tasksReducer, [], () => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);


  const addTask = (text) => {
    
    if (!text.trim()) return;

    dispatch({
      type: 'ADD_TASK',
      payload: {
        id: new Date().toISOString(),
        text: text,
        done: false,
        prefixes: [],
      }
    })
  }

  const deleteTask = (id) => {
    dispatch({type: 'DELETE_TASK', payload: id});
  };

  const toggleTask = (id) => {
    dispatch({type: 'TOGGLE_TASK', payload: id});
  }

  const saveEdit = (id, newText) => {
    dispatch({type: 'EDIT_TASK', payload: id, text: newText})
  }

  const clearList = () => {
    dispatch({type: 'CLEAR_TASKS'});
  };

  const toggleAllTasks = () => {
    dispatch({type: 'TOGGLE_ALL'});
  }

  const removeCompletedTasks = () => {
    dispatch({type: 'REMOVE_COMPLETED_TASKS'});
  }

  const addPrefix = (prefix) => {
    if (!prefix.trim()) return;

    dispatch({type: 'ADD_PREFIX', payload: prefix})
  }

  const removePrefix = (prefix) => {
    if (!prefix.trim()) return;

    dispatch({type: 'REMOVE_PREFIX', payload: prefix})
  }

  const addPrefixToTask = (id, prefix) => {

    dispatch({type: 'ADD_PREFIX_TO_TASK', payload: {id: id, prefix: prefix.toUpperCase()}})
  }

  return {
    tasks,
    addTask,
    deleteTask,
    toggleTask,
    saveEdit,
    clearList,
    toggleAllTasks,
    removeCompletedTasks,
    addPrefix,
    removePrefix,
    addPrefixToTask
  };
}