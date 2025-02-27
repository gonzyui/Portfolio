import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";


import {
    FaBars, FaTimes, FaHome, FaProjectDiagram, FaChartPie,
    FaGithub, FaDiscord, FaCoffee, FaRobot
} from "react-icons/fa";
import { FaBluesky, FaForumbee } from "react-icons/fa6";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const sidebar = document.getElementById("sidebar");
            const button = document.getElementById("sidebar-toggle");

            if (isOpen && sidebar && button && !sidebar.contains(event.target as Node) && !button.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    return (
        <>
            <button
                id="sidebar-toggle"
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-5 left-5 z-50 bg-gray-800 text-white p-3 rounded-full shadow-lg focus:outline-none"
            >
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>

            {isOpen && <div className="fixed inset-0 z-30 bg-black bg-opacity-50" onClick={() => setIsOpen(false)}></div>}

            <motion.div
                id="sidebar"
                className="fixed top-0 left-0 h-screen w-64 md:w-72 bg-gray-900 shadow-lg flex flex-col p-6 z-40"
                initial={{ x: "-100%" }}
                animate={{ x: isOpen ? 0 : "-100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <h2 className="text-white text-2xl font-semibold text-center mb-7">Navigation</h2>

                <nav className="flex flex-col space-y-4 text-lg">
                    {[
                        { href: "/", icon: <FaHome />, label: "Home" },
                        { href: "/projects", icon: <FaProjectDiagram />, label: "Projects" },
                        { href: "/skills", icon: <FaChartPie />, label: "Skills" },
                        { href: "/blog", icon: <FaForumbee />, label: "Blog" },
                    ].map(({ href, icon, label }) => (
                        <Link key={href} href={href} className="flex items-center gap-2 text-gray-300 hover:text-white" onClick={() => setIsOpen(false)}>
                            {icon} {label}
                        </Link>
                    ))}
                </nav>

                <div className="mt-auto pt-6">
                    <div className="flex justify-around text-gray-400">
                        {[
                            { href: "https://github.com/gonzyui", icon: <FaGithub size={20} /> },
                            { href: "https://ko-fi.com/gonzyui", icon: <FaCoffee size={20} /> },
                            { href: "https://discord.com/channels/users/1313488187330531399", icon: <FaDiscord size={20} /> },
                            { href: "https://bsky.app/profile/gonzyuidev.yz", icon: <FaBluesky size={20} /> },
                            { href: "https://anime8.tech", icon: <FaRobot size={20} /> },
                        ].map(({ href, icon }) => (
                            <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                                {icon}
                            </a>
                        ))}
                    </div>

                    <p className="text-gray-500 text-xs text-center mt-4">© {new Date().getFullYear()} gonzyui. All rights reserved.</p>
                </div>
            </motion.div>
        </>
    );
}