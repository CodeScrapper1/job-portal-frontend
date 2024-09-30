"use server";

import axios from "axios";

export const register = async (formData, profile, resume) => {
  const fullname = formData?.get("fullname");
  const email = formData?.get("email");
  const password = formData?.get("password");
  const phoneNumber = formData?.get("phoneNumber");
  const profileBio = profile?.profileBio;
  const profilePhoto = profile?.profilePhoto;
  const profileSkills = formData?.get("profileSkills")?.split(",");
  const profileResume = resume?.profileResume;
  const profileResumeOriginalName = resume?.profileResumeOriginalName;
  const role = formData.get("role");

  if (
    !fullname ||
    !email ||
    !password ||
    !phoneNumber ||
    !profileBio ||
    !profilePhoto ||
    !profileSkills?.length ||
    !profileResume ||
    !profileResumeOriginalName ||
    !role
  ) {
    return { error: "Please fill all the fields" };
  }

  try {
    const user = await fetch(
      `${process?.env.NEXT_PUBLIC_API_URL}/user/register`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          fullname,
          email,
          password,
          profileBio,
          profilePhoto,
          profileResume,
          profileResumeOriginalName,
          role,
          phoneNumber,
          profileSkills,
        }),
        cache: "no-cache",
      }
    );

    const res = await user.json();
    return res;
  } catch (error) {
    return { error: error?.response?.data?.message };
  }
};

// login user
export const login = async (formData) => {
  const email = formData?.get("email");
  const password = formData?.get("password");
  const role = formData?.get("role");

  if (!email || !password || !role) {
    return { error: "Please fill all the fields" };
  }

  try {
    const res = await axios.post(
      `${process?.env.NEXT_PUBLIC_API_URL}/user/login`,
      { email, password, role },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (res?.data?.success) {
      return { result: res?.data };
    }
  } catch (error) {
    return { error: error?.response?.data?.message };
  }
};

// update profile
export const updateProfile = async (formData, profile, token) => {
  const fullname = formData?.get("fullname");
  const email = formData?.get("email");
  const phoneNumber = formData?.get("phoneNumber");
  const profileBio = profile?.profileBio;
  const profilePhoto = profile?.profilePhoto;
  const profileSkills = formData?.get("profileSkills")?.split(",");
  try {
    const response = await fetch(
      `${process?.env.NEXT_PUBLIC_API_URL}/user/updateProfile`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          fullname,
          email,
          phoneNumber,
          profileBio,
          profilePhoto,
          profileSkills,
        }),
        cache: "no-cache",
      }
    );
    const userDetails = await response?.json();
    console.log(userDetails, "userDetails");

    if (userDetails) {
      return userDetails;
    } else {
      return { error: "User not updated" };
    }
  } catch (error) {
    console.log(error);
    return { error: "User not updated" };
  }
};

// get applied Jobs
export const userAppliedJobs = async (token) => {
  let jobs;
  try {
    jobs = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/application`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    });
    const res = await jobs?.json();
    return res?.applications;
  } catch (error) {}
};
