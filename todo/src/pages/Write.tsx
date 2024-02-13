import { useStore, updateStore, valueStore, writeStore } from '../context/store';
import { todo } from '../model/datatype';

function Write() {
    const { isOnUpdate, setIsOnUpdate, updateData } = updateStore();
    const { setTitleValue, titleValue, setDesValue, desValue } = valueStore();
    const { isOnWrite, setIsOnWrite } = writeStore();
    const postTodo = useStore((state) => state.postTodo);
    const updateTodo = useStore((state) => state.updateTodo);

    const titleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setTitleValue(e.target.value);
      };
      const desChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setDesValue(e.target.value);
      };
    
      const dayjs = require('dayjs');
      require('dayjs/locale/ko');
      let advancedFormat = require('dayjs/plugin/advancedFormat');
      dayjs.extend(advancedFormat);
      
      dayjs.locale('ko');
      const currentTime = dayjs().format('A h:mm');
    
      const postHandle = async () => {
        setTitleValue('');
        setDesValue('');
    
        const data: todo = {
          id: isOnUpdate ? updateData.id : Number(new Date().getTime()),
          state: false,
          title: titleValue,
          description: desValue,
          date: isOnUpdate ? updateData.date : currentTime,
        }
        
        isOnUpdate ? await updateTodo(data.id, data) : await postTodo(data);
        setIsOnUpdate(false);
        setIsOnWrite(false);
      }
    
      const deleteTodo = useStore((state) => state.deleteTodo);
  
      const delHandle = (id:number) => { 
          deleteTodo(id);
        setIsOnUpdate(false);
        setTitleValue('');
        setDesValue('');
        setIsOnWrite(false);
      }
  
  const onBackHandler = () => {
    setIsOnUpdate(false);
    setTitleValue('');
    setDesValue('');
    setIsOnWrite(false);
  }

    return (
      <div className='todoWrite' style={{ display: isOnWrite ? "block" : "none" }}>
        <button className='backBtn' onClick={onBackHandler}>←</button>
        <div className='todoWriteTop'>
          <h2>{isOnUpdate ? '기존 일정 수정하기' : '새 일정 작성하기'}</h2>
          <span className='currentTime'>{currentTime}</span>
        </div>
            
            <div className='todoWriteInput'>
              <input className="writeTitle" placeholder='제목을 입력해주세용' value={titleValue} onChange={titleChange}/>
          <input className="writeDes" placeholder='내용을 입력해주세용' value={desValue} onChange={desChange} />
                <p>
                <button className="delBtn" onClick={() => { delHandle(updateData.id) }} style={{display: isOnUpdate ? "block" : "none"}}>삭제</button>
                <button className="postBtn" onClick={postHandle}>{isOnUpdate ? '수정' : '입력'}</button></p>
            </div>
        </div>
    );
}

export default Write;