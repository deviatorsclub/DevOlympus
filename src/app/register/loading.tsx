"use client";

import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="w-full max-w-3xl p-8 bg-gray-900 rounded-lg border border-purple-500/30 shadow-lg">
        <div className="flex flex-col items-center space-y-6">
          {/* Team name removed since it's dynamic */}
          <div className="h-8 w-64 bg-gray-800 rounded animate-pulse blur-sm"></div>

          <div className="w-full flex justify-center">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-purple-500 animate-pulse"></div>
              <div className="w-4 h-4 rounded-full bg-purple-500 animate-pulse delay-300"></div>
              <div className="w-4 h-4 rounded-full bg-purple-500 animate-pulse delay-500"></div>
            </div>
          </div>

          <div className="w-full bg-gray-800 rounded-lg p-6 border border-teal-500/20">
            <div className="flex items-center space-x-2 mb-4">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-600">
                <svg
                  className="h-4 w-4 text-white animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
              </span>
              <p className="text-lg font-medium text-white">
                Loading project data...
              </p>
            </div>

            <div className="w-full bg-gray-700 h-12 rounded mb-4 animate-pulse blur-sm"></div>
            <div className="w-full bg-indigo-900 h-12 rounded mb-4 animate-pulse blur-sm"></div>
            <div className="w-3/4 bg-gray-700 h-8 rounded animate-pulse blur-sm"></div>
          </div>

          <div className="w-full bg-gray-900 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-4">
              <svg
                className="h-5 w-5 text-indigo-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-lg font-medium text-white">Please wait</p>
            </div>

            <div className="w-full bg-gray-800 h-8 rounded animate-pulse blur-sm"></div>
          </div>
        </div>
      </div>

      <p className="mt-4 text-gray-500 text-sm">© Loading...</p>
    </div>
  );
}
