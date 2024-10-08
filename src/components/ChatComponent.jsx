"use client";
import React, { useEffect } from "react";
import MessageList from "./MessageList";
import { Input } from "./ui/input";
import { useQuery } from "@tanstack/react-query";
import { useChat } from "ai/react";
import { Button } from "./ui/button";
import { Loader2, Send } from "lucide-react";
import axios from "axios";

const ChatComponent = ({ chatId }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const response = await axios.post("/api/get-messages", { chatId });
      return response.data;
    },
  });

  const {
    input,
    handleInputChange,
    handleSubmit,
    messages,
    isLoading: loading,
  } = useChat({
    api: "/api/chat",
    body: {
      chatId,
    },
    initialMessages: data || [],
  });

  useEffect(() => {
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
      messageContainer.scrollTo({
        top: messageContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div
      className="relative max-h-screen overflow-x-hidden overflow-y-auto"
      id="message-container"
    >
      <div className="sticky top-0 inset-x-0 bg-white dark:bg-slate-900 h-fit">
        <h3 className="text-xl m-1 dark:text-slate-100">Chat</h3>
      </div>
      {/* Chat messages */}
      <MessageList messages={messages} isLoading={isLoading} />
      <form
        onSubmit={handleSubmit}
        className="sticky bottom-0 inset-x-0 lg:px-2 bg-white dark:bg-slate-900"
      >
        <div className="flex py-1 gap-1">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask for question..."
            className="w-full"
          />
          <Button className="bg-blue-600">
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatComponent;
