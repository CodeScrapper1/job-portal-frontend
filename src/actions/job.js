"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";

export const applyJobHandler = async (JobId, token) => {
  try {
    axios.defaults.withCredentials = true;
    const res = await axios.post(
      `${process?.env.NEXT_PUBLIC_API_URL}/application/${JobId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    revalidatePath(`/job/${JobId}`);
    return {
      result: res?.data,
      success: true,
      message: "You have applied successfully",
    };
  } catch (error) {
    return { error: "Not applied yet" };
  }
};

// job add to favorite
export const createFavorite = async (jobId, token) => {
  try {
    const res = await axios.post(
      `${process?.env.NEXT_PUBLIC_API_URL}/job/favorite/${jobId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res?.data, "res?.data");

    revalidatePath(`/job/${jobId}`);
    if (res?.data?.success) {
      return {
        result: res?.data?.result,
        success: res?.data?.success,
        message: "Add to favorite successfully",
      };
    } else {
      return { error: "Already in favorite" };
    }
  } catch (error) {
    return { error: "Already in favorite" };
  }
};

// get admin jobs
export const AdminJobs = async (token) => {
  let jobs;

  try {
    jobs = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/job/admin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    });
    const res = await jobs.json();
    revalidatePath("/dashboard/jobs");
    return { result: res?.jobs, success: true };
  } catch (error) {
    console.log(error, "error");

    return { error: "No Job found" };
  }
};

// create job
export const createEditJob = async (formData, token) => {
  const title = formData?.get("title");
  const description = formData?.get("description");
  const requirements = formData?.get("requirements");
  const salary = formData?.get("salary");
  const location = formData?.get("location");
  const jobType = formData?.get("jobType");
  const experienceLevel = formData?.get("experienceLevel");
  const position = formData?.get("position");
  const companyId = formData?.get("companyId");

  console.log(
    title,
    "title",
    description,
    "description",
    requirements,
    "requirements",
    location,
    "location",
    salary,
    "salary",
    jobType,
    "jobType",
    experienceLevel,
    "experienceLevel",
    position,
    "position",
    companyId
  );

  if (
    !title ||
    !description ||
    !requirements ||
    !location ||
    !salary ||
    !jobType ||
    !experienceLevel ||
    !position ||
    !companyId
  ) {
    return { error: "Please fill all the fields" };
  }

  try {
    const response = await fetch(`${process?.env.NEXT_PUBLIC_API_URL}/job`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        title,
        description,
        requirements: requirements?.split(","),
        location,
        salary: parseFloat(salary),
        jobType,
        experienceLevel,
        position: parseInt(position),
        companyId,
      }),
      cache: "no-cache",
    });

    const job = await response?.json();
    console.log(job, "job");

    if (!job) {
      return { error: "job not created or updated" };
    }
    revalidatePath("/dashboard/jobs");
    return { result: job, success: true };
    return res;
  } catch (error) {
    return { error: error?.response?.data?.message };
  }
};

// delete job

export const deleteJob = async (id) => {
  if (!id) {
    return { error: "Id not found" };
  }

  let job;
  try {
    const res = await fetch(`${process?.env.NEXT_PUBLIC_API_URL}/job/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });
    job = await res?.json();
    if (job) {
      return {
        result: job?.result,
        success: true,
        message: "Job deleted successfully",
      };
    }
  } catch (error) {
    return { error: "Job not deleted" };
  }
};
