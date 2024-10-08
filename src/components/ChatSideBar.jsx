"use client";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { MessageCircle, PlusCircle, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const ChatSideBar = ({ chatId, chats, deleteChat }) => {
  return (
    <div className="w-full h-screen p-4 text-gray-200 relative bg-gray-900">
      <Link href="/">
        <Button className="w-full border-dashed border-white border mt-1 lg:mt-2">
          {""}
          <PlusCircle className="mr-2 w-4 h-4" /> New Chat
        </Button>
      </Link>
      <div className="flex flex-col gap-2 mt-4 overflow-hidden">
        {chats.map((chat) => (
          <Link href={`/chat/${chat.id}`} key={chat.id}>
            <div
              className={cn("rounded-lg p-3 text-slate-300 flex items-center", {
                "bg-blue-700 text-white": String(chat.id) === String(chatId),
                "hover:text-white": String(chat.id) !== String(chatId),
              })}
            >
              <MessageCircle className="mr-2" />
              <p className="w-full overflow-hidden text-xs lg:text-sm truncate whitespace-nowrap text-ellipsis">
                {chat.pdfName}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteChat(chat.id, chat.fileKey);
                }}
                aria-label={`Delete chat ${chat.pdfName}`}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </Link>
        ))}
      </div>
      <div className="absolute bottom-1 left-2">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-200 flex-wrap">
          <Link href="/">Home</Link>
        </div>
      </div>
    </div>
  );
};

export default ChatSideBar;
