"use client";
import React, { useState, useEffect } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useLocalStorage } from "@mantine/hooks";
import { applyJobHandler, createFavorite } from "@/actions/job";
import { toast } from "sonner";

const JobDetails = ({ singleJobById, jobId }) => {
  const [isApplied, setIsApplied] = useState(false);
  const [user] = useLocalStorage({
    key: "userData",
    defaultValue: {},
  });

  useEffect(() => {
    setIsApplied(
      singleJobById?.applications?.some(
        (application) => application?.applicantId == user?.user?.id
      )
    );
  }, [user, singleJobById]);
  console.log(isApplied, "isApplied");

  const applyJob = async () => {
    const res = await applyJobHandler(jobId, user?.token);

    if (res.success) {
      toast.success(res?.message);
    } else {
      toast.error(res.error);
    }
  };

  const addToFavorite = async () => {
    const result = await createFavorite(jobId, user?.token);
    if (result?.success) {
      toast.success(result?.message);
    } else {
      toast.error(result.error);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-between p-3 rounded-lg bg-white">
        <div>
          <h1 className="font-bold text-yellow-400 text-xl">
            {singleJobById?.title}
          </h1>
          <div className="flex items-center gap-2 my-2">
            <Badge className="text-purple-800 font-bold" variant={"ghost"}>
              {singleJobById?.position} positions
            </Badge>
            <Badge className="text-purple-800 font-bold" variant={"ghost"}>
              {singleJobById?.jobType}
            </Badge>
            <Badge className="text-purple-800 font-bold" variant={"ghost"}>
              {singleJobById?.salary} $
            </Badge>
          </div>
        </div>
        <Button
          onClick={applyJob}
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-yellow-400 hover:bg-yellow-500 cursor-pointer"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
      <h1 className="my-4 border-b-2 pb-1 text-yellow-400 border-b-gray-300 font-semibold pl-2">
        Job Description
      </h1>
      <div className="mb-20 bg-white text-black flex items-center p-3 rounded-lg justify-around m-auto hover:bg-white/95 duration-500">
        <div className="flex flex-col gap-3">
          <h1 className="font-bold my-1 grid grid-cols-2 gap-20">
            Role: <span>{singleJobById?.title}</span>
          </h1>
          <h1 className="font-bold my-1 grid grid-cols-2 gap-20">
            Location: <span>{singleJobById?.location}</span>
          </h1>

          <h1 className="font-bold my-1 grid grid-cols-2 gap-20">
            Description: <span>{singleJobById?.description}</span>
          </h1>
          <h1 className="font-bold my-1 grid grid-cols-2 gap-20">
            Experience: <span>{singleJobById?.experienceLevel} years</span>
          </h1>
          <h1 className="font-bold my-1 grid grid-cols-2 gap-20">
            Salary: <span>{singleJobById?.salary} $</span>
          </h1>
          <h1 className="font-bold my-1 grid grid-cols-2 gap-20">
            Total Applicants: <span>{singleJobById?.applications?.length}</span>
          </h1>
          <h1 className="font-bold my-1 grid grid-cols-2 gap-20">
            Posted Date:{" "}
            <span>{singleJobById?.createdAt?.split("T")?.[0]}</span>
          </h1>
        </div>
        <div className="flex flex-col justify-center gap-2">
          <img src="/download.png" alt="" />
          <Button
            className="bg-yellow-400 hover:bg-yellow-400/95 rounded-lg"
            onClick={addToFavorite}
          >
            Save For Later
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
