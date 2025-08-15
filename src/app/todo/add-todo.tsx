"use client";

import { useState, useEffect } from "react";
import { Icon as Iconify } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useTodo } from "@/hooks/useTodo";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster, toast } from "sonner";

export default function AddTodoPage() {
  const [token, setToken] = useState<string | null>(null);
  const [task, setTask] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const { todos, createTodo, markTodo, deleteTodo, error } = useTodo(
    token || ""
  );

  const handleAddTodo = async () => {
    if (!task.trim()) return;
    setAdding(true);
    try {
      await createTodo(task);
      setTask("");
      toast.success("Task added successfully!");
    } catch {
      toast.error("Failed to add task!");
    } finally {
      setAdding(false);
    }
  };

  const handleToggleTodo = async (id: string, completed: boolean) => {
    await markTodo(id, completed ? "UNDONE" : "DONE");
  };

  const handleDeleteSelected = async () => {
    const completedTodos = todos.filter((t) => t.isDone);
    if (completedTodos.length === 0) {
      toast("No tasks selected!", { description: "Select tasks to delete" });
      return;
    }

    try {
      for (const t of completedTodos) {
        await deleteTodo(t.id);
      }
      toast.success("Selected tasks deleted!");
    } catch {
      toast.error("Failed to delete tasks!");
    }
  };

  if (!token) return <p>Loading token...</p>;

  return (
    <div className="w-full flex flex-col items-center ">
      <Toaster position="top-right" richColors />

      <h1 className="text-4xl text-primaryBlue font-bold mb-8 flex items-center gap-3">
        TO DO
      </h1>

      <div className="w-1/2 p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-gray-600 font-semibold mb-2">Add a new task</h2>

        <div className="flex gap-4 mb-4">
          <Input
            placeholder="Add Todo"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          />
          <Button
            className="bg-primaryBlue w-1/3 hover:bg-blue-700 transition"
            onClick={handleAddTodo}
            disabled={adding}
          >
            {adding ? <span className="animate-spin">⏳</span> : "Add Todo"}
          </Button>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="space-y-4">
          <AnimatePresence>
            {todos.map((todo) => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex items-center justify-between border-b pb-2 hover:bg-gray-100 transition rounded"
              >
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={todo.isDone}
                    onCheckedChange={() =>
                      handleToggleTodo(todo.id, todo.isDone)
                    }
                    className="w-5 h-5"
                  />
                  <span>{todo.item}</span>
                </div>

                <div className="flex items-center gap-2">
                  {todo.isDone ? (
                    <Iconify
                      icon="ph:check-circle-bold"
                      className="text-green-500 text-2xl"
                    />
                  ) : (
                    <Iconify
                      icon="icon-park-outline:close-one"
                      className="text-red-500 text-2xl"
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <Button
          variant="destructive"
          className="mt-4 w-full hover:bg-red-600 transition"
          onClick={handleDeleteSelected}
        >
          <Iconify icon="mdi:delete" className="mr-2 text-lg" />
          Delete Selected
        </Button>
      </div>
    </div>
  );
}
