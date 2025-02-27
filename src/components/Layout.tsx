import Constellation from "./Constellation";
import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="relative min-h-screen">
            <Constellation />
            <Sidebar />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
