"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Iconify from "@/Icon/iconify";
import { useTodo } from "@/hooks/useTodo";

interface UserData {
  fullName: string;
  role: string;
}

export default function TodoTable() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"Success" | "Pending" | "">(
    ""
  );
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 5;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (!storedToken || storedRole !== "ADMIN") {
      router.replace("/login");
    } else {
      setToken(storedToken);
      setRole(storedRole);
      const fullName = localStorage.getItem("fullName");
      setUser({ fullName: fullName || "Admin", role: storedRole });
    }
  }, [router]);

  const { todos, loading, error } = useTodo(token || "");
  // Filter & pagination
  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.item
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus = filterStatus
      ? todo.isDone === (filterStatus === "Success")
      : true;
    return matchesSearch && matchesStatus;
  });
  const totalPages = Math.ceil(filteredTodos.length / todosPerPage);
  const paginatedTodos = filteredTodos.slice(
    (currentPage - 1) * todosPerPage,
    currentPage * todosPerPage
  );

  return (
    <div className="bg-white min-h-screen rounded-lg shadow p-5 mt-5">
      {/* Toolbar */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center flex-wrap">
          <div className="relative w-64">
            <Iconify
              icon="ic:round-search"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-black text-xl pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border-b-2 pl-10 pr-3 py-1"
            />
          </div>

          <div className="relative inline-block">
            <select
              className="appearance-none border-b-2 px-3 py-1 pr-8"
              value={filterStatus}
              onChange={(e) =>
                setFilterStatus(e.target.value as "Success" | "Pending" | "")
              }
            >
              <option value="">Filter by status</option>
              <option value="Success">Success</option>
              <option value="Pending">Pending</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <Iconify
                icon="ic:round-arrow-drop-down"
                className="text-black text-2xl"
              />
            </div>
          </div>

          <button
            className="bg-primaryBlue text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={() => setCurrentPage(1)}
          >
            Search
          </button>
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-left border-collapse overflow-x-auto">
        <thead className="bg-[#F9F9F9]">
          <tr>
           <th className="border-b p-2 text-sm md:text-base">Name</th>
        <th className="border-b p-2 text-sm md:text-base">To do</th>
        <th className="border-b p-2 text-sm md:text-base">Status</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={3} className="text-center p-4 text-gray-500">
                Loading...
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan={3} className="text-center p-4 text-red-500">
                {error}
              </td>
            </tr>
          ) : paginatedTodos.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center p-4 text-gray-500">
                No todos found
              </td>
            </tr>
          ) : (
            paginatedTodos.map((todo) => (
              <tr key={todo.id} className="border-b">
                <td className="p-2">{todo.userId}</td>
                <td className="p-2">{todo.item}</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded-xl font-semibold text-sm text-white ${
                      todo.isDone ? "bg-[#70DE54]" : "bg-red-500"
                    }`}
                  >
                    {todo.isDone ? "Success" : "Pending"}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-end mt-4 gap-1 flex-wrap">
        <button
          className="px-3 py-1 rounded-xl"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          {"<"}
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`px-3 py-1 border rounded-xl ${
              currentPage === page ? "bg-blue-600 text-white" : ""
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
        <button
          className="px-3 py-1 rounded-xl"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
