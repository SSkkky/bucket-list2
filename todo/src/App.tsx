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
  const updateTodo = useStore((state) => state.updateTodo);
  const [isOnUpdate, setIsOnUpdate] = useState(false);
  const [updateData, setUpdateData] = useState<todo>({
    id:0, state:false, title:'', description:'', date:''
  });

  
  const dateFn = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    return `${year}년 ${month}월 ${date}일`;
  }
  const formattedDate = dateFn();

  const postHandle = async () => {
    setTitleValue('');
    setDesValue('');

    const data: todo = {
      id: isOnUpdate ? updateData.id : Number(new Date().getTime()),
      state: false,
      title: titleValue,
      description: desValue,
      date: isOnUpdate ? updateData.date : formattedDate,
    }
    
    isOnUpdate ? await updateTodo(data.id, data) : await postTodo(data);
    setIsOnUpdate(false);
  }

  const delHandle = (id:number) => { 
    deleteTodo(id)
  }

  const updateHandle = (item: todo) => {
    // console.log(item, '<--item')
    setTitleValue(item.title)
    setDesValue(item.description)
    setIsOnUpdate(true);
    setUpdateData(item)
  }

  return (
    <div className="App">
      <h1>{isOnUpdate ? '기존 일정 수정하기' : '새 일정 작성하기'}</h1>
      <div>
        <input placeholder='제목을 입력해주세용' value={titleValue} onChange={titleChange}/><br/>
        <input placeholder='내용을 입력해주세용' value={desValue} onChange={desChange}/><br/>
        <button onClick={postHandle}>{ isOnUpdate ? '수정' : '입력' }</button>
      </div>
      <br />
      {
        todos.map((item:todo) => { 
          return <div key={item.id} style={{ border: '1px solid black' }} onClick={() => { updateHandle(item)}}>
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
