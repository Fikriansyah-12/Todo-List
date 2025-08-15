import Link from "next/link";
import Image from "next/image";
import Iconify from "@/Icon/iconify";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-50 border-r p-5">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primaryGrey">Nodewave</h1>
        <Image
          src="/menu-arrow.svg" 
          alt="Menu Arrow"
          width={24}
          height={24}
        />
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
  );
}
