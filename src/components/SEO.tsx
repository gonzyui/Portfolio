import Head from "next/head";
import React from "react";

interface SEOProps {
    title: string;
    description: string;
    url?: string;
    image?: string;
}

const SEO: React.FC<SEOProps> = ({
                                     title,
                                     description,
                                     url = "https://gonzyuidev.xyz",
                                     image = "https://gonzyuidev.xyz/icon-192x192.png",
                                 }) => {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Gonzyui Portfolio",
        "url": "https://gonzyuidev.xyz",
        "description": description,
        "author": {
            "@type": "Person",
            "name": "Gonzyui"
        }
    };

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="robots" content="index, follow" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />

            {/* Open Graph (Facebook) */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={image} />

            {/* Twitter Meta */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* JSON-LD for SEO */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        </Head>
    );
};

export default SEO;