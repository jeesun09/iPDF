"use client";

import { useState } from "react";
import { useAuth, UserButton } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Loader2,
  LogIn,
  FileText,
  MessageSquare,
  Zap,
  ChevronDown,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FeatureCard from "@/components/FeatureCard";

const fetchLastChat = async () => {
  try {
    const response = await axios.get("/api/get-lastchat");
    return response.data;
  } catch (error) {
    console.error("Error in fetchLastChat", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch last chat"
    );
  }
};

export default function Home() {
  const { isSignedIn } = useAuth();
  const [loading, setLoading] = useState(false);

  const { data: lastChat } = useQuery({
    queryKey: ["lastChat"],
    queryFn: fetchLastChat,
    enabled: isSignedIn,
    onError: () => toast.error("Failed to load last chat"),
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <header className="w-full py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center bg-white dark:bg-gray-800 shadow-sm">
        <div className="flex items-center space-x-2">
          <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
            iPDF
          </span>
        </div>
        {isSignedIn ? (
          <UserButton
            afterSwitchSessionUrl="/"
            showName={true}
            appearance={{ elements: { avatarBox: "w-10 h-10" } }}
          />
        ) : (
          <Link href="/sign-in">
            <Button variant="outline">Sign In</Button>
          </Link>
        )}
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8">
        <section className="text-center py-20 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
              Chat with Your PDFs
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300 mb-8">
              Unlock the power of your PDFs with iPDF, an AI-driven platform
              that lets you interact with your documents effortlessly. Get
              insights and answers from your PDFs like never before.
            </p>
            {isSignedIn ? (
              <div className="flex items-center justify-center gap-4">
                <Button
                  size="lg"
                  onClick={() => {
                    setLoading(true);
                    window.location.href = `/chat/${lastChat?.[0]?.id}`;
                  }}
                  disabled={loading || !lastChat?.[0]?.id}
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <ArrowRight className="mr-2 h-4 w-4" />
                  )}
                  Go to Chats
                </Button>
                <a
                  href="#uploadFile"
                  className="border-2 border-gray-500 border-dashed rounded-md py-1 px-3"
                >
                  Upload Your PDF
                </a>
              </div>
            ) : (
              <Link href="/sign-in">
                <Button size="lg">
                  <LogIn className="mr-2 h-4 w-4" />
                  Get Started
                </Button>
              </Link>
            )}
          </motion.div>
        </section>

        <section className="py-16 container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={FileText}
              title="Upload PDFs"
              description="Easily upload and manage your PDF documents"
            />
            <FeatureCard
              icon={MessageSquare}
              title="Interactive Chat"
              description="Engage in conversations about your PDF content"
            />
            <FeatureCard
              icon={Zap}
              title="AI-Powered Insights"
              description="Get intelligent answers and analysis from your documents"
            />
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>How does iPDF work?</AccordionTrigger>
                <AccordionContent>
                  iPDF uses advanced AI technologies, including vector embedding
                  and OpenAI, to analyze your PDF documents and allow you to
                  interact with them through a chat interface. Simply upload
                  your PDF and start asking questions or requesting information
                  from your document.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is my data secure?</AccordionTrigger>
                <AccordionContent>
                  Yes, we take data security very seriously. All uploaded
                  documents are encrypted and stored securely. We do not share
                  or use your data for any purpose other than providing the iPDF
                  service.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  What types of PDFs can I use with iPDF?
                </AccordionTrigger>
                <AccordionContent>
                  iPDF works with most types of PDF documents, including
                  text-based PDFs, scanned documents (with OCR), and even PDFs
                  with images and tables. However, the quality of results may
                  vary depending on the complexity and clarity of the document.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        <section id="uploadFile" className="py-16">
          <Card className="max-w-4xl mx-auto overflow-hidden">
            <CardContent className="p-0">
              <div className="">
                <div className="p-8">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                    {isSignedIn ? "Upload Your PDF" : "Get Started with iPDF"}
                  </h2>
                  {isSignedIn ? (
                    <FileUpload />
                  ) : (
                    <div>
                      <p className="mb-4 text-gray-600 dark:text-gray-300">
                        Sign in to start chatting with your PDFs and unlock the
                        power of AI-driven document analysis.
                      </p>
                      <Link href="/sign-in">
                        <Button size="lg">
                          <LogIn className="mr-2 h-4 w-4" />
                          Create an Account
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="py-16 text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
            Ready to revolutionize how you work with PDFs?
          </h2>
          <Link href={isSignedIn ? `/chat/${lastChat?.[0]?.id}` : "/sign-in"}>
            <Button size="lg" disabled={loading || !lastChat?.[0]?.id}>
              {isSignedIn ? "Start Chatting" : "Get Started for Free"}
            </Button>
          </Link>
        </section>
      </main>

      <footer className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 mt-16">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="px-8 pt-16 pb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {/* Brand Section */}
              <div className="space-y-8">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-600 dark:bg-blue-500 rounded-lg p-2 shadow-lg">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                  <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
                    iPDF
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  Revolutionizing the way you interact with your PDF documents
                  through AI-powered conversations.
                </p>
              </div>

              {/* Quick Links */}
              <div className="lg:ml-auto">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  Company
                </h3>
                <ul className="space-y-4">
                  <li>
                    <Link
                      href="/about"
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-lg"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy"
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-lg"
                    >
                      Privacy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="border-t border-gray-200 dark:border-gray-700">
            <div className="px-8 py-6">
              <p className="text-center text-gray-500 dark:text-gray-400">
                &copy; 2024 iPDF, Inc. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      <motion.div
        className="fixed bottom-4 right-4 p-2 bg-blue-500 text-white rounded-full cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ChevronDown className="h-6 w-6 transform rotate-180" />
      </motion.div>
    </div>
  );
}
