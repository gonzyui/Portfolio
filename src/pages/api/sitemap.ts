import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
    const baseUrl = "https://gonzyuidev.xyz";

    const staticPages = [
        "",
        "projects",
        "skills",
        "blog"
    ];

    const filePath = path.join(process.cwd(), "content", "blog.json");
    const blogPosts = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, "utf-8")) : [];

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    staticPages.forEach(page => {
        sitemap += `<url><loc>${baseUrl}/${page}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>\n`;
    });

    blogPosts.forEach((post: { slug: string, date: string }) => {
        sitemap += `<url><loc>${baseUrl}/blog/${post.slug}</loc><lastmod>${post.date}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>\n`;
    });

    sitemap += `</urlset>`;

    res.setHeader("Content-Type", "application/xml");
    res.status(200).send(sitemap);
}
