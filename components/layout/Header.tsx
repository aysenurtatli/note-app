"use client";
import { useState } from "react";
import { X, Minus, Expand } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useLayout } from "@/app/context/LayoutContext";
import Navbar from "./Navbar";
import { playClickSound } from "@/app/utils/playsound";
import { Notebook, NotebookPen } from "lucide-react";

const Header = () => {
  const { width, setWidth } = useLayout();
  const pathname = usePathname();
  const [showIcons, setShowIcons] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0  z-20">
      <div
        className={clsx(
          "fixed top-0 left-1/2 -translate-x-1/2 h-10  flex items-stretch justify-between px-4 bg-[#E3E3E3]",
          width === "full" ? "w-full" : "max-w-5xl w-full",
        )}
      >
        <div
          className="flex items-center gap-3"
          onMouseEnter={() => setShowIcons(true)}
          onMouseLeave={() => setShowIcons(false)}
        >
          <Link href={"/"} className="flex hover:bg-gray-200">
            <button onClick={() => playClickSound()}>
              <div className="w-4 h-4 bg-red-400 rounded-full flex items-center justify-center">
                {showIcons && <X size={13} />}
              </div>
            </button>
          </Link>
          <button>
            <div className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
              {showIcons && <Minus size={13} />}
            </div>
          </button>
          <button
            className="hover:bg-gray-200"
            onClick={() => {
              setWidth(width === "full" ? "minimal" : "full");
              playClickSound();
            }}
          >
            <div className="w-4 h-4 bg-green-400 rounded-full flex items-center justify-center">
              {showIcons && <Expand size={13} />}
            </div>
          </button>
        </div>
        <div className="flex  gap-3">
          <Link href={"/notes"}>
            <button
              onClick={() => playClickSound()}
              className={clsx(
                "relative flex items-center justify-center gap-1 px-2 h-full rounded-tl-md  before:absolute before:inset-x-1 before:-top-1  before:shadow-sm hover:bg-[#d3d3d3] hover:rounded-lg duration-200",
                pathname === "/notes" && "bg-white rounded-tr-md",
              )}
            >
              <Notebook size={20} />
              Notes
            </button>
          </Link>
          <Link href={"/notes/new"}>
            <button
              onClick={() => playClickSound()}
              className={clsx(
                "relative flex items-center justify-center gap-1 px-2 h-full rounded-tl-md   before:absolute before:inset-x-1 before:-top-1  before:shadow-sm",
                pathname === "/notes/new" && "bg-white rounded-tr-md",
              )}
            >
              <NotebookPen size={20} />
              New Note
            </button>
          </Link>
        </div>
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
