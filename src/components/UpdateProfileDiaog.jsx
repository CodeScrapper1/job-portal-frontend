import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import FormInput from "./FormInput";
import uploadFile from "@/lib/uploadFile";
import { toast } from "sonner";
import { Label } from "./ui/label";
import { X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { updateProfile } from "@/actions/user";

const UpdateProfileDiaog = ({ setOpen, open, user, setUser }) => {
  const [profile, setProfile] = useState({
    profileBio: user?.user?.fullname,
    profilePhoto: user?.user?.profilePhoto,
  });

  useEffect(() => {
    setProfile({
      profileBio: user?.user?.fullname,
      profilePhoto: user?.user?.profilePhoto,
    });
  }, [user?.user]);
  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    const name = file?.name?.split(".")?.[0];
    const upload = await uploadFile(file);

    setProfile({ profileBio: name, profilePhoto: upload?.url });
    toast.success("Image uploaded successfully");
  };
  const handleSubmit = async (formData) => {
    const res = await updateProfile(formData, profile, user?.token);
    if (res?.success) {
      setUser({ ...user, user: res?.user });
      toast.success(res?.message);
      setOpen(false);
    } else {
      toast.error(res?.error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-xl bg-white">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>
        <form action={handleSubmit}>
          <FormInput
            label="Full Name"
            type="text"
            name="fullname"
            placeholder="Enter your name"
            defaultValue={user?.user?.fullname}
          />
          <FormInput
            label="Email"
            type="email"
            name="email"
            placeholder="Enter email"
            defaultValue={user?.user?.email}
          />
          <FormInput
            label="Phone Number"
            type="text"
            name="phoneNumber"
            placeholder="Enter your phone number"
            defaultValue={user?.user?.phoneNumber}
          />
          {profile?.profilePhoto ? (
            <>
              <Label>profile Photo</Label>
              <div className="h-20 w-20 relative mt-1">
                <Avatar className="w-full h-full">
                  <AvatarImage src={profile?.profilePhoto} alt="iamge" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <X
                  size={14}
                  className="absolute -top-1 -right-1 z-10 cursor-pointer"
                  onClick={() =>
                    setProfile({ profileBio: "", profilePhoto: "" })
                  }
                />
              </div>
            </>
          ) : (
            <FormInput
              label="Upload Photo"
              type="file"
              name="picture"
              placeholder="Enter your name"
              onChange={(event) => handleUpload(event)}
            />
          )}
          <FormInput
            label="Profile Skills"
            type="text"
            name="profileSkills"
            placeholder="Enter the profile skills with commas"
            defaultValue={user?.user?.profileSkills?.join()}
          />
          <Button
            type="submit"
            className="w-full my-4 bg-yellow-400/90 hover:bg-yellow-400/95"
          >
            Save changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDiaog;
