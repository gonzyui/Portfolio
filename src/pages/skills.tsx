import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { FaDocker, FaNodeJs } from "react-icons/fa";
import { Doughnut } from "react-chartjs-2";
import { motion } from "framer-motion";
import Slider from "react-slick";
import { useMemo } from "react";


import {
    SiFastapi, SiPostgresql, SiMongodb, SiWebstorm, SiIntellijidea, SiDebian,
    SiUbuntu, SiFastify, SiSass, SiTailwindcss, SiPrisma, SiRedis, SiPostman, SiVite
} from "react-icons/si";


import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

Chart.register(ArcElement, Tooltip, Legend);

interface LanguageStats {
    [key: string]: number;
}

const skillLevels = [
    { language: "Python", level: 70 },
    { language: "TypeScript", level: 85 },
    { language: "JavaScript", level: 90 },
    { language: "React", level: 60 },
    { language: "Next.JS", level: 60 },
    { language: "Java", level: 65 },
];

const otherSkills = [
    { name: "FastAPI", icon: <SiFastapi className="text-green-400 text-4xl" /> },
    { name: "Node.js", icon: <FaNodeJs className="text-green-500 text-4xl" /> },
    { name: "Docker", icon: <FaDocker className="text-blue-500 text-4xl" /> },
    { name: "PSQL", icon: <SiPostgresql className="text-indigo-400 text-4xl" /> },
    { name: "MongoDB", icon: <SiMongodb className="text-green-400 text-4xl" /> },
    { name: "Webstorm", icon: <SiWebstorm className="text-blue-400 text-4xl" /> },
    { name: "IntelliJ", icon: <SiIntellijidea className="text-purple-400 text-4xl" /> },
    { name: "Debian", icon: <SiDebian className="text-red-500 text-4xl" /> },
    { name: "Ubuntu", icon: <SiUbuntu className="text-orange-500 text-4xl" /> },
    { name: "Fastify", icon: <SiFastify className="text-yellow-500 text-4xl" /> },
    { name: "SCSS", icon: <SiSass className="text-pink-400 text-4xl" /> },
    { name: "Tailwind", icon: <SiTailwindcss className="text-cyan-400 text-4xl" /> },
    { name: "Prisma", icon: <SiPrisma className="text-gray-400 text-4xl" /> },
    { name: "Redis", icon: <SiRedis className="text-red-400 text-4xl" /> },
    { name: "Postman", icon: <SiPostman className="text-orange-400 text-4xl" /> },
    { name: "Vite", icon: <SiVite className="text-yellow-400 text-4xl" /> },
];

export default function Skills({ languageData }: { languageData: LanguageStats }) {
    const chartData = useMemo(() => ({
        labels: Object.keys(languageData),
        datasets: [
            {
                label: "Most Used Languages",
                data: Object.values(languageData),
                backgroundColor: ["#f87171", "#60a5fa", "#34d399", "#facc15", "#a78bfa", "#fb923c"],
                hoverOffset: 4,
            },
        ],
    }), [languageData]);

    const sliderSettings = {
        arrows: false,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        centerMode: true,
        centerPadding: "0",
        focusOnSelect: true,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } },
        ],
    };

    return (
        <section className="min-h-screen bg-gray-900 text-white px-6 py-10">
            <h1 className="text-4xl font-bold text-center mb-8">Skills & Stats</h1>

            <div className="flex flex-wrap justify-center gap-10 mb-12">
                <motion.div
                    className="bg-gray-800 p-6 rounded-lg shadow-lg w-80"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-2xl font-semibold text-center mb-4">Most Used Languages</h2>
                    <Doughnut data={chartData} />
                </motion.div>

                <motion.div
                    className="bg-gray-800 p-6 rounded-lg shadow-lg w-80"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-2xl font-semibold text-center mb-4">Mastery Levels</h2>
                    <table className="w-full text-left border-collapse">
                        <thead>
                        <tr className="border-b border-gray-700">
                            <th className="py-2">Language</th>
                            <th className="py-2">Mastery (%)</th>
                        </tr>
                        </thead>
                        <tbody>
                        {skillLevels.map(({ language, level }) => (
                            <tr key={language} className="border-b border-gray-700">
                                <td className="py-2">{language}</td>
                                <td className="py-2">
                                    <div className="w-full bg-gray-700 rounded-full h-3">
                                        <div className="bg-blue-500 h-3 rounded-full" style={{ width: `${level}%` }}></div>
                                    </div>
                                    <span className="text-sm text-gray-300">{level}%</span>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </motion.div>
            </div>

            <motion.div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center mb-4">Other Notable Skills</h2>
                <Slider {...sliderSettings}>
                    {otherSkills.map(({ name, icon }, index) => (
                        <div key={index} className="flex flex-col items-center justify-center p-4 ml-10">
                            {icon}
                            <h3 className="text-lg font-semibold mt-2">{name}</h3>
                        </div>
                    ))}
                </Slider>
            </motion.div>
        </section>
    );
}

const GITHUB_TOKEN = process.env.GIT_TOKEN as string;

export async function getStaticProps() {
    try {
        const res = await fetch("https://api.github.com/users/gonzyui/repos", {
            headers: GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {},
        });

        if (!res.ok) new Error(`GitHub API error: ${res.status}`);
        const repos = await res.json();

        const languageData: LanguageStats = {};
        repos.forEach(({ language }: any) => {
            if (language) languageData[language] = (languageData[language] || 0) + 1;
        });

        return { props: { languageData }, revalidate: 86400 };

    } catch (error) {
        console.error("Error fetching GitHub data:", error);
        return { props: { languageData: {} } };
    }
}