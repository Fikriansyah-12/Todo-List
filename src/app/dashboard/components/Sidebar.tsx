"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Iconify from "@/Icon/iconify";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-gray-50 border-r p-5 z-30
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static
        `}
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-primaryGrey">Nodewave</h1>
          <button
            className="md:hidden p-1"
            onClick={() => setIsOpen(false)}
          >
            <Image src="/menu-arrow.svg" alt="Close" width={24} height={24} />
          </button>
        </div>

        <nav className="flex flex-col gap-3">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-3 py-2 rounded bg-gray-200 font-medium"
          >
            <Iconify icon="ic:outline-home" className="text-primaryBg text-2xl" />
            <span className="text-primaryGrey">To do</span>
          </Link>
        </nav>
      </aside>

      <div className="md:hidden absolute top-5 left-5 z-40">
        {!isOpen && (
          <button
            className="bg-gray-50 p-2 rounded shadow"
            onClick={() => setIsOpen(true)}
          >
            <Iconify icon="mdi:menu" className="text-2xl" />
          </button>
        )}
      </div>
    </>
  );
}
