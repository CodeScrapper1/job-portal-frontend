import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { deleteCompany } from "@/actions/company";
import { toast } from "sonner";
import { deleteJob } from "@/actions/job";

const DeleteJob = ({ children, id, setJobs, jobs }) => {
  const [open, setOpen] = useState(false);

  const jobDelete = async () => {
    const result = await deleteJob(id);
    if (result?.success) {
      const updatedData = jobs?.filter((item) => item?.id !== id);
      setJobs(updatedData);
      setOpen(false);
      toast.success(result?.message);
    } else {
      toast.error(result?.error);
    }
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
          <DialogDescription>
            <form action={jobDelete}>
              <p>Do you want to delete this Job</p>
              <div className="flex justify-end mt-2">
                <Button type="submit" className="bg-red-500 text-white">
                  Delete
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteJob;
