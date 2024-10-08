"use client";
import { uploadToS3 } from "@/lib/upload-to-s3";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Inbox, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const FileUpload = () => {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ file_key, file_name }) => {
      const response = await axios.post("/api/create-chat", {
        file_key,
        file_name,
      });
      return response.data;
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    disabled: uploading, // disable dropzone when uploading
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file.size > MAX_FILE_SIZE) {
        toast.error("File size should be less than 5MB");
        return;
      }
      try {
        setUploading(true);
        const data = await uploadToS3(file);
        if (!data?.file_key || !data?.file_name) {
          toast.error("An unexpected error occurred");
          return;
        }
        mutate(data, {
          onSuccess: ({ chat_id }) => {
            toast.success("PDF uploaded successfully");
            router.push(`/chat/${chat_id}`);
          },
          onError: (error) => {
            toast.error("Error creating chat");
            console.log("Error creating chat", error);
          },
        });
      } catch (error) {
        console.log("Error uploading file", error);
      } finally {
        setUploading(false);
      }
    },
  });
  return (
    <div className="p-2 bg-white rounded-xl">
      <div
        {...getRootProps({
          className:
            "border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 dark:bg-slate-500 py-8 flex justify-center items-center flex-col",
          role: "button",
          "aria-label": "File upload dropzone",
          tabIndex: 0,
          onClick: (e) => {
            if (uploading) e.preventDefault();
          },
        })}
      >
        <input {...getInputProps()} />
        {uploading || isPending ? (
          <>
            <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
            <p className="mt-2 text-sm text-slate-400 dark:text-stone-200">
              Uploading your PDF...
            </p>
          </>
        ) : (
          <>
            <Inbox className="h-10 w-10 text-blue-500" />
            <p className="mt-2 text-sm text-slate-400 dark:text-stone-200">
              Drag and drop your PDF here, or click to select a file
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
