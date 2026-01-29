"use client";
import { useEffect, useState } from "react";
import NoteCard from "./NoteCard";
import LoadingSkeleton from "../ui/LoadingSkeleton";
import { Search } from "lucide-react";

type Note = {
  _id: string;
  title: string;
  body: string;
};

const NoteList = ({ searchQuery = "" }: { searchQuery?: string }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNotes() {
      try {
        setLoading(true);
        const res = await fetch("/api/notes");
        if (!res.ok) throw new Error("Failed to fetch notes");
        const data = await res.json();
        setNotes(data);
        setError(null);
      } catch (err) {
        setError("Failed to load notes. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchNotes();
  }, []);

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.body.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-10 min-h-[400px]">
        <div className="text-red-500 text-lg mb-4">⚠️ {error}</div>
        <button
          onClick={() => window.location.reload()}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (filteredNotes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10 min-h-[400px]">
        {searchQuery ? (
          <>
            <Search size={48} className="text-gray-400 mb-4" />
            <div className="text-gray-600 text-lg font-medium mb-2">
              No notes found
            </div>
            <div className="text-gray-500 text-sm">
              Try adjusting your search query
            </div>
          </>
        ) : (
          <>
            <div className="text-6xl mb-4">📝</div>
            <div className="text-gray-600 text-lg font-medium mb-2">
              No notes yet
            </div>
            <div className="text-gray-500 text-sm">
              Create your first note to get started!
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 p-3 sm:p-4 md:p-6">
      {filteredNotes.map((note) => (
        <NoteCard key={note._id} note={note} />
      ))}
    </div>
  );
};

export default NoteList;
