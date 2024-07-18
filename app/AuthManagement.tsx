"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Loader, User } from "lucide-react";
import { useSession } from "next-auth/react";
import SignInButton from "./SignInButton";
import SignOutButton from "./SignOutButton";
import Link from "next/link";

const AuthManagement = () => {
  const { status, data: session } = useSession();
  return (
    <>
      {status === "authenticated" && (
        <Popover>
          <PopoverTrigger>
            <Avatar className="cursor-pointer">
              <AvatarImage src={session.user!.image!} />
              <AvatarFallback>?</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="flex flex-col items-center w-fit p-4 space-y-2 transition duration-200">
            <p className="text-gray-500 text-sm">{session.user!.email!}</p>
            <Link
              href={`/users/${session.user!.id}`}
              className="hover:text-primary duration-200 flex items-center gap-2"
            >
              Profile
              <User size={16}/>
            </Link>
            <SignOutButton />
          </PopoverContent>
        </Popover>
      )}
      {status === "unauthenticated" && <SignInButton />}
      {status === "loading" && <Loader className="animate-spin" />}
    </>
  );
};

export default AuthManagement;
