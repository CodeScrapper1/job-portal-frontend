"use client";
import { userAppliedJobs } from "@/actions/user";
import { useLocalStorage } from "@mantine/hooks";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import LatestJobCard from "./LatestJobCard";

const AppliedJobs = () => {
  const [user] = useLocalStorage({
    key: "userData",
    defaultValue: {},
  });

  const [getJobs, setGetJobs] = useState([]);

  useEffect(() => {
    const getAppliedJobs = async () => {
      const jobs = await userAppliedJobs(user?.token);
      setGetJobs(jobs);
    };
    if (user?.token) getAppliedJobs();
  }, [user?.token]);

  console.log(getJobs, "getJobs");

  if (user?.user?.role == "student") {
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-2xl mb-20">
        <h1 className="text-xl font-bold p-5">Applied Jobs</h1>
        <div className="grid grid-cols-3 gap-4 p-5">
          {getJobs?.length
            ? getJobs?.map((app) => (
                <Link href={`/findjobs/${app?.job?.id}`} key={app?.id}>
                  <LatestJobCard job={app?.job} />
                </Link>
              ))
            : null}
        </div>
      </div>
    );
  } else return <div></div>;
};

export default AppliedJobs;
