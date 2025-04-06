import React from "react";

export default function Loading() {
  return (
    <div className="mt-20">
      <div className="max-w-screen-2xl mx-auto p-4 md:p-6">
        <div className="flex flex-col gap-4 max-w-full animate-pulse">
          <div className="flex flex-wrap justify-between items-center gap-3">
            <div className="h-8 w-48 bg-gray-800 rounded"></div>
            <div className="h-10 w-36 bg-gray-800 rounded-lg"></div>
          </div>

          <div className="bg-gray-800 rounded-lg shadow h-16"></div>

          <div className="flex flex-col gap-2">
            <div className="px-2 py-1">
              <div className="h-5 w-32 bg-gray-700 rounded"></div>
            </div>

            <div className="bg-gray-800 rounded-lg shadow">
              <div className="overflow-x-auto">
                <div className="h-10 w-full bg-gray-700"></div>
                {Array(8)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="h-16 w-full bg-gray-800 border-t border-gray-700"
                    ></div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
