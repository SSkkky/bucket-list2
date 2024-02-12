export type todo = {
    id: number;
    state: boolean;
    title: string;
    description: string;
    date: string;
}

export type Store = {
    todos: todo[];
    setTodos: (todos: todo[]) => void;
    fetchTodos: () => Promise<void>;
    postTodo: (todo:todo) => Promise<void>;
    updateTodo: (id: number, updatedTodo: todo) => Promise<void>;
    deleteTodo: (id: number) => Promise<void>;
};