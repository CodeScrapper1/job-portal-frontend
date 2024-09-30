"use client";
import { login } from "@/actions/user";
import FormInput from "@/components/FormInput";
import SelectForm from "@/components/SelectForm";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@mantine/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";

const Login = () => {
  const router = useRouter();

  const [user, setUser] = useLocalStorage({
    key: "userData",
    defaultValue: {},
  });

  useEffect(() => {
    if (user?.role == "recruiter") {
      router?.push("/admin/companies");
    } else if (user?.role == "student") {
      router.push("/");
    }
  }, []);

  const handleSubmit = async (formData) => {
    const response = await login(formData);
    if (response?.error) {
      toast?.error(response?.error);
    } else {
      setUser(response?.result);
      router?.push("/");
    }
  };
  return (
    <div className="flex items-center justify-center h-[calc(100vh_-_115px)] max-w-7xl mx-auto mb-12">
      <form
        action={handleSubmit}
        className="w-1/2 border border-gray-200 rounded p-4 bg-gray-100 my-6"
      >
        <h1 className="font-bold text-2xl mb-4 text-yellow-400 text-center">
          Login
        </h1>
        <FormInput
          label="Email"
          type="email"
          name="email"
          placeholder="Enter email"
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          placeholder="Enter password"
        />
        <SelectForm
          name="role"
          placeholder="Select a user role"
          list={["student", "recruiter"]}
        />
        <Button
          type="submit"
          className="w-full my-4 bg-yellow-400/90 hover:bg-yellow-400/95"
        >
          Login
        </Button>
        <span>
          Your don't have an account? <Link href="/register">Signup</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
