import { FaGithub, FaDiscord, FaCoffee, FaRobot } from "react-icons/fa";
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
    { href: "https://anime8.tech", icon: <FaRobot />, label: "Luminet", external: true },
];

const Footer: React.FC = () => {
    return (
            <footer className="hidden sm:block fixed mt-auto bottom-0 w-full bg-gray-900 text-gray-400 py-6 text-center">
                <p className="mb-4 text-sm sm:text-base">© 2025 - gonzyui. All rights reserved.</p>
                <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                    {links.map(({ href, icon, label, external }) =>
                        external ? (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition flex items-center gap-1"
                                aria-label={label}
                            >
                                {icon} {label}
                            </a>
                        ) : (
                            <Link key={label} href={href} className="hover:text-white transition flex items-center gap-1">
                                {icon} {label}
                            </Link>
                        )
                    )}
                </div>
            </footer>
    );
};

export default Footer;