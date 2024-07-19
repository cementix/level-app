import { Avatar, AvatarImage } from "@/components/ui/avatar";
import classNames from "classnames";
import MessagesContainer from "./MessagesContainer";
import MessageInput from "./MessageInput";

const ChatWindow = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div
      className={classNames(
        "bg-zinc-200 rounded-xl absolute right-24 bottom-32 h-96 w-96 transition-opacity duration-300 flex flex-col",
        {
          "opacity-100": isOpen,
          "opacity-0": !isOpen,
        }
      )}
    >
      <div className="w-full bg-primary text-zinc-800 flex items-center font-bold h-24 rounded-t-xl justify-start gap-5 pl-4 text-xl">
        <Avatar className="w-11 h-11">
          <AvatarImage src="/system.webp" />
        </Avatar>
        Chat with the system
      </div>

<MessagesContainer />

      <MessageInput />

    </div>
  );
};

export default ChatWindow;
