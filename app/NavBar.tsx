"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { logout, selectUserToken } from "store/slices/userSlice";
import useSWRMutation from "swr/mutation";
import { redirect, useRouter } from "next/navigation";
import { postRequest } from "pages/api/hello";
import { Button, Navbar } from "flowbite-react";
import { animateCSS, toggleAnimate } from "./SideBar";
import Notifications from "./Components/Notifications";

function NavBar() {
  const router = useRouter();
  const token = useAppSelector(selectUserToken);
  const [isSignIn, setIsSignIn] = useState(true);
  const [animate, setAnimate] = useState(true);
  const dispatch = useAppDispatch();
  const {
    trigger: LogoutUser,
    data,
    error,
    isMutating,
  } = useSWRMutation("/api/auth/signout", postRequest);
  const logOut = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
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
    if (!isSignIn) {
      router.push("/login");
    }
  }, [isSignIn]);
  useEffect(() => {
    if (token) setIsSignIn(true);
    else setIsSignIn(false);
  }, [token]);
  const openSideBar = () => {
    // dispatch(toggleSideBar());
  };
  const Nav = () => {
    return (
      <Navbar className="bg-slate-700" fluid={true}>
        <Navbar.Brand href="/">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="CarTrans Logo"
          />
          <span className="self-center text-white whitespace-nowrap text-xl font-semibold dark:text-slate-400">
            CarTrans
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          {/* <Navbar.Link> */}
          <Link
            href="/"
            className="text-white whitespace-nowrap font-normal text-lg hover:text-gray-400"
          >
            Home
          </Link>
          {/* </Navbar.Link> */}
          {!isSignIn ? (
            <>
              {/* <Navbar.Link className="hover:bg-slate-600"> */}
              <Link
                href="/register"
                className="text-white whitespace-nowrap font-normal text-lg hover:text-gray-400"
              >
                Register
              </Link>
              {/* </Navbar.Link> */}
              {/* <Navbar.Link className="hover:bg-slate-600"> */}
              <Link
                href="/login"
                className="text-white whitespace-nowrap font-normal text-lg hover:text-gray-400"
              >
                Login
              </Link>
              {/* </Navbar.Link> */}
            </>
          ) : (
            <>
              {/* <Navbar.Link className="hover:bg-slate-600"> */}
              <Link
                href="/create-contract"
                className="text-white whitespace-nowrap font-normal text-lg hover:text-gray-400 "
              >
                Create Contract
              </Link>

              <div
                // onClick={openSideBar}
                onClick={() => {
                  toggleAnimate(
                    "aside",
                    "animate__fadeInLeft",
                    "animate__fadeOutLeft"
                  );
                }}
                className=" text-white whitespace-nowrap font-normal text-lg cursor-pointer hover:text-gray-400"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r to-orange-400 from-sky-400 hover:to-sky-200 hover:from-orange-400">
                  My Contracts
                </span>
              </div>
              {/* </Navbar.Link> */}
              {/* <Navbar.Link className="hover:bg-slate-600"> */}
              <div
                onClick={logOut}
                className=" text-white whitespace-nowrap font-normal text-lg cursor-pointer hover:text-gray-400"
              >
                logout
              </div>
              {/* <Navbar.Link> */}
              <Notifications />
              {/* </Navbar.Link> */}
              {/* </Navbar.Link> */}
            </>
          )}
        </Navbar.Collapse>
      </Navbar>
    );
  };

  return (
    <>
      <Nav />
      {/* 
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
      */}
    </>
  );
}

export default NavBar;
