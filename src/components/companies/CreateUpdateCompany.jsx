"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormInput from "../FormInput";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import uploadFile from "@/lib/uploadFile";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { NewCompany } from "@/actions/company";
import { useRouter } from "next/navigation";

const CreateUpdateCompany = ({
  children,
  setCompanies,
  companies,
  company,
  user,
}) => {
  const router = useRouter();
  const [logo, setLogo] = useState(company?.logo || "");
  const [open, setOpen] = useState(false);
  const createNewCompany = async (formData) => {
    try {
      const res = await NewCompany(formData, logo, user?.token, company?.id);
      console.log(res?.result, "res?.result");

      if (res?.success) {
        if (!company?.id) {
          setCompanies([...companies, res?.result?.result]);
          toast.success("Company created successfully");
        } else {
          const updatedData = companies?.map((item) =>
            item?.id == res?.result?.result?.id ? res?.result?.result : item
          );
          setCompanies(updatedData);
          toast.success("Company updated successfully");
        }
        setOpen(false);
        router?.refresh();
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    const upload = await uploadFile(file);

    setLogo(upload?.url);
    toast.success("Image uploaded successfully");
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      className="w-full p-4 my-6 rounded-lg mx-auto"
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>{children}</DialogTitle>
          <DialogDescription>
            <div className="my-10 text-center">
              <h1 className="font-bold text-yellow-400 text-2xl">
                Your Company Name
              </h1>
            </div>
            <form action={createNewCompany}>
              <FormInput
                label="Company Name"
                type="text"
                name="name"
                placeholder="Enter Company name"
                defaultValue={company?.name}
              />
              <FormInput
                label="Description"
                type="text"
                name="description"
                placeholder="Enter description"
                defaultValue={company?.description}
              />

              <FormInput
                label="Website"
                type="text"
                name="website"
                placeholder="Enter website url"
                defaultValue={company?.website}
              />

              <FormInput
                label="Location"
                type="text"
                name="location"
                placeholder="Enter Location"
                defaultValue={company?.location}
              />
              {logo && (
                <Avatar className="w-20 h-20">
                  <AvatarImage src={logo} />
                  <AvatarFallback>{company?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              <div className=" ">
                <Label htmlFor="picture">Upload Logo</Label>
                <Input id="picture" type="file" onChange={handleUpload} />
              </div>
              <div className="flex justify-end mt-2">
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUpdateCompany;
