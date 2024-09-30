"use server";

import { revalidatePath } from "next/cache";

export const AdminCompanies = async (token) => {
  let companies;

  try {
    companies = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/company`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    });
    const res = await companies.json();
    revalidatePath("/dashboard/jobs");
    return { result: res?.result, success: true };
  } catch (error) {
    console.log(error, "error");

    return { error: "No Company found" };
  }
};

// create new company
export const NewCompany = async (formData, logo, token, companyId) => {
  const name = formData?.get("name");
  const description = formData?.get("description");
  const website = formData?.get("website");
  const location = formData?.get("location");

  if (!name || !description || !website || !location) {
    return { error: "Please fill all the fields" };
  }
  let response;
  try {
    if (!companyId) {
      response = await fetch(
        `${process?.env.NEXT_PUBLIC_API_URL}/company/register`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            name,
            description,
            website,
            location,
            logo,
          }),
          cache: "no-cache",
        }
      );
    } else {
      response = await fetch(
        `${process?.env.NEXT_PUBLIC_API_URL}/company/${companyId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            name,
            description,
            website,
            location,
            logo,
          }),
          cache: "no-cache",
        }
      );
    }
    const company = await response?.json();
    console.log(company, "company");

    if (!company) {
      return { error: "Company not created or updated" };
    }
    revalidatePath("/dashboard/companies");
    return { result: company, success: true };
    return res;
  } catch (error) {
    return { error: error?.response?.data?.message };
  }
};

// delete company
export const deleteCompany = async (id) => {
  if (!id) {
    return { error: "Id not found" };
  }

  let company;
  try {
    const res = await fetch(
      `${process?.env.NEXT_PUBLIC_API_URL}/company/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      }
    );
    company = await res?.json();
    if (company) {
      return {
        result: company?.result,
        success: true,
        message: "Company deleted successfully",
      };
    }
  } catch (error) {
    return { error: "Company not deleted" };
  }
};
