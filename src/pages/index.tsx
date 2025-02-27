import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import Link from "next/link";

const words = ["gonzyui", "developer", "anime lover", "AI enthusiast", "gamer"];

export default function Home() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[index];
    const speed = deleting ? 50 : 120;

    const updateText = () => {
      setText(deleting ? currentWord.slice(0, text.length - 1) : currentWord.slice(0, text.length + 1));

      if (!deleting && text === currentWord) setTimeout(() => setDeleting(true), 1000);
      if (deleting && text === "") {
        setDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
      }
    };

    const timeout = setTimeout(updateText, speed);
    return () => clearTimeout(timeout);
  }, [text, deleting, index]);

  return (
      <>
        <SEO title="Gonzyui | Developer Portfolio" description="Full-stack developer passionate about AI, Python, TypeScript, and anime/manga applications." />
        <section className="h-screen flex flex-col justify-center items-center text-center bg-gray-900 text-white px-6">
          <motion.h1 className="text-5xl font-bold mb-4">
            Hi, I'm <span className="text-blue-500">{text}</span>
            <motion.span className="animate-blink">|</motion.span>
          </motion.h1>

          <motion.p className="text-lg text-gray-300 max-w-2xl mb-6">
            I build powerful applications with
            <span className="text-green-400"> Python</span> and
            <span className="text-teal-400"> TypeScript</span>, focusing on tools that help the
            <span className="text-red-400"> anime & manga</span> community.
          </motion.p>

          <Link href="/projects" className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition">
            View My Projects
          </Link>
        </section>
      </>
  );
}