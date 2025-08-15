"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [fullName, setFullName] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const storedName = localStorage.getItem("fullName") || "";
    setFullName(storedName);
  }, []);

  const handleToggle = () => setOpen(!open);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("fullName");
    router.replace("/login");
  };

  return (
    <header className="flex justify-end items-center p-5 border-b bg-white relative">
      <span className="mr-3 text-gray-700">{fullName || "User"}</span>

      <div className="relative cursor-pointer" onClick={handleToggle}>
        <div className="w-10 h-10 relative">
          <div className="w-full h-full rounded-full shadow-lg overflow-hidden relative">
            <Image src="/avatar.webp" alt="Avatar" fill className="object-cover" />
          </div>
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
        </div>

        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg border rounded-md overflow-hidden z-10">
            <div className="px-4 py-2 text-gray-700 font-medium border-b">{fullName || "User"}</div>
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
