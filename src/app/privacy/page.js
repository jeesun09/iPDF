import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FileText, Shield, Lock, Eye } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <header className="w-full py-6 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              iPDF Privacy Policy
            </h1>
          </div>
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card>
          <CardContent className="p-6">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              At iPDF, we are committed to protecting your privacy and ensuring
              the security of your personal information. This Privacy Policy
              outlines how we collect, use, and safeguard your data when you use
              our PDF chat service.
            </p>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-semibold">
                  <Shield className="inline-block mr-2" /> Information We
                  Collect
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>
                      Personal information (e.g., name, email address) provided
                      during account creation
                    </li>
                    <li>PDF documents you upload to our service</li>
                    <li>Chat logs and interactions with our AI system</li>
                    <li>
                      Usage data, including how you interact with our service
                    </li>
                    <li>
                      Device and browser information for security and
                      optimization purposes
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-semibold">
                  <Lock className="inline-block mr-2" /> How We Use Your
                  Information
                </AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2 text-gray-700 dark:text-gray-300">
                    We use your information to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Provide and improve our PDF chat service</li>
                    <li>Process and analyze your PDF documents</li>
                    <li>Personalize your experience and improve AI model</li>
                    <li>
                      Communicate with you about your account and our services
                    </li>
                    <li>Ensure the security and integrity of our platform</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-semibold">
                  <Eye className="inline-block mr-2" /> Data Sharing and
                  Disclosure
                </AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2 text-gray-700 dark:text-gray-300">
                    We do not sell your personal information. We may share your
                    data with:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Service providers who help us operate our platform</li>
                    <li>
                      Law enforcement or other authorities if required by law
                    </li>
                    <li>Other parties with your explicit consent</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg font-semibold">
                  <Lock className="inline-block mr-2" /> Data Security
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700 dark:text-gray-300">
                    We implement robust security measures to protect your data,
                    including encryption, access controls, and regular security
                    audits. However, no method of transmission over the Internet
                    or electronic storage is 100% secure, and we cannot
                    guarantee absolute security.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-lg font-semibold">
                  <Eye className="inline-block mr-2" /> Your Rights and Choices
                </AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2 text-gray-700 dark:text-gray-300">
                    You have the right to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Access and update your personal information</li>
                    <li>Request deletion of your data</li>
                    <li>Object to the processing of your data</li>
                    <li>Export your data in a portable format</li>
                    <li>Opt-out of certain data processing activities</li>
                  </ul>
                  <p className="mt-2 text-gray-700 dark:text-gray-300">
                    To exercise these rights, please contact us at
                    jeesunbari2002@gmail.com.
                  </p>
                  <p className="mt-2 text-gray-700 dark:text-gray-300">
                    Please note that once you delete a chat, your PDF and all
                    associated chats will also be deleted.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-8 text-gray-700 dark:text-gray-300">
              <h2 className="text-xl font-semibold mb-4">
                Changes to This Privacy Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the Last Updated date.
              </p>
            </div>

            <div className="mt-8 text-gray-700 dark:text-gray-300">
              <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please
                contact us at:
                <br />
                Email: jeesunbari2002@gmail.com
              </p>
            </div>

            <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
              Last Updated: November 5, 2024
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
