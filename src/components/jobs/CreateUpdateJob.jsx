"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormInput from "../FormInput";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { AdminCompanies } from "@/actions/company";
import SelectForm from "../SelectForm";
import { createEditJob } from "@/actions/job";

const CreateUpdateJob = ({ children, setJobs, jobs, job, user }) => {
  const router = useRouter();
  const [companies, setCompanies] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getCompanies = async () => {
      const result = await AdminCompanies(user?.token);
      if (result?.result?.length) setCompanies(result?.result);
    };

    if (user?.token) getCompanies();
  }, [user?.token]);

  const createNewJob = async (formData) => {
    try {
      console.log("test");

      const res = await createEditJob(formData, user?.token);
      console.log(res?.result, "res?.result");

      if (res?.success) {
        setJobs([...jobs, res?.result?.job]);
        toast.success("job created successfully");
        setOpen(false);
        router?.refresh();
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  console.log(companies, "companies");

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      className="w-full p-4 my-6 rounded-lg mx-auto"
    >
      <DialogTrigger asChild>
        <span className="bg-yellow-400 hover:bg-yellow-400 p-2 cursor-pointer rounded text-white">
          {children}
        </span>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogDescription>
            <div className="my-10 text-center">
              <h1 className="font-bold text-yellow-400 text-2xl">
                Create a Job
              </h1>
            </div>
            <form action={createNewJob}>
              <div className="grid grid-cols-2 gap-2">
                <FormInput
                  label="Title"
                  type="text"
                  name="title"
                  placeholder="Enter the job title"
                  defaultValue={job?.name}
                />
                <FormInput
                  label="Description"
                  type="text"
                  name="description"
                  placeholder="Enter description"
                  defaultValue={job?.description}
                />

                <FormInput
                  label="Requirements"
                  type="text"
                  name="requirements"
                  placeholder="Enter Requirements with commas"
                  defaultValue={job?.requirements?.join()}
                />

                <FormInput
                  label="Salary"
                  type="number"
                  name="salary"
                  placeholder="Enter the Salary"
                  defaultValue={job?.salary}
                />

                <FormInput
                  label="Location"
                  type="text"
                  name="location"
                  placeholder="Enter Location"
                  defaultValue={job?.location}
                />

                <FormInput
                  label="Job Type"
                  type="text"
                  name="jobType"
                  placeholder="Enter the job type"
                  defaultValue={job?.jobType}
                />
                <FormInput
                  label="Experience in year (1,2,3...)"
                  type="text"
                  name="experienceLevel"
                  placeholder="Please enter the experience"
                  defaultValue={job?.experienceLevel}
                />
                <FormInput
                  label="Positions"
                  type="text"
                  name="position"
                  placeholder="Enter the position"
                  defaultValue={job?.position}
                />
                <SelectForm
                  name="companyId"
                  defaultValue={job?.companyId}
                  placeholder="Select a company"
                  list={companies}
                />
              </div>
              <div className="flex justify-end mt-2">
                <Button
                  type="submit"
                  className="bg-yellow-400 hover:bg-yellow-400"
                >
                  Submit
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUpdateJob;
