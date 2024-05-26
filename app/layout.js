import './globals.css';
import Header from './components/Header';
import { Be_Vietnam_Pro } from 'next/font/google';
import { ThemeProvider } from 'next-themes';

const beVietam = Be_Vietnam_Pro({
    subsets: ['latin'],
    weight: ['400', '600', '700'],
});

export const metadata = {
    title: 'Unsplash Collection',
    description: 'Unsplash API exercise',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={beVietam.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    <Header />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
