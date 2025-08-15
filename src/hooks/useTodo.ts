import { useState, useEffect } from "react";
import { get, put, post, del } from "@/lib/axios";
import { AxiosError } from "axios";

export type Todo = {
  id: string;
  item: string;
  userId: string;
  isDone: boolean;
  createdAt: string;
  updatedAt: string;
};

type TodoResponse = {
  content: {
    entries: Todo[];
    totalData: number;
    totalPage: number;
  };
  message: string;
  errors: unknown[];
};

type CreateTodoResponse = {
  content: Todo;
  message: string;
  errors: unknown[];
};

export type UseTodoResult = {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  markTodo: (id: string, action: "DONE" | "UNDONE") => Promise<void>;
  createTodo: (item: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
};

export function useTodo(token: string): UseTodoResult {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: unknown) => {
    if (err instanceof AxiosError) {
      setError(err.response?.data?.message || err.message);
    } else if (err instanceof Error) {
      setError(err.message);
    } else {
      setError("Unknown error");
    }
  };

  const fetchTodos = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await get<TodoResponse>("/todos", {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      setTodos(data.content.entries || []);
    } catch (err: unknown) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const markTodo = async (id: string, action: "DONE" | "UNDONE") => {
    setLoading(true);
    setError(null);

    try {
      await put(
        `/todos/${id}/mark`,
        { action },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        }
      );

      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, isDone: action === "DONE" } : todo
        )
      );
    } catch (err: unknown) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const createTodo = async (item: string) => {
    if (!item.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await post<CreateTodoResponse>(
        "/todos",
        { item },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        }
      );

      setTodos((prev) => [...prev, res.content]);
    } catch (err: unknown) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      await del(`/todos/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });

      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err: unknown) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchTodos();
  }, [token]);

  return { todos, loading, error, refetch: fetchTodos, markTodo, createTodo, deleteTodo };
}
