"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, Play } from "lucide-react";

const VideoGuide = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [videoFetched, setVideoFetched] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);

  const toggleCollapsible = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen && containerRef.current) {
      setContainerHeight(containerRef.current.scrollHeight);
    } else {
      setContainerHeight(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && !videoFetched) {
      setVideoFetched(true);
    }
  }, [isOpen, videoFetched]);

  const handleVideoLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="my-4 border border-indigo-800 rounded-lg overflow-hidden bg-[#13112a]">
      <button
        onClick={toggleCollapsible}
        type="button"
        className="w-full p-3 flex justify-between items-center text-left focus:outline-none cursor-pointer"
      >
        <div className="flex items-center">
          <Play size={16} className="text-violet-400 mr-2" />
          <span className="text-sm font-medium text-violet-300">
            Watch: How to copy and share the template
          </span>
        </div>
        {isOpen ? (
          <ChevronUp size={18} className="text-violet-400" />
        ) : (
          <ChevronDown size={18} className="text-violet-400" />
        )}
      </button>

      <div
        ref={containerRef}
        style={{
          height: `${containerHeight}px`,
          transition: "height 0.3s ease-in-out",
          overflow: "hidden",
        }}
      >
        <div className="p-3">
          <div className="relative rounded-md overflow-hidden bg-black aspect-video">
            {isLoading && videoFetched && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-t-2 border-violet-500 rounded-full animate-spin"></div>
              </div>
            )}

            {videoFetched && (
              <video
                ref={videoRef}
                src="/ppt-drive.mp4"
                controls
                className="w-full h-full"
                onLoadedData={handleVideoLoad}
                poster="/api/placeholder/640/360"
              >
                Your browser does not support the video tag.
              </video>
            )}

            {!videoFetched && (
              <div className="absolute inset-0 flex items-center justify-center bg-black">
                <Play size={40} className="text-violet-400 opacity-70" />
              </div>
            )}
          </div>

          <div className="mt-3 text-xs text-gray-400">
            <p>This video demonstrates how to:</p>
            <ul className="list-disc list-inside mt-1 ml-2">
              <li>Copy the presentation template</li>
              <li>Set public access permissions</li>
              <li>Get the shareable link for your registration</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoGuide;
