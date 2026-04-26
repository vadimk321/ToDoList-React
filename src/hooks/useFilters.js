import { useMemo, useState, useEffect } from "react";

export function useFilters(tasks){


  const [filters, setFilters] = useState(() => {
    try {
      const saved = localStorage.getItem('filters');

      if (saved) {
        return JSON.parse(saved)
      }
    }

    catch(e){
       console.error('Ошибка чтения filters', e);
    }

    
    return {
      prefix: null,
      status: 'all',
      search: '',
      sort: 'newest'
      }
  })

  useEffect(() => {
    const {search, ...rest} = filters;
    localStorage.setItem('filters', JSON.stringify(rest));
  }, [filters]);

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
      result.sort((a, b) => b.id.localeCompare(a.id));
    }

    if (filters.sort === 'oldest') {
      result.sort((a, b) => a.id.localeCompare(b.id));
    }

    return result
  }, [tasks, filters])


  return {
    filters,
    setFilters,
    filteredTasks
    };
  }