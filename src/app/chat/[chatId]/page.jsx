"use client";
import ChatComponent from "@/components/ChatComponent";
import ChatSideBar from "@/components/ChatSideBar";
import PDFViewer from "@/components/PDFViewer";
import { useAuth } from "@clerk/nextjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Loader2, PanelRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Chat = ({ params: { chatId } }) => {
  const router = useRouter();
  const [panelVisible, setPanelVisible] = useState(false);
  const { isSignedIn } = useAuth();
  if (!isSignedIn) {
    router.push("/sign-in");
  }
  //INFO: Fetch chats from the server
  const {
    data: chats = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["chats"],
    queryFn: async () => {
      const { data } = await axios.get("/api/get-chats");
      return data;
    },
  });
  const queryClient = useQueryClient();

  //INFO: Delete the mutation from the cache
  const deleteChatMutation = useMutation({
    mutationFn: async ({ chatId, fileKey }) => {
      await axios.delete("/api/delete-chat", { data: { chatId, fileKey } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["chats"]); //NOTE: Invalidate the cache to refetch the chats
      toast.success("Chat deleted successfully");
      router.push("/"); //NOTE: Redirect to the home page
    },
    onError: (error) => {
      console.error("Error deleting chat:", error);
    },
  });
  const handleDeleteChat = (chatId, fileKey) => {
    deleteChatMutation.mutate({ chatId, fileKey });
  };
  const currentChat = chats.find((chat) => String(chat.id) === String(chatId));

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader2 className="w-12 h-12 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex max-h-screen overflow-x-hidden">
      {/* Desktop view */}
      <div className="hidden lg:flex w-full max-h-screen overflow-x-hidden overflow-y-auto">
        <div className="flex-[1] w-[300px]">
          <ChatSideBar
            chatId={chatId}
            chats={chats}
            deleteChat={handleDeleteChat}
          />
        </div>
        <div className="max-h-screen p-3 overflow-hidden flex-[5]">
          <PDFViewer pdf_url={currentChat?.pdfUrl} />
        </div>
        <div className="flex-[3] max-w-md border-l-4 border-l-slate-200 dark:bg-slate-900">
          <ChatComponent chatId={chatId} />
        </div>
      </div>

      {/* Mobile view */}
      <div className="lg:hidden flex flex-row w-full h-screen overflow-y-auto justify-between">
        {panelVisible && (
          <div className="h-screen transition-transform duration-500 w-[300px]">
            <ChatSideBar
              chatId={chatId}
              chats={chats}
              deleteChat={handleDeleteChat}
            />
          </div>
        )}

        <div className="flex flex-col w-full h-screen justify-between dark:bg-slate-900">
          {/* Top bar with toggle button */}
          <div className="flex flex-row gap-1 m-2 items-center">
            <button
              onClick={() => setPanelVisible(!panelVisible)}
              className="text-center border rounded-xl p-1 text-black dark:text-slate-100"
            >
              <PanelRight />
            </button>
            <h2 className="text-xs w-full text-center border rounded-xl p-1 text-black dark:text-slate-100">
              {currentChat?.pdfName || "Chat"}
            </h2>
          </div>
          <div className="flex flex-col p-3 max-w-full h-full overflow-y-auto">
            <ChatComponent chatId={chatId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
