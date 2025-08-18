import { useState, useEffect } from "react";
import { BellIcon, MoonIcon, SunIcon, UserCircleIcon } from "@heroicons/react/24/outline";

export default function Topbar() {
  // Initialize isDarkMode based on document class or localStorage
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      return saved === "dark";
    }
    return document.documentElement.classList.contains("dark");
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Sync dark mode state with document and localStorage
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (!localStorage.getItem("theme")) {
        setIsDarkMode(mediaQuery.matches);
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleDarkMode = () => {
  setIsDarkMode((prev) => {
    const next = !prev;
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 10);
    return next;
  });
};

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <header className="sticky top-0 bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 z-10 shadow-sm">
      <div className="h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="relative w-full max-w-md">
          {/* <input
            placeholder="Search invoices, customers…"
            className="w-full rounded-lg border border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 transition-all duration-200"
          /> */}
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400 dark:text-neutral-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 16.65z"
            />
          </svg>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              <SunIcon className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
            ) : (
              <MoonIcon className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
            )}
          </button>
          <button
            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200"
            aria-label="Notifications"
          >
            <BellIcon className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
          </button>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
              aria-label="User menu"
            >
              <UserCircleIcon className="w-6 h-6" />
              <span className="hidden sm:inline">Admin</span>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-lg py-2 z-20">
                <a
                  href="/profile"
                  className="block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-primary-50 dark:hover:bg-neutral-700 transition-colors duration-200"
                >
                  Profile
                </a>
                <a
                  href="/settings"
                  className="block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-primary-50 dark:hover:bg-neutral-700 transition-colors duration-200"
                >
                  Settings
                </a>
                <a
                  href="/logout"
                  className="block px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-primary-50 dark:hover:bg-neutral-700 transition-colors duration-200"
                >
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}