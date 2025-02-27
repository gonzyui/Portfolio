import { useState, useEffect } from "react";
import SEO from "@/components/SEO";
import Link from "next/link";

export default function NotFound() {
    const [showSecret, setShowSecret] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowSecret(true), 10000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <SEO title="404 - Page Not Found" description="Oops! The page you're looking for doesn't exist." />

            <section className="h-screen flex flex-col justify-center items-center text-center bg-gray-900 text-white px-6 relative">
                <h1 className="text-8xl font-bold text-red-500">404</h1>
                <p className="text-lg text-gray-300 max-w-lg mb-6">
                    Oops! The page you're looking for doesn't exist.
                </p>
                <Link href="/" className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg">
                    Go Back Home
                </Link>

                {showSecret && (
                    <p className="mt-6 text-sm text-gray-500 animate-fade-in">
                        🕵️‍♂️ You've been here for a while... Are you lost in the void?
                    </p>
                )}
            </section>
        </>
    );
}