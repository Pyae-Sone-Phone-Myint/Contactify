import React from "react";
import Cookies from "js-cookie";

import { FaUserCircle } from "react-icons/fa";
import { MdArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useGetProfileQuery } from "../../../redux/api/contactApi";

const User_detail = () => {
  const token = Cookies.get("token");
  const { data } = useGetProfileQuery(token);
  const nav = useNavigate();
  return (
    <>
      <div className=" flex flex-col justify-center items-start m-2 md:m-4">
        <h2 className="text-2xl md:text-3xl mb-3">Personal info</h2>

        <div className="lg:w-8/12">
          {/* Basic Info */}
          <div className=" border border-gray-500 rounded-lg">
            <h3 className="text-xl md:text-2xl px-5 pt-5">Basic info</h3>
            <p className=" text-gray-700 text-sm mb-3 px-5">
              Some info may be visible to other people
            </p>
            <div className="flex justify-between border-b py-3 items-center h-20 px-5 cursor-pointer hover:bg-opacity-30 hover:bg-gray-200 duration-150 transition">
              <div className="w-9/12  flex flex-col justify-between items-start md:flex-row md:items-center">
                <h4 className="text-xs text-50 font-bold md:w-3/12">
                  Profile picture
                </h4>
                <p className="text-xs text-50 md:text-sm w-9/12">
                  A profile picture helps personalize your account
                </p>
              </div>
              <FaUserCircle size={"3rem"} />
            </div>
            <div className="flex justify-between border-b pb-3 items-center h-20 px-5 cursor-pointer hover:bg-opacity-30 hover:bg-gray-200 duration-150 transition">
              <div className="w-9/12  flex flex-col justify-between items-start md:flex-row md:items-center">
                <h4 className="text-xs text-50 font-bold md:w-3/12">Name</h4>
                <p className="text-xs text-50 md:text-sm w-9/12">
                  {data?.success && data.user.name}
                </p>
              </div>
              <MdArrowForwardIos className="text-lg md:text-2xl" />
            </div>
            <div className="flex justify-between border-b pb-3 items-center h-20 px-5 cursor-pointer hover:bg-opacity-30 hover:bg-gray-200 duration-150 transition">
              <div className="w-9/12  flex flex-col justify-between items-start md:flex-row md:items-center">
                <h4 className="text-xs text-50 font-bold md:w-3/12">
                  Birthday
                </h4>
                <p className="text-xs text-50 md:text-sm w-9/12">Not set</p>
              </div>
              <MdArrowForwardIos className="text-lg md:text-2xl" />
            </div>
            <div className="flex justify-between items-center h-20 px-5 cursor-pointer hover:bg-opacity-30 hover:bg-gray-200 duration-150 transition">
              <div className="w-9/12  flex flex-col justify-between items-start md:flex-row md:items-center">
                <h4 className="text-xs text-50 font-bold md:w-3/12">Gender</h4>
                <p className="text-xs text-50 md:text-sm w-9/12">Not set</p>
              </div>
              <MdArrowForwardIos className="text-lg md:text-2xl" />
            </div>
          </div>

          {/* Contact Info */}
          <div className=" border border-gray-500 rounded-lg mt-5">
            <h3 className=" text-2xl px-5 pt-5">Contact info</h3>

            <div className="flex justify-between border-b pb-3 items-center h-20 px-5 cursor-pointer hover:bg-opacity-30 hover:bg-gray-200 duration-150 transition">
              <div className="w-9/12  flex flex-col justify-between items-start md:flex-row md:items-center">
                <h4 className="text-xs text-50 font-bold md:w-3/12">Email</h4>
                <p className="text-xs text-50 md:text-sm w-9/12">
                  {data?.success && data.user.email}
                </p>
              </div>
              <MdArrowForwardIos className="text-lg md:text-2xl" />
            </div>
            <div className="flex justify-between border-b pb-3 items-center h-20 px-5 cursor-pointer hover:bg-opacity-30 hover:bg-gray-200 duration-150 transition">
              <div className="w-9/12  flex flex-col justify-between items-start md:flex-row md:items-center">
                <h4 className="text-xs text-50 font-bold md:w-3/12">Phone</h4>
                <p className="text-xs text-50 md:text-sm w-9/12">Not set</p>
              </div>
              <MdArrowForwardIos className="text-lg md:text-2xl" />
            </div>
          </div>

          {/* Address */}

          <div className=" border border-gray-500 rounded-lg mt-5">
            <h3 className=" text-2xl px-5 pt-5">Address</h3>
            <p className=" text-gray-700 text-sm mb-3 px-5">
              Your home and work addresses are used to personalize your
              experiences across products, and for more relevant ads. Only you
              can see these addresses.
            </p>

            <p className=" text-gray-700 text-sm mb-3 px-5">
              You can also add addresses to your profile. You can choose if
              others see your profile addresses.
            </p>
            <div className="flex justify-between border-b pb-3 items-center h-20 px-5 cursor-pointer hover:bg-opacity-30 hover:bg-gray-200 duration-150 transition">
              <div className="w-9/12  flex flex-col justify-between items-start md:flex-row md:items-center">
                <h4 className="text-xs text-50 font-bold md:w-3/12">Home</h4>
                <p className="text-xs text-50 md:text-sm w-9/12">Not set</p>
              </div>
              <MdArrowForwardIos className="text-lg md:text-2xl" />
            </div>
            <div className="flex justify-between border-b pb-3 items-center h-20 px-5 cursor-pointer hover:bg-opacity-30 hover:bg-gray-200 duration-150 transition">
              <div className="w-9/12  flex flex-col justify-between items-start md:flex-row md:items-center">
                <h4 className="text-xs text-50 font-bold md:w-3/12">Work</h4>
                <p className="text-xs text-50 md:text-sm w-9/12">Not set</p>
              </div>
              <MdArrowForwardIos className="text-lg md:text-2xl" />
            </div>
            <div className="flex justify-between border-b pb-3 items-center h-20 px-5 cursor-pointer hover:bg-opacity-30 hover:bg-gray-200 duration-150 transition">
              <div className="w-9/12  flex flex-col justify-between items-start md:flex-row md:items-center">
                <h4 className="text-xs text-50 font-bold md:w-3/12">
                  Other addresses
                </h4>
                <p className="text-xs text-50 md:text-sm w-9/12">None</p>
              </div>
              <MdArrowForwardIos className="text-lg md:text-2xl" />
            </div>
          </div>

          {/* Password */}
          <div className=" border border-gray-500 rounded-lg mt-5">
            <h3 className=" text-2xl px-5 pt-5">Password </h3>

            <div
              className="flex justify-between border-b pb-3 items-center h-20 cursor-pointer hover:bg-opacity-30 hover:bg-gray-200 duration-150 transition px-5"
              onClick={() => nav("/pwd")}
            >
              <div className="w-9/12  flex flex-col justify-between items-start md:flex-row md:items-center">
                <h4 className="text-xs text-50 font-bold md:w-3/12">
                  Password Change
                </h4>
                <p className="text-xs text-50 md:text-sm w-9/12"></p>
              </div>
              <MdArrowForwardIos className="text-lg md:text-2xl" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User_detail;
