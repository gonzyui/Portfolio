import BlogCard from "@/components/BlogCard";
import { useState, useMemo, useCallback } from "react";
import SEO from "@/components/SEO";
import path from "path";
import fs from "fs";

interface BlogPost {
    title: string;
    slug: string;
    description: string;
    date: string;
    tags: string[];
}

export default function Blog({ posts }: { posts: BlogPost[] }) {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const allTags = useMemo(() => Array.from(new Set(posts.flatMap(post => post.tags))), [posts]);

    const filteredPosts = useMemo(() =>
        posts.filter(({ title, description, tags }) =>
            (!selectedTag || tags.includes(selectedTag)) &&
            (title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                description.toLowerCase().includes(searchQuery.toLowerCase()))
        ), [posts, selectedTag, searchQuery]);

    const handleTagSelect = useCallback((tag: string | null) => {
        setSelectedTag(tag);
        setDropdownOpen(false);
    }, []);

    return (
        <>
            <SEO title="Blog | Gonzyui" description="Latest articles on web development, projects, and more." />
            <section className="min-h-screen bg-gray-900 text-white px-6 py-12 flex flex-col items-center">
                <h1 className="text-5xl font-bold text-center mb-8">📝 Blog</h1>

                <div className="flex flex-wrap justify-center gap-4 mb-8">
                    {/* Dropdown for Tags */}
                    <div className="relative">
                        <button
                            className="bg-gray-800 text-gray-300 px-5 py-2 rounded-lg shadow-md border border-gray-700 hover:bg-gray-700 transition flex items-center gap-2"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            {selectedTag ? `🏷️ ${selectedTag}` : "📌 All Tags"}
                            <svg
                                className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        {dropdownOpen && (
                            <div className="absolute mt-2 w-56 bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto z-50">
                                <button
                                    className="w-full text-left px-4 py-2 hover:bg-gray-700 transition text-gray-300"
                                    onClick={() => handleTagSelect(null)}
                                >
                                    📌 All Tags
                                </button>
                                {allTags.map(tag => (
                                    <button
                                        key={tag}
                                        className="w-full text-left px-4 py-2 hover:bg-gray-700 transition text-gray-300"
                                        onClick={() => handleTagSelect(tag)}
                                    >
                                        🏷️ {tag}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <input
                        type="text"
                        placeholder="🔎 Search articles..."
                        className="bg-gray-800 text-gray-300 px-5 py-2 rounded-lg shadow-md border border-gray-700 hover:bg-gray-700 transition focus:outline-none w-72"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {filteredPosts.length > 0 ? (
                    <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-6 justify-items-center w-full max-w-4xl">
                        {filteredPosts.map(post => <BlogCard key={post.slug} {...post} />)}
                    </div>
                ) : (
                    <p className="text-gray-400 mt-6">No articles found.</p>
                )}
            </section>
        </>
    );
}

export async function getStaticProps() {
    const filePath = path.join(process.cwd(), "content", "blog.json");
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const posts: BlogPost[] = JSON.parse(fileContent);

    return { props: { posts: posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) } };
}
