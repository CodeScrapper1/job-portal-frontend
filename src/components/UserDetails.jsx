"use client";
import { useLocalStorage } from "@mantine/hooks";
import React, { useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import UpdateProfileDiaog from "./UpdateProfileDiaog";

const UserDetails = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useLocalStorage({
    key: "userData",
    defaultValue: {},
  });

  return (
    <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="font-medium text-xl">{user?.user?.fullname}</h1>
            <p>{user?.user?.profileBio || "Add your profile here"}</p>
          </div>
          <Avatar>
            <AvatarImage
              src={user?.user?.profilePhoto}
              alt={user?.user?.fullname}
            />
          </Avatar>
        </div>
        <Button
          className="text-right"
          variant="outline"
          onClick={() => setOpen(true)}
        >
          <Pen />
        </Button>
      </div>
      <div className="my-5 space-y-5">
        <div className="flex items-center gap-3 my-2">
          <Mail className="h-4 w-4" />
          <span>{user?.user?.email}</span>
        </div>
        <div className="flex items-center gap-3 my-2">
          <Contact className="h-4 w-4" />
          <span>{user?.user?.phoneNumber}</span>
        </div>
      </div>
      <div>
        <h1 className="my-2 font-bold">Skills</h1>
        <div className="space-x-2">
          {user?.user?.profileSkills?.length ? (
            user?.user?.profileSkills?.map((skill, index) => (
              <Badge key={index} className="bg-yellow-400 hover:bg-yellow-400">
                {skill}
              </Badge>
            ))
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
      <UpdateProfileDiaog
        setOpen={setOpen}
        open={open}
        user={user}
        setUser={setUser}
      />
    </div>
  );
};

export default UserDetails;
