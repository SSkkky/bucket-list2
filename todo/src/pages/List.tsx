import React, { useEffect } from 'react';
import { todo } from '../model/datatype';
import { useStore, valueStore, updateStore } from '../context/store';

function List() {
    const todos = useStore((state) => state.todos);
    const fetchTodos = useStore((state) => state.fetchTodos);
    const { setIsOnUpdate, setUpdateData } = updateStore();
    const { setTitleValue, setDesValue } = valueStore();
    
    useEffect(() => {
      fetchTodos();
    }, [fetchTodos])
  
    const updateHandle = (item: todo) => {
      setTitleValue(item.title)
      setDesValue(item.description)
      setIsOnUpdate(true);
      setUpdateData(item)
    }

    return (
        <div className='todoList'>
        {
        todos.map((item:todo) => { 
          return <div key={item.id} onClick={() => { updateHandle(item)}}>
            <span>{item.date}</span>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </div>
        })
            }
        </div>
    );
}

export default List;