"use client";
import { register } from "@/actions/user";
import FormInput from "@/components/FormInput";
import SelectForm from "@/components/SelectForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import uploadFile from "@/lib/uploadFile";
import { useLocalStorage } from "@mantine/hooks";
import { X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

const Register = () => {
  const router = useRouter();
  const [profile, setProfile] = useState({ profileBio: "", profilePhoto: "" });
  const [resume, setResume] = useState({
    profileResume: "",
    profileResumeOriginalName: "",
  });

  // user
  const [user] = useLocalStorage({
    key: "userData",
    defaultValue: {},
  });

  const handleSubmit = async (formData) => {
    const response = await register(formData, profile, resume);
    if (response?.error) {
      toast?.error(response?.error);
    } else {
      router?.push("/login");
    }
  };

  useEffect(() => {
    if (user?.role == "recruiter") {
      router?.push("/admin/companies");
    } else if (user?.role == "student") {
      router.push("/");
    }
  }, []);
  const handleUpload = async (event, type) => {
    const file = event.target.files?.[0];
    const name = file?.name?.split(".")?.[0];
    const upload = await uploadFile(file);

    if (type == "profile") {
      setProfile({ profileBio: name, profilePhoto: upload?.url });
      toast.success("Image uploaded successfully");
    } else {
      setResume({
        profileResume: upload?.url,
        profileResumeOriginalName: name,
      });
      toast.success("Resume uploaded successfully");
    }
  };
  return (
    <div className="flex items-center justify-center max-w-7xl mx-auto mb-12">
      <form
        action={handleSubmit}
        className="w-1/2 border border-gray-200 rounded p-4 bg-gray-100 my-6"
      >
        <h1 className="font-bold text-2xl mb-4 text-yellow-400 text-center">
          Sign Up
        </h1>
        <FormInput
          label="Full Name"
          type="text"
          name="fullname"
          placeholder="Enter your name"
        />
        <FormInput
          label="Email"
          type="email"
          name="email"
          placeholder="Enter email"
        />
        <FormInput
          label="Phone Number"
          type="text"
          name="phoneNumber"
          placeholder="Enter your phone number"
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          placeholder="Enter password"
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
                onClick={() => setProfile({ profileBio: "", profilePhoto: "" })}
              />
            </div>
          </>
        ) : (
          <FormInput
            label="Upload Photo"
            type="file"
            name="picture"
            placeholder="Enter your name"
            onChange={(event) => handleUpload(event, "profile")}
          />
        )}

        <FormInput
          label="Profile Skills"
          type="text"
          name="profileSkills"
          placeholder="Enter the profile skills with commas"
        />
        {resume?.profileResume ? (
          <>
            <Label>Resume</Label>
            <div className="h-20 relative mt-1">
              <object
                data={resume?.profileResume}
                type="application/pdf"
                width="100%"
                heigth="100%"
              >
                <p>
                  {" "}
                  Alternative text - include a link{" "}
                  <a href={resume?.profileResume}> to the PDF</a>
                </p>
              </object>
              <X
                size={14}
                className="absolute -top-1 -right-1 z-10 cursor-pointer"
                onClick={() =>
                  setResume({
                    profileResume: "",
                    profileResumeOriginalName: "",
                  })
                }
              />
            </div>
          </>
        ) : (
          <FormInput
            label="Upload resume"
            type="file"
            name="picture"
            onChange={(event) => handleUpload(event, "resume")}
          />
        )}
        <SelectForm
          name="role"
          placeholder="Select a user role"
          list={["student", "recruiter"]}
        />
        <Button
          type="submit"
          className="w-full my-4 bg-yellow-400/90 hover:bg-yellow-400/95"
        >
          Sign Up
        </Button>
        <span>
          Already have an account? <Link href="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
