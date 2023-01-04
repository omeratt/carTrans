"use client";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { ContractState, selectUserToken } from "store/slices/userSlice";
import LoadingSpinner from "./Components/LoadingSpinner";
// import { selectIsSideBar, toggleSideBar } from "store/slices/showSlice";
const ContractElement = ({
  txt,
  pending,
}: {
  txt: string;
  pending: boolean;
}) => {
  return (
    <a
      href="#"
      className="flex items-center p-2 text-base font-normal text-white rounded-lg  hover:text-gray-500 group-hover:text-gray-500 hover:bg-slate-200"
    >
      <svg
        aria-hidden="true"
        className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 hover:text-white group-hover:text-white  dark:group-hover:text-white"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
          clipRule="evenodd"
        ></path>
      </svg>
      <span className="flex-1 ml-3 whitespace-nowrap font-normal text-lg">
        {txt}
      </span>
      {pending && (
        <span className="inline-flex items-center justify-center px-2 ml-3 text-xs font-medium text-gray-800 bg-red-600 rounded-full dark:bg-gray-700 dark:text-gray-300">
          Pending
        </span>
      )}
    </a>
  );
};
export const animateCSS = (
  element: string,
  animation: string,
  prefix = "animate__"
) =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);
    if (!node) return;
    let list = node?.classList.value.split(" ");
    let index: number =
      list?.findIndex((element) => element == "animate__animated") || -1;
    if (~index) {
      console.log(index);
      node?.classList.remove(list[index + 1]);
      node?.classList.add(animationName);
      //@ts-ignore
      node?.style.setProperty("--animate-duration", "0.2s");
      // return;
    } else {
      node.classList.add(`${prefix}animated`, animationName);
    }

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event: Event) {
      console.log("animation end");
      event.stopPropagation();
      node?.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }

    // node.addEventListener("animationend", handleAnimationEnd, { once: true });
  });
export const toggleSideBar = () => {
  const sideBar = document.querySelector("aside");
  const open = "animate__fadeInLeft";
  const close = "animate__fadeOutLeft";
  const prefix = "animate__animated";

  if (sideBar) {
    let list = sideBar?.classList.value.split(" ");
    let index: number = list?.findIndex((element) => element == prefix) || -1;
    if (~index) {
      if (list[index + 1] == open) {
        sideBar?.classList.replace(list[index + 1], close);
      } else {
        sideBar?.classList.replace(list[index + 1], open);
      }
    } else {
      sideBar?.classList.add(prefix);
      sideBar?.classList.add(close);
    }
  }
};
export const fetcher = async (url: string) =>
  await fetch(url).then((r) => r.json());
export default function SideBar() {
  const [signIn, setIsSignIn] = useState(false);
  const token = useAppSelector(selectUserToken);
  useEffect(() => {
    if (token) {
      setIsSignIn(true);
    } else setIsSignIn(false);
  }, [token]);
  if (!signIn) return null;
  return <RealSideBar />;
}
export function RealSideBar() {
  const { data, error, isLoading } = useSWR("/api/contract/getMy", fetcher, {
    refreshInterval: 5000,
  });
  const [contracts, setContracts] = useState(data?.data);
  const CloseIcon = () => (
    <a
      // onClick={closeSideBar}
      onClick={() => {
        toggleSideBar();
      }}
      className="flex items-center p-2 text-base font-normal text-white rounded-lg  hover:text-gray-500 group-hover:text-gray-500 hover:bg-slate-200 cursor-pointer"
    >
      <svg
        id="Layer_1"
        fill="currentColor"
        version="1.1"
        viewBox="0 0 500 500"
        className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
        // xml:space="preserve"
        xmlns="http://www.w3.org/2000/svg"
        // xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z"
        />
      </svg>
      <span className="flex-1 ml-3 whitespace-nowrap font-normal text-lg"></span>
    </a>
  );

  useEffect(() => {
    animateCSS("aside", "fadeInLeft");
  }, []);
  useEffect(() => {
    if (data) setContracts(data.data);
  }, [data]);

  return (
    <aside
      className="flex-grow absolute z-40 rounded border-transparent border-2"
      aria-label="Sidebar"
    >
      <div className="overflow-y-auto py-4 px-3 bg-slate-700 rounded dark:bg-gray-800">
        <ul className="space-y-2">
          <li>
            <span className="p-2 text-transparent bg-clip-text bg-gradient-to-r to-orange-400 from-sky-400 hover:to-sky-200 hover:from-orange-400">
              My Contracts
            </span>
            {isLoading && (
              <div className="pt-6 pl-10">
                <LoadingSpinner />
              </div>
            )}
            {contracts &&
              contracts.map((cont: ContractState) => (
                <ContractElement
                  key={cont._id}
                  txt={"Contract " + cont.carBrand}
                  pending={!cont.confirm}
                />
              ))}
            <CloseIcon />
          </li>
        </ul>
      </div>
    </aside>
  );

  /*
    <div className="z-1 absolute animate__animated animate__fadeInLeft">
      <Sidebar
        color="transparent"

        // className=" opacity-95 bg-slate-400"
        // aria-label="Default sidebar example"
      >
        <Sidebar.Items className="bg-transparent">
          <Sidebar.ItemGroup className="bg-transparent">
            <Sidebar.Item href="#" icon={ContractIcon}>
              Kanban
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={ContractIcon} label="3">
              Inbox
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={ContractIcon}>
              Users
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={ContractIcon}>
              Products
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={ContractIcon}>
              Sign In
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={ContractIcon}>
              Sign Up
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={CloseIcon}>
              
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
*/
}
