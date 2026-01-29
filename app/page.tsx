import Image from "next/image";
import Link from "next/link";
import { ArrowRight, NotebookPen, Search, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-80px)] flex items-center justify-center sm:justify-between p-4 sm:p-8 md:p-12 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Text Content */}
      <div className="z-10 max-w-xl">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="text-orange-400" size={24} />
          <span className="text-orange-400 font-semibold text-sm uppercase tracking-wide">
            Note Taking Made Simple
          </span>
        </div>

        <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl leading-tight text-white mb-6">
          Add, <span className="font-handwriting text-orange-400">edit</span>,
          and manage your notes with ease.
        </h1>

        <p className="text-xl text-white mb-8 font-handwriting leading-relaxed max-w-lg">
          Keep your thoughts organized and accessible anywhere, anytime. Create
          beautiful notes with our intuitive interface.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/notes">
            <button className="group w-full sm:w-auto bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2">
              <Search size={20} />
              <span>View My Notes</span>
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </Link>

          <Link href="/notes/new">
            <button className="group w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2">
              <NotebookPen size={20} />
              <span>Create Note</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Image */}
      <div className="hidden lg:block absolute bottom-0 right-0 w-80 xl:w-[500px] aspect-square opacity-90">
        <Image
          src="/images/image.webp"
          alt="Notes illustration"
          fill
          className="object-cover"
          priority
        />
      </div>
    </main>
  );
}
