import React, { useState } from "react";
import { AiOutlineClose, AiFillPlusCircle } from "react-icons/ai";
import { useGetProfileQuery } from "../../redux/services/app.services";
import { useNavigate } from "react-router-dom";

const ProfileProgress = () => {
  const [open, setOpen] = useState(true);
  const { data, isLoading } = useGetProfileQuery({});
  const navigate = useNavigate();

  return (
    <>
      {!data?.user.completed && (
        <>
          <div
            onClick={() => setOpen(!open)}
            className={`${
              !open ? "flex flex-col" : "hidden"
            } items-center justify-center shadow-lg rounded-xl p-4 bg-white cursor-pointer`}
          >
            <AiFillPlusCircle size={50} />
            <p>See more</p>
          </div>
          <div
            className={`${
              open ? "block" : "hidden"
            } shadow-lg rounded-xl w-72 md:w-96 p-4 bg-white relative overflow-hidden`}
          >
            <div
              className="absolute right-5 cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              <AiOutlineClose className="text-gray-400 text-2xl" />
            </div>
            <a href="#" className="w-full h-full block">
              <div className="flex items-center border-b-2 mb-2 py-2">
                <div className="pl-3">
                  <div className="font-medium">Hi complete your profile</div>
                  <div className="text-gray-600 text-sm">See the items</div>
                </div>
              </div>
              <div className="w-full">
                <p className="text-gray-800 text-sm font-medium mb-2">
                  Complete your profile:
                </p>
                <p className="text-gray-800 text-xl font-medium mb-2">
                  Improve the avatar url and phone number
                </p>
                <p className="text-blue-600 text-xs font-medium mb-2">
                  you can do it!
                </p>
                <p className="text-gray-400 text-sm mb-4">
                  win $1000 for complete your profile
                </p>
              </div>
              <div className="flex items-center justify-between my-2">
                <p className="text-gray-300 text-sm">{`${data?.percent}% task completed`}</p>
              </div>
              <div className="flex items-center justify-between my-2">
                <button
                  onClick={() => navigate("/completeProfile")}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Complete profile
                </button>
              </div>
              <div className="w-full h-2 bg-blue-200 rounded-full">
                <div
                  style={{ width: `${data?.percent}%` }}
                  className={` h-full text-center text-xs text-white bg-blue-600 rounded-full`}
                ></div>
              </div>
            </a>
          </div>
        </>
      )}
    </>
  );
};

export default ProfileProgress;
