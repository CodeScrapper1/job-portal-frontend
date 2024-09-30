import ApplicantsTable from "@/components/jobs/ApplicantsTable";
import React from "react";

const JobId = async ({ params }) => {
  const jobId = params?.jobId;
  const response = await fetch(
    `${process?.env.NEXT_PUBLIC_API_URL}/application/${jobId}`,
    {
      cache: "no-cache",
    }
  );
  const applicants = await response.json();
  console.log(applicants?.job?.applications?.[0]?.applicant, "response");

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="font-semibold text-xl my-5 text-white">Applicants</h1>
      <ApplicantsTable job={applicants?.job} />
    </div>
  );
};

export default JobId;
