import { useState, useMemo, useCallback, JSX } from "react";
import SEO from "@/components/SEO";
import {
    FaStar, FaCodeBranch, FaExternalLinkAlt, FaChevronDown
} from "react-icons/fa";
import {
    SiJavascript, SiTypescript, SiPython, SiHtml5, SiCss3, SiNsis, SiDocker, SiShell
} from "react-icons/si";

interface Repo {
    id: number;
    name: string;
    html_url: string;
    description?: string;
    languages: string[];
    stargazers_count: number;
    forks_count: number;
    languages_url: string;
}

const languageIcons: Record<string, JSX.Element> = {
    JavaScript: <SiJavascript className="text-yellow-400 text-xl" />,
    TypeScript: <SiTypescript className="text-blue-500 text-xl" />,
    Python: <SiPython className="text-yellow-500 text-xl" />,
    HTML: <SiHtml5 className="text-red-500 text-xl" />,
    CSS: <SiCss3 className="text-blue-500 text-xl" />,
    NSIS: <SiNsis className="text-yellow-500 text-xl" />,
    Dockerfile: <SiDocker className="text-blue-500 text-xl" />,
    Shell: <SiShell className="text-green-400 text-xl" />,
};

export default function Projects({ repos }: { repos: Repo[] }) {
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const allLanguages = useMemo(() => Array.from(new Set(repos.flatMap(repo => repo.languages))), [repos]);

    const filteredRepos = useMemo(() =>
        repos.filter(({ name, description, languages }) =>
            (!selectedLanguage || languages.includes(selectedLanguage)) &&
            (name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                description?.toLowerCase().includes(searchQuery.toLowerCase()))
        ), [repos, selectedLanguage, searchQuery]);

    const handleLanguageSelect = useCallback((lang: string | null) => {
        setSelectedLanguage(lang);
        setDropdownOpen(false);
    }, []);

    return (
        <>
            <SEO title="Projects | Gonzyui" description="Discover my latest projects, AI models, and tools for anime and manga communities." />

            <section className="min-h-screen bg-gray-900 text-white px-6 py-12 flex flex-col items-center">
                <h1 className="text-5xl font-bold mb-8">🚀 My Projects</h1>

                <div className="flex flex-wrap justify-center gap-4 mb-6 relative">
                    <div className="relative">
                        <button
                            className="bg-gray-800 text-gray-300 px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-700 transition"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            {selectedLanguage ? (
                                <>
                                    {languageIcons[selectedLanguage]} {selectedLanguage}
                                </>
                            ) : "Filter by Language"} <FaChevronDown />
                        </button>

                        {dropdownOpen && (
                            <div className="absolute mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg w-52 max-h-60 overflow-auto z-50">
                                <button
                                    className="flex items-center gap-2 w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700"
                                    onClick={() => handleLanguageSelect(null)}
                                >
                                    All Languages
                                </button>
                                {allLanguages.map(lang => (
                                    <button
                                        key={lang}
                                        className="flex items-center gap-2 w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700"
                                        onClick={() => handleLanguageSelect(lang)}
                                    >
                                        {languageIcons[lang] || "📜"} {lang}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <input
                        type="text"
                        placeholder="Search projects..."
                        className="bg-gray-800 text-gray-300 px-4 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                    {filteredRepos.map(({ id, name, html_url, description, languages, stargazers_count, forks_count }) => (
                        <div key={id} className="bg-gray-800 p-5 rounded-lg shadow-md border border-gray-700 transition-transform hover:scale-105 hover:shadow-xl w-72 mx-auto">
                            <h2 className="text-xl font-semibold text-blue-400 mb-2 truncate">{name}</h2>
                            <p className="text-gray-400 text-sm mb-3 h-14 overflow-hidden">{description || "No description available."}</p>

                            <div className="flex gap-2 mb-3">
                                {languages.length > 0
                                    ? languages.map(lang => <span key={lang}>{languageIcons[lang] || <span className="text-gray-400 text-sm">{lang}</span>}</span>)
                                    : <span className="text-gray-400 text-sm">No languages found</span>}
                            </div>

                            <div className="flex justify-between items-center text-gray-300 text-sm mb-4">
                                <span className="flex items-center gap-1"><FaStar className="text-yellow-400" /> {stargazers_count}</span>
                                <span className="flex items-center gap-1"><FaCodeBranch className="text-green-400" /> {forks_count}</span>
                            </div>

                            <a href={html_url} target="_blank" rel="noopener noreferrer"
                               className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300 flex items-center gap-2 shadow-md">
                                <FaExternalLinkAlt /> GitHub
                            </a>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}

const GITHUB_TOKEN = process.env.GIT_TOKEN as string;

export async function getStaticProps() {
    try {
        const res = await fetch("https://api.github.com/users/gonzyui/repos", {
            headers: GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {},
        });

        if (!res.ok) new Error(`GitHub API error: ${res.status}`);
        const repos: Repo[] = await res.json();

        const reposWithLanguages = await Promise.all(
            repos.map(async (repo) => {
                const langRes = await fetch(repo.languages_url, {
                    headers: GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {},
                });

                const languages = langRes.ok ? Object.keys(await langRes.json()) : [];
                return { ...repo, languages };
            })
        );

        return { props: { repos: reposWithLanguages }, revalidate: 86400 };

    } catch (error) {
        console.error("Error fetching GitHub repos:", error);
        return { props: { repos: [] } };
    }
}