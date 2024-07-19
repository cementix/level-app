import { BotMessageSquare } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

const ChatTrigger = ({
  setIsChatOpen,
  isChatOpen,
}: {
  setIsChatOpen: Dispatch<SetStateAction<boolean>>;
  isChatOpen: boolean;
}) => {
  return (
    <div
      className="h-24 w-24 rounded-full bg-primary text-white flex items-center justify-center cursor-pointer"
      onClick={() => setIsChatOpen(!isChatOpen)}
    >
      <BotMessageSquare size={50} />
    </div>
  );
};

export default ChatTrigger;
