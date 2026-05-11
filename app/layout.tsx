import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://madhanbv.dev"),
  title: "MADHAN BV | Digital Innovation Lab",
  description: "Computer Science student passionate about full-stack development, blockchain, and innovation. Explore projects, research interests, and entrepreneurial ventures.",
  keywords: ["Developer", "Full-Stack", "Blockchain", "UI/UX", "Startup", "Innovation"],
  authors: [{ name: "MADHAN BV" }],
  creator: "MADHAN BV",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MADHAN BV | Digital Innovation Lab",
    description: "Engineering ideas into meaningful digital experiences",
    type: "website",
    url: "https://madhanbv.dev",
    siteName: "MADHAN BV Portfolio",
    images: [
      {
        url: "/images/madhan-profile.jpg",
        width: 1200,
        height: 630,
        alt: "MADHAN BV portfolio profile",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@madhan_b_v",
    images: ["/images/madhan-profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}
