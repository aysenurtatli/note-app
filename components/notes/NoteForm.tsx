"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const NoteForm = () => {
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const TITLE_MAX_LENGTH = 100;
  const BODY_MAX_LENGTH = 5000;

  async function createNote(noteContent: string, noteTitle: string) {
    const res = await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: noteTitle,
        body: noteContent,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Failed to create note");
    }

    const data = await res.json();
    return data;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim() || !body.trim()) {
      toast.error("Please fill in both title and body");
      return;
    }

    if (title.length > TITLE_MAX_LENGTH) {
      toast.error(`Title must be ${TITLE_MAX_LENGTH} characters or less`);
      return;
    }

    if (body.length > BODY_MAX_LENGTH) {
      toast.error(`Body must be ${BODY_MAX_LENGTH} characters or less`);
      return;
    }

    setIsSubmitting(true);

    try {
      await createNote(body, title);
      toast.success("Note created successfully!");
      setBody("");
      setTitle("");
      router.push("/notes");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create note",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="title" className="text-sm font-medium text-gray-700">
            Title
          </label>
          <span
            className={`text-xs ${title.length > TITLE_MAX_LENGTH ? "text-red-500" : "text-gray-500"}`}
          >
            {title.length}/{TITLE_MAX_LENGTH}
          </span>
        </div>
        <input
          id="title"
          type="text"
          placeholder="Enter note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-2 border-gray-300 w-full p-4 focus:outline-none focus:border-orange-500 font-semibold rounded-lg transition-colors"
          autoFocus
          disabled={isSubmitting}
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="body" className="text-sm font-medium text-gray-700">
            Content
          </label>
          <span
            className={`text-xs ${body.length > BODY_MAX_LENGTH ? "text-red-500" : "text-gray-500"}`}
          >
            {body.length}/{BODY_MAX_LENGTH}
          </span>
        </div>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your note content..."
          className="border-2 border-gray-300 min-h-[200px] max-h-[500px] overflow-y-auto p-4 focus:outline-none focus:border-orange-500 w-full rounded-lg transition-colors resize-y"
          disabled={isSubmitting}
        ></textarea>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting || !title.trim() || !body.trim()}
          className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-3 font-medium rounded-lg transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Creating...
            </>
          ) : (
            "Create Note"
          )}
        </button>
        <button
          type="button"
          onClick={() => router.push("/notes")}
          disabled={isSubmitting}
          className="bg-gray-200 hover:bg-gray-300 disabled:opacity-50 text-gray-800 px-6 py-3 font-medium rounded-lg transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
