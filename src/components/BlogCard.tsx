import Link from "next/link";

interface BlogCardProps {
    title: string;
    slug: string;
    description: string;
    date: string;
    tags: string[];
}

const truncateText = (text: string, maxLength: number) =>
    text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

const BlogCard: React.FC<BlogCardProps> = ({ title, slug, description, date, tags }) => (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 hover:shadow-2xl transition w-full max-w-sm h-80 flex flex-col justify-between">
        <div>
            <h2 className="text-2xl font-bold text-blue-400 mb-2">{title}</h2>
            <p className="text-gray-400 text-sm mb-4 h-20 overflow-hidden">
                {truncateText(description, 100)}
            </p>
        </div>
        <div>
            <p className="text-gray-500 text-xs">{date}</p>
            <div className="flex flex-wrap gap-2 mt-2">
                {tags.map(tag => (
                    <span
                        key={tag}
                        className="bg-gray-700 text-gray-300 text-xs font-semibold px-2 py-1 rounded"
                    >
            {tag}
          </span>
                ))}
            </div>
            <Link href={`/blog/${slug}`} className="inline-block mt-4 text-blue-400 font-medium hover:text-blue-300 transition">
                    Read more →
            </Link>
        </div>
    </div>
);

export default BlogCard;
