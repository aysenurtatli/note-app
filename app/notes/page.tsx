"use client";
import NoteList from "@/components/notes/NoteList";
import { Plus, Search, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Page = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="bg-linear-to-br from-orange-50 via-orange-100/60 to-yellow-50 min-h-[calc(100vh-80px)] my-20 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-center">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 mb-2 font-handwriting">
              My Notes
            </h1>
            <p className="text-gray-600 text-sm">
              Organize your thoughts and ideas
            </p>
          </div>

          <Link href="/notes/new" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-2 border-orange-700 rounded-lg px-6 py-3 flex gap-2 items-center justify-center font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
              <Plus className="border-2 rounded-full w-5 h-5" strokeWidth={3} />
              <span>Create New Note</span>
            </button>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="text-gray-400" size={20} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-800 w-full pl-12 pr-12 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all shadow-sm"
              placeholder="Search notes by title or content..."
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Notes Grid */}
        <NoteList searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default Page;
