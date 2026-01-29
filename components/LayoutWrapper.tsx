"use client";

import { useLayout } from "@/app/context/LayoutContext";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { width } = useLayout();

  return (
    <div
      className={`${
        width === "full" ? "w-full" : "max-w-5xl max-h-200"
      } mx-auto h-[calc(100vh-80px)] overflow-y-auto  mt-14 bg-white shadow-xl `}
    >
      {children}
    </div>
  );
}
