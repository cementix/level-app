import fetchMessages from "@/app/api/message/fetchMessages";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { Conversation, Message } from "@prisma/client";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

const MessagesContainer = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    fetchMessages().then((messages) => setMessages(messages));
  }, []);

  return (
    <div className="h-full flex-grow overflow-y-auto">
      {messages.map((message) => (
        <p key={message.id}>{message.body}</p>
      ))}
    </div>
  );
};

export default MessagesContainer;
