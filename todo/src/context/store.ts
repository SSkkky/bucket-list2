import { create } from 'zustand';
import axios from 'axios';
import { Store } from '../model/datatype';

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
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? response.data : todo
          ),
        }));
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
