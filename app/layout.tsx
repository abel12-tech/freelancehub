import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FreelanceHub — Find Work. Hire Talent.",
  description: "Connect with top freelancers and discover your next opportunity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1 w-full px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
        <footer className="site-footer">
          <span className="font-semibold text-[var(--foreground)]">FreelanceHub</span>
          <span className="mx-2 opacity-30">|</span>
          &copy; {new Date().getFullYear()} All rights reserved.
        </footer>
      </body>
    </html>
  );
}
