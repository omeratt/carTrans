"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { logout, selectUserToken } from "store/slices/userSlice";
import { postRequest } from "./register/page";
import useSWRMutation from "swr/mutation";
import { redirect, useRouter } from "next/navigation";

function NavBar() {
  const router = useRouter();
  const token = useAppSelector(selectUserToken);
  const dispatch = useAppDispatch();
  const {
    trigger: LogoutUser,
    data,
    error,
    isMutating,
  } = useSWRMutation("/api/auth/signout", postRequest);
  const logOut = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    try {
      const res = await LogoutUser();
      const jsonRes = await res?.json();
      console.log(jsonRes);

      if (jsonRes.success) {
        dispatch(logout());
        // redirect("/login");
      } else {
        alert(jsonRes.message);
      }
      //   console.log("data", data1.data);
      //   alert(JSON.stringify(data1.data));
    } catch (err) {
      console.log("err", err);
    }
  };
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token]);
  return (
    <nav className="bg-gray-800 py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href="/" className="text-white font-bold text-xl">
          Home
        </Link>
        <div className="flex items-center">
          {!token ? (
            <>
              <Link
                href="/login"
                className="mx-2 text-white hover:text-gray-400"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="mx-2 text-white hover:text-gray-400"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/create-contract"
                className="mx-2 text-white hover:text-gray-400"
              >
                Create Contract
              </Link>
              <button
                onClick={logOut}
                className="mx-2 text-white hover:text-gray-400"
              >
                logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
