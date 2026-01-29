import Link from "next/link";

interface Note {
  _id: string;
  title: string;
  body: string;
}

const NoteCard = ({ note }: { note: Note }) => {
  return (
    <Link key={note._id} href={`/notes/${note._id}`}>
      <div
        className={`h-60 sm:h-72 md:h-80 cursor-pointer relative w-full bg-white border border-gray-900 rounded-lg `}
      >
        {/* Tape decoration */}
        {/* <div
          className={`absolute -top-3 left-1/2 -translate-x-1/2 z-20 w-16 h-6 rounded-sm ${tapeColors[tapeIndex]} rotate-2 shadow-sm`}
        ></div> */}

        {/* Content */}
        <div className="p-4 sm:p-6 md:p-8 h-full flex flex-col relative z-10 overflow-hidden text-gray-900">
          <h3 className="text-base sm:text-lg font-bold truncate border-b border-gray-900 font-handwriting pb-2 mb-3">
            {note.title}
          </h3>
          <p className="text-sm sm:text-base line-clamp-6 sm:line-clamp-7 md:line-clamp-8 font-handwriting break-words leading-relaxed">
            {note.body}
          </p>

          {/* Fade overlay for long text */}
          {note.body.length > 150 && (
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/80 to-transparent pointer-events-none"></div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
