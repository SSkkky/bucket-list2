import { create } from 'zustand';
import axios from 'axios';
import { Store, Update, Value, Write } from '../model/datatype';

export const useStore = create<Store>((set) => ({
  todos: [],
  setTodos: (todos) => set({ todos }),
  fetchTodos: async () => {
    const response = await axios.get('http://localhost:3333/data');
    try { set({ todos: response.data }); }
    catch (error) { console.error('fetch 에러!!', error); }
    },
  postTodo: async (newTodo) => {
    const response = await axios.post('http://localhost:3333/data', newTodo);
    try { set((state) => ({ todos: [response.data, ...state.todos] })); }
    catch (error) { console.error('post 에러!!', error); }
    },
  updateTodo: async (id, updatedTodo) => {
    try {
      const response = await axios.put(`http://localhost:3333/data/${id}`, updatedTodo);
      if (response.status === 200) {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, ...updatedTodo } : todo
          ),
        }));
      } else {
        console.error('update 에러!!', response.status);
      }
    } catch (error) {
      console.error('update 에러!!', error);
    }
  },    
  deleteTodo: async (id) => {
      await axios.delete(`http://localhost:3333/data/${id}`);
    try {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }));
      } catch (error) {
        console.error('delete 에러!!', error);
      }
    },
}));

export const updateStore = create<Update>((set) => ({
  isOnUpdate: false,
  setIsOnUpdate: (isOnUpdate) => set({ isOnUpdate }),
  updateData: { id:0, state:false, title:'', description:'', date:'' },
  setUpdateData: (updateData) => set({updateData})
}))

export const valueStore = create<Value>((set) => ({
  titleValue: '',
  setTitleValue: (titleValue) => set({ titleValue }),
  desValue: '',
  setDesValue: (desValue) => set({ desValue }),
}))

export const writeStore = create<Write>((set) => ({
  isOnWrite: false,
  setIsOnWrite: (isOnWrite) => set({ isOnWrite })
}))