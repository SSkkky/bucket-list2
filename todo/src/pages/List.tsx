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
          return <div key={item.id} onClick={() => { updateHandle(item) }} className='listItem'>
            <p className='activeBtn'>
              <p className='activeCheck'></p>
            </p>
            <div className='listInner'>
              <div className='listHead'>
                <h2 className='title'>{item.title}</h2>
                <span className='date'>{item.date}</span>
              </div>
              <p className='des'>{item.description}</p>
            </div>
          </div>
        })
            }
        </div>
    );
}

export default List;