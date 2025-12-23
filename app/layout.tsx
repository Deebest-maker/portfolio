import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";

export const metadata: Metadata = {
  title: "Toma Hamidu Haruna | Blockchain & AI Developer Portfolio",
  description:
    "Toma Hamidu Haruna (Toma Didibest) - Self-taught blockchain and AI developer from Maiduguri, Nigeria. Specializing in Solidity, smart contracts, DeFi, Chainlink VRF, zkSync, machine learning, and full-stack development. Building the decentralized future. Open to scholarship opportunities.",
  keywords: [
    // Name Variations
    "Toma Hamidu Haruna",
    "Toma Haruna",
    "Thomas Haruna",
    "Toma Didibest",
    "Thomas Didibest",
    "Toma Haruna Didibest",
    "Hamidu Toma Haruna",

    // Location-Based
    "Blockchain Developer Nigeria",
    "Blockchain Developer Maiduguri",
    "Smart Contract Developer Nigeria",
    "DeFi Developer Nigeria",
    "Web3 Developer Maiduguri",
    "Solidity Developer Nigeria",
    "Self-taught Developer Nigeria",
    "Nigerian Blockchain Developer",
    "Nigerian Web3 Developer",

    // Skills & Technologies
    "Blockchain Developer",
    "Smart Contract Developer",
    "Solidity Developer",
    "DeFi Developer",
    "Web3 Developer",
    "Ethereum Developer",
    "AI Developer",
    "Machine Learning Engineer",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",

    // Blockchain Specific
    "Chainlink VRF Developer",
    "Foundry Smart Contracts",
    "zkSync Developer",
    "Decentralized Finance Developer",
    "Cryptocurrency Developer",
    "Blockchain Engineer",

    // General
    "Portfolio",
    "Developer Portfolio",
    "Blockchain Portfolio",
    "Self-taught Programmer",
    "Open to Scholarships",
  ],
  authors: [{ name: "Toma Hamidu Haruna" }],
  creator: "Toma Hamidu Haruna",
  publisher: "Toma Hamidu Haruna",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolio-gamma-drab-53.vercel.app",
    title: "Toma Hamidu Haruna | Blockchain & AI Developer",
    description:
      "Toma Hamidu Haruna (Toma Didibest) - Self-taught blockchain and AI developer from Maiduguri, Nigeria. Building the decentralized future with Solidity, DeFi, Chainlink VRF, zkSync, and machine learning. Open to scholarships and collaborations.",
    siteName: "Toma Hamidu Haruna Portfolio",
    images: [
      {
        url: "https://ouqjpbscfvwnweiodybp.supabase.co/storage/v1/object/public/portfolio-images/profiles/profile-1765066092599.jpg",
        width: 1200,
        height: 630,
        alt: "Toma Hamidu Haruna - Blockchain & AI Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Toma Hamidu Haruna | Blockchain & AI Developer",
    description:
      "Self-taught blockchain and AI developer from Nigeria. Building the decentralized future.",
    creator: "@thomas_har68635",
    images: [
      "https://ouqjpbscfvwnweiodybp.supabase.co/storage/v1/object/public/portfolio-images/profiles/profile-1765066092599.jpg",
    ],
  },
  icons: {
    icon: "https://ouqjpbscfvwnweiodybp.supabase.co/storage/v1/object/public/portfolio-images/favicon.ico",
    shortcut:
      "https://ouqjpbscfvwnweiodybp.supabase.co/storage/v1/object/public/portfolio-images/favicon.ico",
    apple:
      "https://ouqjpbscfvwnweiodybp.supabase.co/storage/v1/object/public/portfolio-images/profiles/profile-1765066092599.jpg",
  },
  verification: {
    google: "google-site-verification-code", // You'll add this later from Google Search Console
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/x-icon"
          href="https://ouqjpbscfvwnweiodybp.supabase.co/storage/v1/object/public/portfolio-images/favicon.ico"
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
