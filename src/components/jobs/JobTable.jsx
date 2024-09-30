"use client";
import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { useLocalStorage } from "@mantine/hooks";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, MoreHorizontal, X } from "lucide-react";
import CreateUpdateJob from "./CreateUpdateJob";
import DeleteJob from "./DeleteJob";
import { AdminJobs } from "@/actions/job";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";

const JobTable = () => {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [user] = useLocalStorage({
    key: "userData",
    defaultValue: {},
  });

  useEffect(() => {
    const getJobs = async () => {
      const result = await AdminJobs(user?.token);
      if (result?.result?.length) setJobs(result?.result);
    };

    if (user?.token) getJobs();
  }, [user?.token]);
  console.log(jobs, "jobs");

  return (
    <>
      <div className="flex items-center justify-between my-5">
        <Input className="w-fit bg-white" placeholder="Filter by name" />
        <CreateUpdateJob setJobs={setJobs} jobs={jobs} user={user}>
          <span className="">Create Job</span>
        </CreateUpdateJob>
      </div>

      <Table className="bg-white">
        <TableCaption>A list of your jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Applicants</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs?.length
            ? jobs?.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">
                    {job?.company?.name}
                  </TableCell>
                  <TableCell>{job?.title}</TableCell>
                  <TableCell>{job?.createdAt?.split("T")[0]}</TableCell>
                  <TableCell className="flex gap-2">
                    <DeleteJob setJobs={setJobs} jobs={jobs} id={job?.id}>
                      <span className="">
                        <X className="bg-red-500 text-white p-1 rounded-md h-7 w-7" />
                      </span>
                    </DeleteJob>
                  </TableCell>
                  <TableCell className="cursor-pointer">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div
                          className="flex w-fit items-center gap-2 cursor-pointer mt-2"
                          onClick={() => {
                            router.push(`/dashboard/jobs/${job.id}`);
                          }}
                        >
                          <Eye className="w-4" />
                          <span>Applicants</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </>
  );
};

export default JobTable;
