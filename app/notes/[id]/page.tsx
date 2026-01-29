"use client";

type Note = {
  _id: string;
  title: string;
  body: string;
  createdAt?: string;
  updatedAt?: string;
};

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Save, Trash2, ArrowLeft, Loader2 } from "lucide-react";
import { playClickSound } from "@/app/utils/playsound";
import Modal from "@/components/ui/Modal";
import toast from "react-hot-toast";

const Page = () => {
  const params = useParams();
  const id = params?.id as string;
  const [note, setNote] = useState<Note | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const router = useRouter();

  const TITLE_MAX_LENGTH = 100;
  const BODY_MAX_LENGTH = 5000;

  useEffect(() => {
    if (!id) return;
    async function fetchNote() {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/notes/${id}`);
        if (!res.ok) throw new Error("Failed to fetch note");
        const data = await res.json();
        setNote(data);
        setTitle(data.title);
        setBody(data.body);
      } catch {
        toast.error("Failed to load note");
        router.push("/notes");
      } finally {
        setIsLoading(false);
      }
    }
    fetchNote();
  }, [id, router]);

  useEffect(() => {
    if (note) {
      setHasChanges(title !== note.title || body !== note.body);
    }
  }, [title, body, note]);

  // Warn before leaving if there are unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasChanges]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        if (hasChanges) handleUpdate();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasChanges]);

  async function handleDelete() {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete the note");
      }
      playClickSound();
      toast.success("Note deleted successfully");
      router.push("/notes");
    } catch {
      toast.error("Failed to delete note");
      setIsDeleting(false);
    }
  }

  async function handleUpdate() {
    if (!title.trim() || !body.trim()) {
      toast.error("Title and body cannot be empty");
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

    setIsSaving(true);
    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          body: body.trim(),
        }),
      });

      if (!res.ok) throw new Error("Failed to update note");

      const updatedData = await res.json();
      setNote(updatedData);
      playClickSound();
      toast.success("Note saved successfully");
      setHasChanges(false);
    } catch {
      toast.error("Failed to save note");
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] my-20">
        <Loader2 size={48} className="animate-spin text-orange-500 mb-4" />
        <p className="text-gray-600 text-lg">Loading note...</p>
      </div>
    );
  }

  if (!note) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 my-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => {
            if (hasChanges) {
              if (
                confirm(
                  "You have unsaved changes. Are you sure you want to leave?",
                )
              ) {
                router.push("/notes");
              }
            } else {
              router.push("/notes");
            }
          }}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to notes</span>
        </button>

        <div className="flex items-center gap-3">
          {hasChanges && (
            <span className="text-sm text-orange-600 font-medium">
              Unsaved changes
            </span>
          )}

          <button
            onClick={() => {
              playClickSound();
              handleUpdate();
            }}
            disabled={!hasChanges || isSaving}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors shadow-md hover:shadow-lg"
            title="Save (Cmd/Ctrl + S)"
          >
            {isSaving ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                <span className="hidden sm:inline">Saving...</span>
              </>
            ) : (
              <>
                <Save size={20} />
                <span className="hidden sm:inline">Save</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              playClickSound();
              setShowDeleteModal(true);
            }}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors shadow-md hover:shadow-lg"
            title="Delete note"
          >
            <Trash2 size={20} />
            <span className="hidden sm:inline">Delete</span>
          </button>
        </div>
      </div>

      {/* Title Input */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-gray-700">Title</label>
          <span
            className={`text-xs ${title.length > TITLE_MAX_LENGTH ? "text-red-500" : "text-gray-500"}`}
          >
            {title.length}/{TITLE_MAX_LENGTH}
          </span>
        </div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="font-bold text-2xl sm:text-3xl w-full p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg border-2 border-gray-300 font-handwriting transition-all"
          placeholder="Note title..."
        />
      </div>

      {/* Body Textarea */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-gray-700">Content</label>
          <span
            className={`text-xs ${body.length > BODY_MAX_LENGTH ? "text-red-500" : "text-gray-500"}`}
          >
            {body.length}/{BODY_MAX_LENGTH}
          </span>
        </div>
        <div className="min-h-[400px] w-full bg-white relative overflow-hidden rounded-lg border-2 border-gray-300 focus-within:ring-2 focus-within:ring-orange-500 transition-all">
          {/* Grid Background */}
          <div
            className="absolute inset-0 z-0 opacity-30"
            style={{
              backgroundImage: `
                linear-gradient(to right, #f0f0f0 1px, transparent 1px),
                linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px",
            }}
          />
          <textarea
            onChange={(e) => setBody(e.target.value)}
            value={body}
            className="w-full min-h-[400px] h-auto p-4 focus:outline-none font-medium z-20 relative bg-transparent leading-7 text-base font-handwriting resize-y"
            placeholder="Write your note content..."
          />
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Note"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete &quot;{note.title}&quot;? This
            action cannot be undone.
          </p>
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => setShowDeleteModal(false)}
              disabled={isDeleting}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 text-gray-800 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 disabled:bg-red-400 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              {isDeleting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Page;
