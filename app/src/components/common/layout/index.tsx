import { ReactNode } from 'react';
import Footer from './footer';
import Header from './header';

interface LayoutProps {
    eventId: string;
    location: string;
    children: ReactNode;
}

const Layout = ({ children, eventId, location }: LayoutProps) => (
    <div className="flex min-h-screen flex-col">
        <Header eventId={eventId} location={location} />
        <main className="flex grow flex-col">{children}</main>
        <Footer />
    </div>
);

export default Layout;
