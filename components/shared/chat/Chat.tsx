"use client";

import React, { useState } from "react";
import ChatTrigger from "./ChatTrigger";
import ChatWindow from "./ChatWindow";

const Chat = () => {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(true);
  return (
    <div className="fixed right-0 bottom-0 p-5 flex flex-col">
      <ChatWindow isOpen={isChatOpen} />
      <ChatTrigger setIsChatOpen={setIsChatOpen} isChatOpen={isChatOpen} />
    </div>
  );
};

export default Chat;
