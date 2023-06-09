import React from "react";

const PromptCard = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-50">
        <div className="max-w-md bg-white rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-500">
          <div className="p-4">
            <img
              className="rounded-xl"
              src="https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1049&q=80"
              alt="Dog"
            />
          </div>
          <div className="flex justify-between p-6">
            <div className="flex items-center space-x-4">
              <img
                className="h-10 rounded-full"
                src="https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                alt=""
              />
              <h1 className="text-lg text-gray-900 font-bold">
                Felipe Sacudon
              </h1>
            </div>
            <div className="flex space-x-6 items-center">
              <div className="flex space-x-2 items-center">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                    />
                  </svg>
                </span>
                <span className="text-gray-700 font-semibold">20</span>
              </div>
              <div className="flex space-x-2 items-center pr-4">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-600 hover:text-red-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                <span className="text-gray-700 font-semibold">22</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PromptCard;
