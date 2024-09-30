"use server";

import { revalidatePath } from "next/cache";

export const updateStatus = async (applicationId, status, token, jobId) => {
  try {
    const response = await fetch(
      `${process?.env.NEXT_PUBLIC_API_URL}/application/update-status/${applicationId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({ status }),
        cache: "no-cache",
      }
    );

    const result = await response.json();
    revalidatePath(`/dashboard/jobs/${jobId}`);
    return { result, success: true, message: "Status successfully updated" };
  } catch (error) {
    return { error: "Status not update" };
  }
};
