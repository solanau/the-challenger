import { ReactNode } from 'react';
import Footer from './footer';
import Header from './header';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
    <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex grow flex-col">{children}</main>
        <Footer />
    </div>
);

export default Layout;
