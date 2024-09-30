import JobDetails from "@/components/jobs/JobDetails";
import React from "react";

const JobId = async ({ params }) => {
  const jobId = params.jobId;
  const jobs = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/job/${jobId}`, {
    cache: "no-cache",
  });
  const singleJobById = await jobs.json();
  console.log(singleJobById, "singleJobById");

  return (
    <div className="px-[10%] mx-auto my-10">
      <JobDetails singleJobById={singleJobById?.job} jobId={jobId} />
    </div>
  );
};

export default JobId;
