import { useEffect, useState } from 'react';
import { todo } from './model/datatype';
import { useStore } from './context/store';

function App() {
  const todos = useStore((state) => state.todos);
  const fetchTodos = useStore((state) => state.fetchTodos);
  
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos])

  const [titleValue, setTitleValue] = useState('');
  const [desValue, setDesValue] = useState('');

  const titleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value);
  };
  const desChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setDesValue(e.target.value);
  };

  // ---------------  post, del, update ----------------

  const postTodo = useStore((state) => state.postTodo);
  const deleteTodo = useStore((state) => state.deleteTodo);

  
  const dateFn = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    return `${year}년 ${month}월 ${date}일`;
  }
  const formattedDate = dateFn();

  const postHandle = () => {
    setTitleValue('');
    setDesValue('');

    const newTodo:todo = {
      id: Number(new Date().getTime()),
      state: false,
      title: titleValue,
      description: desValue,
      date: formattedDate,
    }

    postTodo(newTodo)
  }

  const delHandle = (id:number) => { 
    deleteTodo(id)
  }

  return (
    <div className="App">
      <h1>투두리스트</h1>
      <div>
        <input placeholder='제목을 입력해주세용' value={titleValue} onChange={titleChange}/><br/>
        <input placeholder='내용을 입력해주세용' value={desValue} onChange={desChange}/><br/>
        <button onClick={postHandle}>전송</button>
      </div>
      <br />
      {
        todos.map((item:todo) => { 
          return <div key={item.id} style={{border: '1px solid black'}}>
            <span>{item.date}</span>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <button onClick={() => { delHandle(item.id) }}>삭제</button>
          </div>
        })
      }
    </div>
  );
}

export default App;
