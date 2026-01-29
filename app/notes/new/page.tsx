import NoteForm from "@/components/notes/NoteForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <div className="bg-gradient-to-br from-orange-50 via-orange-100/60 to-yellow-50 min-h-[calc(100vh-80px)] my-20 p-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/notes"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            <span>Back to notes</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-800 mb-2 font-handwriting">
            Create New Note
          </h1>
          <p className="text-gray-600 text-sm">
            Write down your thoughts and ideas
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border-2 border-gray-200">
          <NoteForm />
        </div>
      </div>
    </div>
  );
};

export default Page;
