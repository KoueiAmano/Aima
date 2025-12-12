"use client";

import React from "react";

type PageShellProps = {
  children: React.ReactNode;
  className?: string;
};

export function PageShell({ children, className = "" }: PageShellProps) {
  return (
    <main
      className={[
        "min-h-screen bg-gradient-to-b from-bg-grad-start via-bg-grad-mid to-bg-grad-end flex items-center justify-center px-4 py-10",
        className,
      ].join(" ")}
    >
      {children}
    </main>
  );
}

export default PageShell;
