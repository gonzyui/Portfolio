import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <meta charSet="UTF-8" />
                <meta name="theme-color" content="#0a0a0a" />
                <meta name="robots" content="index, follow" />
                <meta name="referrer" content="no-referrer-when-downgrade" />


                <link rel="icon" href="/favicon.ico" />
                <link rel="manifest" href="/manifest.json" />
                <link rel="canonical" href="https://gonzyuidev.xyz" />
                <link rel="sitemap" type="application/xml" href="/api/sitemap" />
            </Head>
            <body>
            <Main />
            <NextScript />
            </body>
        </Html>
    );
}