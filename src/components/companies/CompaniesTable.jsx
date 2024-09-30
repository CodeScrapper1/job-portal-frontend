"use client";
import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import CreateUpdateCompany from "./CreateUpdateCompany";
import { Button } from "../ui/button";
import { useLocalStorage } from "@mantine/hooks";
import { AdminCompanies } from "@/actions/company";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import DeleteCompany from "./DeleteCompany";
import { Edit2, X } from "lucide-react";

const CompaniesTable = () => {
  const [companies, setCompanies] = useState([]);
  const [user] = useLocalStorage({
    key: "userData",
    defaultValue: {},
  });

  useEffect(() => {
    const getCompanies = async () => {
      const result = await AdminCompanies(user?.token);
      if (result?.result?.length) setCompanies(result?.result);
    };

    if (user?.token) getCompanies();
  }, [user?.token]);
  console.log(companies, "companies");

  return (
    <>
      <div className="flex items-center justify-between my-5">
        <Input className="w-fit bg-white" placeholder="Filter by name" />
        <CreateUpdateCompany
          setCompanies={setCompanies}
          companies={companies}
          user={user}
        >
          <span className="bg-yellow-400 hover:bg-yellow-400 p-2 cursor-pointer rounded text-white">
            Create Company
          </span>
        </CreateUpdateCompany>
      </div>

      <Table className="bg-white">
        <TableCaption>A list of your Companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies?.length
            ? companies?.map((company) => (
                <TableRow key={company.id}>
                  <TableCell className="font-medium">
                    <Avatar>
                      <AvatarImage src={company?.logo} />
                    </Avatar>
                  </TableCell>
                  <TableCell>{company?.name}</TableCell>
                  <TableCell>{company?.createdAt?.split("T")[0]}</TableCell>
                  <TableCell className="flex gap-2 float-end">
                    <CreateUpdateCompany
                      setCompanies={setCompanies}
                      companies={companies}
                      company={company}
                      user={user}
                    >
                      <span className="">
                        <Edit2 className="bg-yellow-400 text-white p-1 rounded-md h-7 w-7" />
                      </span>
                    </CreateUpdateCompany>
                    <DeleteCompany
                      setCompanies={setCompanies}
                      companies={companies}
                      id={company?.id}
                    >
                      <span className="">
                        <X className="bg-red-500 text-white p-1 rounded-md h-7 w-7" />
                      </span>
                    </DeleteCompany>
                  </TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </>
  );
};

export default CompaniesTable;
