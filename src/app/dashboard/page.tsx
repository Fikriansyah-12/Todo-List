"use client";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import TodoTable from "./components/TodoTable";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-5 flex-1 overflow-auto">
          <h2 className="text-2xl font-bold mb-4">To Do</h2>
          <TodoTable />
        </main>
      </div>
    </div>
  );
}
