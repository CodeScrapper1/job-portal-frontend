"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useLocalStorage } from "@mantine/hooks";
import { updateStatus } from "@/actions/application";
import { toast } from "sonner";

const ApplicantsTable = ({ job }) => {
  const shortlistingStatus = ["Accepted", "Rejected"];
  const [user] = useLocalStorage({
    key: "userData",
    defaultValue: {},
  });

  const statusHandler = async (status, applicationId) => {
    const result = await updateStatus(
      applicationId,
      status,
      user?.token,
      job?.id
    );
    if (result?.success) {
      toast.success(result?.message);
    } else {
      toast.error(result?.error);
    }
  };
  return (
    <Table className="bg-white">
      <TableCaption>A list of your jobs</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">Full Name</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {job?.applications?.length
          ? job?.applications?.map((application) => (
              <TableRow key={application.id}>
                <TableCell className="font-medium">
                  {application?.applicant?.fullname}
                </TableCell>
                <TableCell>{application?.applicant?.email}</TableCell>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={application?.applicant?.profilePhoto} />
                  </Avatar>
                </TableCell>
                <TableCell>{application?.createdAt?.split("T")[0]}</TableCell>
                <TableCell>{application?.status}</TableCell>
                <TableCell className="cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {shortlistingStatus?.map((item, ind) => (
                        <div
                          key={ind}
                          className="flex w-fit items-center gap-2 cursor-pointer my-2"
                          onClick={() => statusHandler(item, application?.id)}
                        >
                          <span>{item}</span>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          : null}
      </TableBody>
    </Table>
  );
};

export default ApplicantsTable;
