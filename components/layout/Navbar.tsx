"use client";
import { ArrowLeft, ArrowRight, IterationCw } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { useLayout } from "@/app/context/LayoutContext";
import { playClickSound } from "@/app/utils/playsound";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { width } = useLayout();
  const [fullUrl, setFullUrl] = useState("");

  useEffect(() => {
    setFullUrl(window.location.origin + pathname);
  }, [pathname]);
  return (
    <div
      className={clsx(
        "h-20 border-b border-gray-300 flex items-center gap-6 px-4 bg-white z-20 mt-10",
        width === "full" ? "w-full" : "max-w-5xl w-full mx-auto",
      )}
    >
      <div className="flex gap-3">
        <button
          className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 hover:rounded-full duration-200"
          onClick={() => {
            router.back();
            playClickSound();
          }}
        >
          <ArrowLeft color="#474747" />
        </button>
        <button
          className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 hover:rounded-full duration-200"
          onClick={() => {
            router.forward();
            playClickSound();
          }}
        >
          <ArrowRight color="#474747" />
        </button>
        <button
          className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 hover:rounded-full duration-200 rotate-220"
          onClick={() => {
            router.refresh();
            playClickSound();
          }}
        >
          <IterationCw color="#474747" />
        </button>
      </div>
      <input
        type="text"
        placeholder={fullUrl}
        className="bg-[#E3E3E3] w-full h-10 rounded-full px-4 focus:outline-0 placeholder:text-sm placeholder:text-[#474747]"
        readOnly
      />
    </div>
  );
};

export default Navbar;
