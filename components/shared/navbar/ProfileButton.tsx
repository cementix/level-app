import { User } from "lucide-react";
import Link from "next/link";
import React from "react";

const ProfileButton = ({ userId }: { userId: string }) => {
  return (
    <Link
      href={`/users/${userId}`}
      className="hover:text-primary duration-200 flex items-center gap-2"
    >
      Profile
      <User size={16} />
    </Link>
  );
};

export default ProfileButton;
