import localFont from "next/font/local";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Providers from "../components/Providers";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  metadataBase: new URL("https://ipdf-jeesun.vercel.app/"),
  title: "iPDF - AI-Driven PDF Interaction",
  description:
    "Unlock the power of your PDFs with iPDF - an AI-driven platform that lets you interact with your documents effortlessly. Get insights and answers from your PDFs like never before.",
  authors: [
    {name: "Jeesun Bari", url: 'https://www.jeesunbari.online/'}
  ],
  openGraph: {
    title: "iPDF - AI-Driven PDF Interaction",
    description:
      "Effortlessly interact with your PDFs using AI. Extract insights and get answers from documents like never before.",
    type: "website",
    url: "https://ipdf-jeesun.vercel.app/",
    images: [
      {
        url: "/images/favicon.svg",
        width: 800,
        height: 600,
        alt: "iPDF - AI-Driven PDF Interaction",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "iPDF - AI-Driven PDF Interaction",
    description:
      "Effortlessly interact with your PDFs using AI. Extract insights and get answers from documents like never before.",
    creator: "@JeesunSk",
    images: [
      {
        url: "/images/favicon.svg",
        alt: "iPDF - AI-Driven PDF Interaction",
        width: 800,
        height: 600,
      },
    ],
  },
  appleWebApp: {
    capable: true,
    title: "iPDF - AI-Driven PDF Interaction",
    statusBarStyle: "black-translucent",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <Providers>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            {children}
            <Toaster />
            <Analytics />
          </body>
        </html>
      </Providers>
    </ClerkProvider>
  );
}
