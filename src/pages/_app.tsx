import Layout from "@/components/Layout";
import { AppProps } from "next/app";
import "@/styles/globals.css";

export default ({ Component, pageProps }: AppProps) => (
    <Layout>
        <Component {...pageProps} />
    </Layout>
);