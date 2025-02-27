import { GetStaticPaths, GetStaticProps } from "next";
import SEO from "@/components/SEO";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import { FaCalendarAlt, FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";

interface BlogPost {
    title: string;
    description: string;
    date: string;
    content: string;
}

export default function BlogPost({ post }: { post: BlogPost }) {
    return (
        <>
            <SEO title={`${post.title} | Gonzyui`} description={post.description} />

            <section className="min-h-screen bg-gray-900 text-white px-6 py-16 flex justify-center mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="max-w-3xl w-full bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700"
                >
                    <header className="mb-8 text-center">
                        <h1 className="text-4xl font-bold text-blue-400 hover:text-blue-300 transition duration-300">
                            {post.title}
                        </h1>
                        <p className="text-gray-400 flex items-center justify-center gap-2 mt-2 text-sm">
                            <FaCalendarAlt className="text-blue-500" />
                            <span className="bg-blue-800 px-3 py-1 rounded-full text-blue-300 text-xs font-semibold">
                                {new Date(post.date).toLocaleDateString()}
                            </span>
                        </p>
                    </header>

                    <motion.article
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="prose prose-invert max-w-none leading-relaxed"
                    >
                        <ReactMarkdown
                            components={{
                                h2: ({ children }) => <h2 className="text-2xl font-bold text-blue-400 mt-6">{children}</h2>,
                                h3: ({ children }) => <h3 className="text-xl font-semibold text-blue-300 mt-4">{children}</h3>,
                                p: ({ children }) => <p className="text-gray-300 leading-7">{children}</p>,
                                blockquote: ({ children }) => (
                                    <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-400">
                                        {children}
                                    </blockquote>
                                ),
                                pre: ({ children }) => (
                                    <pre className="bg-gray-800 p-4 rounded-lg text-gray-300 overflow-x-auto">{children}</pre>
                                ),
                                code: ({ children }) => (
                                    <code className="bg-gray-700 px-2 py-1 rounded text-blue-300 text-sm">{children}</code>
                                ),
                            }}
                        >
                            {post.content}
                        </ReactMarkdown>
                    </motion.article>

                    <div className="mt-10 text-center">
                        <Link href="/blog" className="text-blue-400 hover:text-blue-300 flex items-center justify-center gap-2">
                            <FaArrowLeft /> Back to Blog
                        </Link>
                    </div>
                </motion.div>
            </section>
        </>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const filePath = path.join(process.cwd(), "content", "blog.json");
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const posts = JSON.parse(fileContent);

    return {
        paths: posts.map((post: { slug: string }) => ({ params: { slug: post.slug } })),
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug } = params as { slug: string };
    const filePath = path.join(process.cwd(), "content", "blog", `${slug}.md`);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    return { props: { post: { ...data, content } } };
};