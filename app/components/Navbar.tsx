"use client";
import { useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Blog", href: "#blog" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/80 dark:bg-dark-bg/80 light:bg-white/80 backdrop-blur-lg border-b border-electric-blue/20 light:border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a
            href="#home"
            className="text-2xl font-bold text-white light:text-gray-900 hover:text-toxic-green transition-colors"
          >
            TH<span className="text-electric-blue">.</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 light:text-gray-700 hover:text-toxic-green transition-colors font-medium"
              >
                {link.name}
              </a>
            ))}

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-electric-blue/10 light:bg-gray-200 hover:bg-electric-blue/20 light:hover:bg-gray-300 transition-all"
              title="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-blue-600" />
              )}
            </button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white light:text-gray-900 text-2xl"
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-300 light:text-gray-700 hover:text-toxic-green transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={toggleTheme}
              className="w-full text-left py-2 px-4 rounded-lg bg-electric-blue/10 light:bg-gray-200 hover:bg-electric-blue/20 light:hover:bg-gray-300 transition-all text-white light:text-gray-900"
            >
              {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
