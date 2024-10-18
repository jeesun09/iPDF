"use client";
import FileUpload from "@/components/FileUpload";
import Footer from "@/components/Footer";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { useAuth, UserButton } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ArrowRight, Loader2, LogIn } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useState } from "react";

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
    enabled: isSignedIn, //NOTE: only fetch when user is signed in and loaded
    onError: () => toast.error("Failed to load last chat"),
  });

  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-200 to-cyan-200 dark:bg-gradient-to-r dark:from-slate-950 dark:to-slate-950">
        <div className="p-4 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl text-center">
          <div className="flex flex-col items-center">
            <div className="flex flex-row items-center justify-center">
              <h1 className="mr-3 text-2xl text-black dark:text-slate-100 sm:text-4xl md:text-5xl font-semibold">
                Chat with your PDF
              </h1>
              {isSignedIn && <UserButton afterSwitchSessionUrl="/" />}
            </div>
            <div className="flex mt-3 justify-center">
              {isSignedIn && lastChat?.length > 0 ? (
                <Link href={`/chat/${lastChat[0].id}`} aria-label="Go to Chats">
                  <HoverBorderGradient
                    containerClassName="rounded-full"
                    className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
                    as="button"
                    onClick={() => setLoading(!loading)}
                  >
                    <span>Go to Chats</span>
                    {loading ? (
                      <Loader2 className="animate-spin w-4 h-4" />
                    ) : (
                      <ArrowRight className="ml-2" />
                    )}
                  </HoverBorderGradient>
                </Link>
              ) : null}
            </div>
            <p className="max-w-lg mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-200">
              Unlock the power of your PDFs with iPDF, an AI-driven platform
              that lets you interact with your documents effortlessly. Get
              insights and answers from your PDFs like never before.
            </p>
            <div className="w-full mt-4">
              {isSignedIn ? (
                <FileUpload />
              ) : (
                <Link
                  href="/sign-in"
                  role="button"
                  className="flex justify-center items-center"
                  aria-label="Sign In"
                >
                  <HoverBorderGradient
                    containerClassName="rounded-xl"
                    as="button"
                    className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 cursor-pointer"
                    onClick={() => setLoading(!loading)}
                  >
                    Login to get start!{" "}
                    {loading ? (
                      <Loader2 className="animate-spin w-4 h-4" />
                    ) : (
                      <LogIn className="w-4 h-4 ml-2" />
                    )}
                  </HoverBorderGradient>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
