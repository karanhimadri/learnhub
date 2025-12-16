import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/hooks/useAuth";
import { CourseProvider } from "@/hooks/useCourse";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LearnHub - Online Course Management Platform",
  description: "Empower learners, instructors, and administrators with a modern course management platform. Learn, teach, and manage with ease.",
  keywords: ["online courses", "e-learning", "education", "course management", "LMS"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased bg-gray-50 text-gray-900`}
      >
        <AuthProvider>
          <CourseProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </CourseProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
