"use client";
import { UserType } from "Models/User";
import React, { useEffect, useState } from "react";

import { Inter } from "@next/font/google";
import dbConnect from "../lib/dbConnect";
import { getUsers } from "@/lib/services/users";
// import { useRouter } from "next/router";
import { redirect } from "next/navigation";
import { selectUser, selectUserToken } from "store/slices/userSlice";
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

  // const router = useRouter();
  const token = useAppSelector(selectUserToken);
  if (!token) redirect("/login");
  const user = useAppSelector(selectUser);

  return (
    <div className="h-[32rem]  grid place-content-center  ">
      <h1 className="animate__animated animate__fadeInDown text-center mb-5 text-3xl">
        Welcome to Car Trans
      </h1>
      <h1 className="animate__animated animate__fadeInDown text-center mb-4 text-3xl">
        Welcome {user.name}
      </h1>
      <h1 className="animate__animated animate__fadeInDown text-center mb-3 text-3xl">
        Email: {user.email}
      </h1>
    </div>
  );
}

export default Home;

// function LoginForm() {

// }
