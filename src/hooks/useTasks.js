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
        return state.map(task => ({...task, text: task.text.includes(`[${action.payload}]`)
          ? task.text
          : `[${action.payload}] ${task.text}`}));

      case 'REMOVE_PREFIX':
        const arr = state.map(task => task.text.split(']'));
        const subArr = arr.map(prefix => {
          return prefix.map(string => {
            return string.split('')
          }) 
        })
        console.log('arr = ')
        console.log(arr)
        console.log('subArr = ')
        console.log(subArr)
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
        done: false
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
    removePrefix
  };
}