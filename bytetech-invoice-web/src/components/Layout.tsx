import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import type { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 min-w-0 flex flex-col">
          <Topbar />
          <main className="flex-1 p-6 md:p-8 lg:p-10 overflow-y-auto scrollbar-thin">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}