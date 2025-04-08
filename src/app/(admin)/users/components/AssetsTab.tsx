import React from "react";
import { ExternalLink } from "lucide-react";

export default function AssetsTab({
  assets,
}: {
  assets: { name: string; url: string }[];
}) {
  if (assets && assets.length >= 1)
    return (
      <div className="p-4">
        <div className="grid grid-cols-1 gap-6">
          {assets.map((asset, index) => (
            <div
              key={index}
              className="border border-gray-700 rounded-lg overflow-hidden"
            >
              <div className="flex justify-between items-center p-3 bg-gray-800">
                <h4
                  className="font-medium text-white truncate"
                  title={asset.name}
                >
                  {asset.name}
                </h4>
                <a
                  href={asset.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-md hover:bg-gray-700 transition-colors"
                  title="Open in new tab"
                >
                  <ExternalLink size={18} />
                </a>
              </div>

              <div className="w-full h-[300px] bg-gray-900">
                {asset.url && (
                  <iframe
                    src={asset.url}
                    className="w-full h-full border-0"
                    title={asset.name}
                    sandbox="allow-scripts allow-same-origin"
                    draggable="false"
                    loading="lazy"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}
