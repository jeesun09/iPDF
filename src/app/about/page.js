import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Users, Zap, Globe } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <header className="w-full py-6 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              About iPDF
            </h1>
          </div>
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Our Mission
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Welcome to iPDF, where the power of AI meets the world of digital
              documents. Our mission is to transform the way you interact with
              your PDFs, making it easier than ever to extract insights, find
              answers, and unlock the full potential of your content.
              <br />
              In a world overflowing with information, finding the right data at
              the right time is crucial. At iPDF, we believe that your documents
              should work for you, not the other way around. By harnessing the
              latest advancements in artificial intelligence, we empower users
              to engage with their PDFs in a more meaningful and intuitive way.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              What We Do
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <Users className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-2" />
                <h3 className="text-lg font-semibold mb-2">
                  User-Friendly Interface
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We provide an intuitive platform for uploading and interacting
                  with PDF documents.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Zap className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-2" />
                <h3 className="text-lg font-semibold mb-2">
                  AI-Powered Analysis
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Dive deep into your documents to uncover hidden insights and
                  valuable information.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Globe className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-2" />
                <h3 className="text-lg font-semibold mb-2">
                  Enhance Productivity
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Save time and effort by getting the information you need
                  without scrolling through endless pages.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
