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

export type Update = {
    isOnUpdate: boolean;
    setIsOnUpdate: (isOnUpdate: boolean) => void;
    updateData: todo;
    setUpdateData: (updateData: todo) => void;
}

export type Value = {
    titleValue: string;
    setTitleValue: (titleValue: string) => void;
    desValue: string;
    setDesValue: (desValue:string) => void;
}