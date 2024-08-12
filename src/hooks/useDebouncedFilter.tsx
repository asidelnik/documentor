import { useState, useEffect, ChangeEvent } from 'react';
import { useEventsFiltersDispatch } from '../contexts/events-filters-context';

export function useDebouncedFilter(debounceTime = 300) {
  // TODO - make it generic if more usages required: pass dispatch & type as params
  const filtersDispatch = useEventsFiltersDispatch();
  const [text, setText] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      filtersDispatch({ type: 'update-free-text', payload: text });
    }, debounceTime);

    return () => {
      clearTimeout(handler);
    };
  }, [text, debounceTime]); //filtersDispatch

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return {
    text,
    handleTextChange,
  };
}