"use client";
import { UserType } from "Models/User";
import React, { useEffect, useState } from "react";

import { Inter } from "@next/font/google";
import dbConnect from "../lib/dbConnect";
import { getUsers } from "@/lib/services/users";
// import { useRouter } from "next/router";
import { redirect } from "next/navigation";
import { selectUserToken } from "store/slices/userSlice";
import { useAppSelector } from "store/hooks";
interface props {
  users: UserType;
}
interface FormErrors {
  email?: string;
  password?: string;
}
function Home() {
  // await dbConnect();
  // const users = await getUsers();
  // const res = await fetch("http://localhost:3000/api/users");
  // console.log(await res.json());
  // console.log(res);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  // const router = useRouter();
  const token = useAppSelector(selectUserToken);
  console.log("asdasdasd", token);
  if (!token) redirect("/login");
  const validate = () => {
    const newErrors: FormErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(email, password);
    // perform authentication here
  };
  useEffect(() => {}, [email, password]);

  return (
    <div className="h-[32rem]  grid place-content-center  ">
      <h1 className="animate__animated animate__fadeInDown text-center mb-5 text-3xl">
        Welcome to Car Trans
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white animate__animated animate__fadeIn w-[25rem] shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            id="email"
            value={email}
            required
            onChange={(event) => {
              setEmail(event.target.value), validate();
            }}
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic mt-2">{errors.email}</p>
          )}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            id="password"
            value={password}
            required
            onChange={(event) => {
              setPassword(event.target.value);
              validate();
            }}
          />
          {errors.password && (
            <p className="text-red-500 text-xs italic mt-2">
              {errors.password}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Home;

// function LoginForm() {

// }
