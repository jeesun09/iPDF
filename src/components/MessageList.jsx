import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";
import Markdown from "react-markdown";

const MessageList = ({ messages, isLoading }) => {
  if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }
  if (!messages) return <></>;
  return (
    <div className="flex flex-col gap-2 px-4 py-1 whitespace-pre-wrap">
      {messages.map((message) => {
        return (
          <div
            key={message.id}
            className={cn("flex", {
              "justify-end pl-10": message.role === "user",
              "justify-start pr-10": message.role === "assistant",
            })}
          >
            <div
              className={cn(
                "rounded-lg px-3 text-sm py-1 shadow-md right-1 ring-gray-900/10 dark:text-slate-100",
                {
                  "bg-blue-600 text-white": message.role === "user",
                }
              )}
            >
              <Markdown>{message.content}</Markdown>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
