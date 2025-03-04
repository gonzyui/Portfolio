import { FaGithub, FaDiscord, FaCoffee } from "react-icons/fa";
import { FaBluesky, FaForumbee } from "react-icons/fa6";
import { AiOutlineProject } from "react-icons/ai";
import { GiSkills } from "react-icons/gi";
import Link from "next/link";
import React from "react";

const links = [
    { href: "/projects", icon: <AiOutlineProject />, label: "Projects" },
    { href: "/skills", icon: <GiSkills />, label: "Skills" },
    { href: "/blog", icon: <FaForumbee />, label: "Blog" },
    { href: "https://github.com/gonzyui", icon: <FaGithub />, label: "GitHub", external: true },
    { href: "https://ko-fi.com/gonzyui", icon: <FaCoffee />, label: "Ko-Fi", external: true },
    { href: "https://discord.com/channels/users/1313488187330531399", icon: <FaDiscord />, label: "Discord", external: true },
    { href: "https://bsky.app/profile/gonzyuidev.yz", icon: <FaBluesky />, label: "BlueSky", external: true },
];

const Footer: React.FC = () => {
    return (
        <footer className="fixed bottom-0 left-0 w-full bg-gray-900 text-gray-400 py-2 px-2 text-center z-50">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-wrap items-center justify-center gap-3">
                    {links.map(({ href, icon, label, external }) =>
                        external ? (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition flex items-center gap-1 text-xs"
                                aria-label={label}
                            >
                                {icon}
                                <span className="hidden sm:inline">{label}</span>
                            </a>
                        ) : (
                            <Link key={label} href={href} className="hover:text-white transition flex items-center gap-1 text-xs">
                                    {icon}
                                    <span className="hidden sm:inline">{label}</span>
                            </Link>
                        )
                    )}
                </div>
                <p className="mt-1 text-[10px] sm:text-xs">© 2025 - gonzyui. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
