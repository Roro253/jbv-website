import "./globals.css";
import { Inter } from "next/font/google";
import Nav from "@/components/Nav";
import FooterJBV from "@/components/FooterJBV";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "Your VC",
  description: "A clean VC website starter inspired by modern venture firms.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <Nav />
        {children}
        <FooterJBV />
      </body>
    </html>
  );
}
